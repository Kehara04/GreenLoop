const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminController = require('../../controllers/adminController');
const User = require('../../models/user');

// Mock the mailer utility
jest.mock('../../utils/mailer', () => ({
  sendAccountCredentitals: jest.fn(),
  sendVerificationEmail: jest.fn()
}));

describe('AdminController', () => {
  let mockAdmin;

  beforeEach(async () => {
    // Create mock admin
    mockAdmin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'admin',
      user_id: 1
    });
    await mockAdmin.save();
  });

  describe('getAdmin', () => {
    test('should get all admins', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(1);
      expect(responseData[0].role).toBe('admin');
    });

    test('should return 404 if no admins found', async () => {
      // Delete the admin
      await User.deleteMany({ role: 'admin' });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No admins found' });
    });

    test('should handle database errors', async () => {
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching admins' });
    });
  });

  describe('getAdminById', () => {
    test('should get admin by ID', async () => {
      const req = {
        query: { id: '1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdminById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.user_id).toBe(1);
      expect(responseData.role).toBe('admin');
    });

    test('should return 404 if admin not found', async () => {
      const req = {
        query: { id: '999' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdminById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Admin not found' });
    });

    test('should handle database errors', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));

      const req = {
        query: { id: '1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdminById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching admin' });
    });
  });

  describe('getAdminByEmail', () => {
    test('should get admin by email', async () => {
      const req = {
        body: { email: 'admin@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdminByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.email).toBe('admin@example.com');
      expect(responseData.role).toBe('admin');
    });

    test('should return 404 if admin not found', async () => {
      const req = {
        body: { email: 'nonexistent@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.getAdminByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Admin not found');
    });
  });

  describe('addAdmin', () => {
    test('should add admin successfully', async () => {
      const req = {
        body: {
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        },
        file: null
      };
      const res = {
        json: jest.fn()
      };

      await adminController.addAdmin(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Admin SignUp successfully');
      expect(responseData.admin.firstName).toBe('New');
      expect(responseData.admin.lastName).toBe('Admin');
      expect(responseData.admin.role).toBe('admin');

      // Verify admin was created
      const createdAdmin = await User.findOne({ email: 'newadmin@example.com' });
      expect(createdAdmin).toBeTruthy();
      expect(createdAdmin.role).toBe('admin');
    });

    test('should return 400 if email already exists', async () => {
      const req = {
        body: {
          firstName: 'Duplicate',
          lastName: 'Admin',
          email: 'admin@example.com', // Already exists
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        },
        file: null
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.addAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Admin with this email already exists.' });
    });

    test('should return 400 if passwords do not match', async () => {
      const req = {
        body: {
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'differentpassword',
          address: '123 Admin Street',
          phone: '+94112345678'
        },
        file: null
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.addAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
    });

    test('should handle profile image upload', async () => {
      const req = {
        body: {
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        },
        file: {
          filename: 'profile.jpg'
        }
      };
      const res = {
        json: jest.fn()
      };

      await adminController.addAdmin(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.admin.profilePic).toBe('/uploads/profile.jpg');
    });
  });

  describe('updateAdmin', () => {
    test('should update admin successfully', async () => {
      const req = {
        body: {
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        },
        file: null
      };
      const res = {
        json: jest.fn()
      };

      await adminController.updateAdmin(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Admin updated successfully');
      expect(responseData.admin.firstName).toBe('Updated');
      expect(responseData.admin.lastName).toBe('Admin');
    });

    test('should return 404 if admin not found', async () => {
      const req = {
        body: {
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 999
        },
        file: null
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.updateAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Admin not found' });
    });

    test('should handle profile image update', async () => {
      const req = {
        body: {
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        },
        file: {
          filename: 'newprofile.jpg'
        }
      };
      const res = {
        json: jest.fn()
      };

      await adminController.updateAdmin(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.admin.profilePic).toBe('/uploads/newprofile.jpg');
    });
  });

  describe('updatePassword', () => {
    test('should update password successfully', async () => {
      const req = {
        body: {
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password updated Successfully!' });

      // Verify password was updated
      const updatedAdmin = await User.findOne({ user_id: 1 });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedAdmin.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 400 if passwords do not match', async () => {
      const req = {
        body: {
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'differentpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
    });
  });

  describe('deleteAdmin', () => {
    test('should delete admin successfully', async () => {
      const req = {
        body: { userId: 1 }
      };
      const res = {
        json: jest.fn()
      };

      await adminController.deleteAdmin(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Admin deleted successfully' });

      // Verify admin was deleted
      const deletedAdmin = await User.findOne({ user_id: 1 });
      expect(deletedAdmin).toBeNull();
    });

    test('should handle database errors', async () => {
      jest.spyOn(User, 'findOneAndDelete').mockRejectedValueOnce(new Error('Database error'));

      const req = {
        body: { userId: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await adminController.deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting admin' });
    });
  });
});
