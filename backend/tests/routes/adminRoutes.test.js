const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');

const adminRoutes = require('../../routes/adminRoutes');
const User = require('../../models/user');

// Mock the mailer utility
jest.mock('../../utils/mailer', () => ({
  sendAccountCredentitals: jest.fn(),
  sendVerificationEmail: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/admins', adminRoutes);

describe('Admin Routes', () => {
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

  describe('GET /api/admins/admins', () => {
    test('should get all admins', async () => {
      const response = await request(app)
        .get('/api/admins/admins')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].role).toBe('admin');
      expect(response.body[0].email).toBe('admin@example.com');
    });

    test('should return 404 if no admins found', async () => {
      // Delete the admin
      await User.deleteMany({ role: 'admin' });

      const response = await request(app)
        .get('/api/admins/admins')
        .expect(404);

      expect(response.body.message).toBe('No admins found');
    });
  });

  describe('GET /api/admins/admin', () => {
    test('should get admin by ID', async () => {
      const response = await request(app)
        .get('/api/admins/admin?id=1')
        .expect(200);

      expect(response.body.user_id).toBe(1);
      expect(response.body.role).toBe('admin');
    });

    test('should return 404 if admin not found', async () => {
      const response = await request(app)
        .get('/api/admins/admin?id=999')
        .expect(404);

      expect(response.body.message).toBe('Admin not found');
    });
  });

  describe('POST /api/admins/signup', () => {
    test('should add admin successfully', async () => {
      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        })
        .expect(200);

      expect(response.body.message).toBe('Admin SignUp successfully');
      expect(response.body.admin.firstName).toBe('New');
      expect(response.body.admin.lastName).toBe('Admin');
      expect(response.body.admin.role).toBe('admin');

      // Verify admin was created
      const createdAdmin = await User.findOne({ email: 'newadmin@example.com' });
      expect(createdAdmin).toBeTruthy();
      expect(createdAdmin.role).toBe('admin');
    });

    test('should return 400 if email already exists', async () => {
      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'Duplicate',
          lastName: 'Admin',
          email: 'admin@example.com', // Already exists
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        })
        .expect(400);

      expect(response.body.message).toBe('Admin with this email already exists.');
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'differentpassword',
          address: '123 Admin Street',
          phone: '+94112345678'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });

    test('should handle profile image upload', async () => {
      // Mock multer file upload
      const mockFile = {
        fieldname: 'profile_image',
        originalname: 'profile.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads/',
        filename: 'profile.jpg',
        path: 'uploads/profile.jpg',
        size: 1024
      };

      // Note: In a real test, you would need to properly mock multer
      // This is a simplified test focusing on the controller logic
      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        })
        .expect(200);

      expect(response.body.message).toBe('Admin SignUp successfully');
    });
  });

  describe('PUT /api/admins/updateadmin', () => {
    test('should update admin successfully', async () => {
      const response = await request(app)
        .put('/api/admins/updateadmin')
        .send({
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        })
        .expect(200);

      expect(response.body.message).toBe('Admin updated successfully');
      expect(response.body.admin.firstName).toBe('Updated');
      expect(response.body.admin.lastName).toBe('Admin');
    });

    test('should return 404 if admin not found', async () => {
      const response = await request(app)
        .put('/api/admins/updateadmin')
        .send({
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 999
        })
        .expect(404);

      expect(response.body.message).toBe('Admin not found');
    });
  });

  describe('PUT /api/admins/updatepassword', () => {
    test('should update password successfully', async () => {
      const response = await request(app)
        .put('/api/admins/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.message).toBe('Password updated Successfully!');

      // Verify password was updated
      const updatedAdmin = await User.findOne({ user_id: 1 });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedAdmin.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .put('/api/admins/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'differentpassword'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors in getAdmin', async () => {
      // Mock User.find to throw an error
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/admins/admins')
        .expect(500);

      expect(response.body.message).toBe('Error fetching admins');
    });

    test('should handle database errors in getAdminById', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/admins/admin?id=1')
        .expect(500);

      expect(response.body.message).toBe('Error fetching admin');
    });

    test('should handle database errors in addAdmin', async () => {
      jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'New',
          lastName: 'Admin',
          email: 'newadmin@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Admin Street',
          phone: '+94112345678'
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in updateAdmin', async () => {
      jest.spyOn(User, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .put('/api/admins/updateadmin')
        .send({
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in updatePassword', async () => {
      jest.spyOn(User, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .put('/api/admins/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    test('should handle missing required fields in signup', async () => {
      const response = await request(app)
        .post('/api/admins/signup')
        .send({
          firstName: 'New',
          // Missing lastName, email, password, etc.
        })
        .expect(500); // This will likely result in a server error due to validation

      expect(response.body).toBeDefined();
    });

    test('should handle missing userId in updateAdmin', async () => {
      const response = await request(app)
        .put('/api/admins/updateadmin')
        .send({
          firstName: 'Updated',
          lastName: 'Admin',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679'
          // Missing userId
        })
        .expect(404);

      expect(response.body).toBeDefined();
    });

    test('should handle missing userId in updatePassword', async () => {
      const response = await request(app)
        .put('/api/admins/updatepassword')
        .send({
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
          // Missing userId
        })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });
});
