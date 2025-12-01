const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = require('../../controllers/userController');
const User = require('../../models/user');
const RecycleCentre = require('../../models/recycleCentre');

// Mock the mailer utility
jest.mock('../../utils/mailer', () => ({
  sendVerificationEmail: jest.fn()
}));

const app = express();
app.use(express.json());

describe('UserController', () => {
  let mockUser;
  let mockRecycleCentre;

  beforeEach(async () => {
    // Create mock user
    mockUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'customer',
      user_id: 1
    });
    await mockUser.save();

    // Create mock recycle centre
    mockRecycleCentre = new RecycleCentre({
      name: 'Eco Centre',
      address: '123 Green Street',
      contactNumber: '+94112345678',
      email: 'centre@example.com',
      password: await bcrypt.hash('password123', 12),
      location: {
        city: 'colombo',
        district: 'colombo'
      },
      recycleCentre_id: 1
    });
    await mockRecycleCentre.save();
  });

  describe('getUsers', () => {
    test('should get all users without passwords', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(1);
      // Password should be excluded by select('-password')
      expect(responseData[0].password).toBeUndefined();
      expect(responseData[0].email).toBe('john@example.com');
    });

    test('should handle database errors', async () => {
      // Mock User.find to throw an error synchronously to bypass query chaining
      jest.spyOn(User, 'find').mockImplementationOnce(() => { throw new Error('Database error'); });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getUserById', () => {
    test('should get user by ID', async () => {
      const req = {
        query: { id: '1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.user_id).toBe(1);
      expect(responseData.password).toBeUndefined();
    });

    test('should return 404 if user not found', async () => {
      const req = {
        query: { id: '999' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('User not found');
    });
  });

  describe('login', () => {
    test('should login user successfully', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveProperty('token');
      expect(responseData.role).toBe('customer');
      expect(responseData.id).toBe(1);
      expect(responseData.userType).toBe('user');
      expect(responseData.message).toBe('Login successful');
    });

    test('should login recycle centre successfully', async () => {
      const req = {
        body: {
          email: 'centre@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.role).toBe('recycleCentre');
      expect(responseData.id).toBe(1);
      expect(responseData.userType).toBe('recycleCentre');
    });

    test('should return 400 for invalid credentials', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    test('should return 400 for non-existent user', async () => {
      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });

  describe('authentication', () => {
    test('should authenticate user successfully', async () => {
      const req = {
        user: {
          id: 1,
          userType: 'user'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.authentication(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.user_id).toBe(1);
      expect(responseData.password).toBeUndefined();
    });

    test('should authenticate recycle centre successfully', async () => {
      const req = {
        user: {
          id: 1,
          userType: 'recycleCentre'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.authentication(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.recycleCentre_id).toBe(1);
      expect(responseData.password).toBeUndefined();
    });

    test('should return 404 if user not found', async () => {
      const req = {
        user: {
          id: 999,
          userType: 'user'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.authentication(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('verifyemail', () => {
    test('should verify email successfully', async () => {
      const token = jwt.sign({ email: 'john@example.com' }, process.env.SECRET_KEY);
      
      const req = {
        params: { token }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.verifyemail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email verified successfully' });

      // Check if user is verified
      const updatedUser = await User.findOne({ email: 'john@example.com' });
      expect(updatedUser.isVerified).toBe(true);
    });

    test('should return 400 for invalid token', async () => {
      const req = {
        params: { token: 'invalid-token' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.verifyemail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
    });

    test('should return 400 for non-existent user', async () => {
      const token = jwt.sign({ email: 'nonexistent@example.com' }, process.env.SECRET_KEY);
      
      const req = {
        params: { token }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.verifyemail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });
  });

  describe('updateUser', () => {
    test('should update user successfully', async () => {
      const req = {
        body: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          address: '456 New Street',
          phone: '+94112345679',
          userId: 1,
          userType: 'user'
        },
        file: null
      };
      const res = {
        json: jest.fn()
      };

      await userController.updateUser(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('User updated successfully');
      expect(responseData.user.firstName).toBe('Jane');
      expect(responseData.user.lastName).toBe('Smith');
    });

    test('should update recycle centre successfully', async () => {
      const req = {
        body: {
          firstName: 'New Eco Centre',
          email: 'newcentre@example.com',
          address: '789 Updated Street',
          phone: '+94112345680',
          userId: 1,
          userType: 'recycleCentre'
        },
        file: null
      };
      const res = {
        json: jest.fn()
      };

      await userController.updateUser(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('User updated successfully');
      expect(responseData.user.name).toBe('New Eco Centre');
    });

    test('should return 404 if user not found', async () => {
      const req = {
        body: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          address: '456 New Street',
          phone: '+94112345679',
          userId: 999,
          userType: 'user'
        },
        file: null
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('forgotPassword', () => {
    test('should send reset email for user', async () => {
      const req = {
        body: { email: 'john@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset email sent' });
    });

    test('should send reset email for recycle centre', async () => {
      const req = {
        body: { email: 'centre@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset email sent' });
    });

    test('should return 404 for non-existent email', async () => {
      const req = {
        body: { email: 'nonexistent@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('resetPassword', () => {
    test('should reset password successfully', async () => {
      const token = jwt.sign({ email: 'john@example.com' }, process.env.SECRET_KEY);
      
      const req = {
        params: { token },
        body: { password: 'newpassword123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset successfully' });

      // Verify password was updated
      const updatedUser = await User.findOne({ email: 'john@example.com' });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedUser.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 400 for invalid token', async () => {
      const req = {
        params: { token: 'invalid-token' },
        body: { password: 'newpassword123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
    });
  });

  describe('deleteUser', () => {
    test('should delete user successfully', async () => {
      const req = {
        user: {
          id: 1,
          userType: 'user'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });

      // Verify user was deleted
      const deletedUser = await User.findOne({ user_id: 1 });
      expect(deletedUser).toBeNull();
    });

    test('should delete recycle centre successfully', async () => {
      const req = {
        user: {
          id: 1,
          userType: 'recycleCentre'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });

      // Verify recycle centre was deleted
      const deletedCentre = await RecycleCentre.findOne({ recycleCentre_id: 1 });
      expect(deletedCentre).toBeNull();
    });
  });
});
