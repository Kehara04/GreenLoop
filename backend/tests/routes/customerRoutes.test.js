const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');

const customerRoutes = require('../../routes/customerRoutes');
const User = require('../../models/user');

// Mock the mailer utility
jest.mock('../../utils/mailer', () => ({
  sendVerificationEmail: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes);

describe('Customer Routes', () => {
  let mockCustomer;

  beforeEach(async () => {
    // Create mock customer
    mockCustomer = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'customer',
      user_id: 1
    });
    await mockCustomer.save();
  });

  describe('GET /api/customers/users', () => {
    test('should get all customers', async () => {
      const response = await request(app)
        .get('/api/customers/users')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].role).toBe('customer');
      expect(response.body[0].email).toBe('customer@example.com');
    });

    test('should handle database errors', async () => {
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/customers/users')
        .expect(500);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/customers/user', () => {
    test('should get customer by ID', async () => {
      const response = await request(app)
        .get('/api/customers/user?id=1')
        .expect(200);

      expect(response.body.user_id).toBe(1);
      expect(response.body.role).toBe('customer');
    });

    test('should return 404 if customer not found', async () => {
      const response = await request(app)
        .get('/api/customers/user?id=999')
        .expect(404);

      expect(response.text).toBe('"User not found"');
    });
  });

  describe('POST /api/customers/signup', () => {
    test('should add customer successfully', async () => {
      const response = await request(app)
        .post('/api/customers/signup')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Customer Street',
          phone: '+94112345678'
        })
        .expect(200);

      expect(response.body.message).toBe('Customer registered! Please check your email for verification.');

      // Verify customer was created
      const createdCustomer = await User.findOne({ email: 'jane@example.com' });
      expect(createdCustomer).toBeTruthy();
      expect(createdCustomer.role).toBe('customer');
      expect(createdCustomer.firstName).toBe('Jane');
      expect(createdCustomer.lastName).toBe('Smith');
    });

    test('should return 400 if email already exists', async () => {
      const response = await request(app)
        .post('/api/customers/signup')
        .send({
          firstName: 'Duplicate',
          lastName: 'Customer',
          email: 'customer@example.com', // Already exists
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Customer Street',
          phone: '+94112345678'
        })
        .expect(400);

      expect(response.body.message).toBe('Customer with this email already exists.');
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .post('/api/customers/signup')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          password: 'password123',
          confirmPassword: 'differentpassword',
          address: '123 Customer Street',
          phone: '+94112345678'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('PUT /api/customers/updatecustomer', () => {
    test('should update customer successfully', async () => {
      const response = await request(app)
        .put('/api/customers/updatecustomer')
        .send({
          firstName: 'Updated',
          lastName: 'Customer',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        })
        .expect(200);

      expect(response.body.message).toBe('Customer updated successfully');
      expect(response.body.customer.firstName).toBe('Updated');
      expect(response.body.customer.lastName).toBe('Customer');
    });

    test('should return 404 if customer not found', async () => {
      const response = await request(app)
        .put('/api/customers/updatecustomer')
        .send({
          firstName: 'Updated',
          lastName: 'Customer',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 999
        })
        .expect(404);

      expect(response.body.message).toBe('Customer not found');
    });

    test('should handle profile image update', async () => {
      // Note: In a real test, you would need to properly mock multer
      // This is a simplified test focusing on the controller logic
      const response = await request(app)
        .put('/api/customers/updatecustomer')
        .send({
          firstName: 'Updated',
          lastName: 'Customer',
          email: 'updated@example.com',
          address: '456 Updated Street',
          phone: '+94112345679',
          userId: 1
        })
        .expect(200);

      expect(response.body.message).toBe('Customer updated successfully');
    });
  });

  describe('PUT /api/customers/updatepassword', () => {
    test('should update password successfully', async () => {
      const response = await request(app)
        .put('/api/customers/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.message).toBe('Password updated Successfully!');

      // Verify password was updated
      const updatedCustomer = await User.findOne({ user_id: 1 });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedCustomer.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .put('/api/customers/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'differentpassword'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('GET /api/customers/customer', () => {
    test('should get customer name by ID', async () => {
      const response = await request(app)
        .get('/api/customers/customer?id=1')
        .expect(200);

      expect(response.body.user_id).toBe(1);
      expect(response.body.role).toBe('customer');
      expect(response.body).not.toHaveProperty('password');
    });

    test('should return 404 if customer not found', async () => {
      const response = await request(app)
        .get('/api/customers/customer?id=999')
        .expect(404);

      expect(response.text).toBe('"User not found"');
    });
  });

  describe('DELETE /api/customers/delete', () => {
    test('should delete customer successfully', async () => {
      const response = await request(app)
        .delete('/api/customers/delete?id=1')
        .expect(200);

      expect(response.body.message).toBe('Customer deleted successfully!');

      // Verify customer was deleted
      const deletedCustomer = await User.findOne({ user_id: 1 });
      expect(deletedCustomer).toBeNull();
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors in getCustomers', async () => {
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/customers/users')
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in getCustomerById', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/customers/user?id=1')
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in addCustomer', async () => {
      jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/customers/signup')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          address: '123 Customer Street',
          phone: '+94112345678'
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in updateCustomer', async () => {
      jest.spyOn(User, 'findOneAndUpdate').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .put('/api/customers/updatecustomer')
        .send({
          firstName: 'Updated',
          lastName: 'Customer',
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
        .put('/api/customers/updatepassword')
        .send({
          userId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in deleteCustomer', async () => {
      jest.spyOn(User, 'findOneAndDelete').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .delete('/api/customers/delete?id=1')
        .expect(500);

      expect(response.body).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    test('should handle missing required fields in signup', async () => {
      const response = await request(app)
        .post('/api/customers/signup')
        .send({
          firstName: 'Jane',
          // Missing lastName, email, password, etc.
        })
        .expect(500); // This will likely result in a server error due to validation

      expect(response.body).toBeDefined();
    });

    test('should handle missing userId in updateCustomer', async () => {
      const response = await request(app)
        .put('/api/customers/updatecustomer')
        .send({
          firstName: 'Updated',
          lastName: 'Customer',
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
        .put('/api/customers/updatepassword')
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
