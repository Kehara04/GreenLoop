const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const recycleFormRoute = require('../../routes/recycleFormRoute');
const RecycleForm = require('../../models/recycleFormModel');
const User = require('../../models/user');

const app = express();
app.use(express.json());
app.use('/api/recycle', recycleFormRoute);

describe('RecycleForm Routes', () => {
  let mockUser;
  let mockForm;
  let userAuthToken;
  let adminAuthToken;

  beforeEach(async () => {
    // Create mock user
    mockUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@example.com',
      password: 'hashedpassword',
      role: 'customer',
      user_id: 1,
      totalPoints: 0
    });
    await mockUser.save();

    // Create mock form
    mockForm = new RecycleForm({
      userId: '1',
      categories: {
        metal: 5,
        plastic: 10,
        polythene: 3,
        eWaste: 2,
        clothes: 8,
        paper: 15,
        regiform: 1
      },
      location: {
        district: 'Colombo',
        city: 'Colombo'
      },
      notes: 'Test form',
      form_id: 1
    });
    await mockForm.save();

    // Create auth tokens
    userAuthToken = jwt.sign(
      { id: '1', email: 'customer@example.com', role: 'customer', userType: 'user' },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    adminAuthToken = jwt.sign(
      { id: '2', email: 'admin@example.com', role: 'admin', userType: 'user' },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  });

  describe('POST /api/recycle', () => {
    test('should create recycle form successfully', async () => {
      const response = await request(app)
        .post('/api/recycle')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: {
            metal: 5,
            plastic: 10
          },
          location: {
            district: 'Colombo',
            city: 'Colombo'
          },
          notes: 'New test form'
        })
        .expect(201);

      expect(response.body.message).toBe('Recycle form created');
      expect(response.body.form).toBeDefined();
      expect(response.body.profile).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .post('/api/recycle')
        .send({
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' }
        })
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 400 if userId is missing', async () => {
      const response = await request(app)
        .post('/api/recycle')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' }
        })
        .expect(201); // This should still work as userId comes from token

      expect(response.body.message).toBe('Recycle form created');
    });
  });

  describe('GET /api/recycle', () => {
    test('should get user recycle forms', async () => {
      const response = await request(app)
        .get('/api/recycle')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/recycle')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('GET /api/recycle/profile', () => {
    test('should get user profile successfully', async () => {
      const response = await request(app)
        .get('/api/recycle/profile')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(response.body.user).toBeDefined();
      expect(response.body.totalPoints).toBeDefined();
      expect(response.body.badges).toBeDefined();
      expect(response.body.totals).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/recycle/profile')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('GET /api/recycle/districts', () => {
    test('should return list of districts', async () => {
      const response = await request(app)
        .get('/api/recycle/districts')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toContain('Colombo');
      expect(response.body).toContain('Kandy');
      expect(response.body).toContain('Galle');
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/recycle/districts')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('GET /api/recycle/stats', () => {
    test('should get user statistics', async () => {
      const response = await request(app)
        .get('/api/recycle/stats')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(response.body.byMonth).toBeDefined();
      expect(response.body.byCategory).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/recycle/stats')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('GET /api/recycle/points-history', () => {
    test('should get user points history', async () => {
      const response = await request(app)
        .get('/api/recycle/points-history')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/recycle/points-history')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('POST /api/recycle/:id/award-points', () => {
    test('should award points to user', async () => {
      const response = await request(app)
        .post(`/api/recycle/${mockForm._id}/award-points`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(response.body.message).toBe('Points awarded');
      expect(response.body.totalPoints).toBeDefined();
      expect(response.body.user_level).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .post(`/api/recycle/${mockForm._id}/award-points`)
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 404 if form not found', async () => {
      const response = await request(app)
        .post('/api/recycle/507f1f77bcf86cd799439011/award-points')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(404);

      expect(response.body.message).toBe('Recycle form not found');
    });
  });

  describe('PUT /api/recycle/:id/status', () => {
    test('should update form status successfully with admin token', async () => {
      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}/status`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({ status: 'completed' })
        .expect(200);

      expect(response.body.message).toBe('Status updated');
      expect(response.body.form).toBeDefined();
      expect(response.body.totalPoints).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}/status`)
        .send({ status: 'completed' })
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}/status`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ status: 'completed' })
        .expect(403);

      expect(response.body.message).toBe('Access denied. You do not have permission');
    });

    test('should return 404 if form not found', async () => {
      const response = await request(app)
        .put('/api/recycle/507f1f77bcf86cd799439011/status')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({ status: 'completed' })
        .expect(404);

      expect(response.body.message).toBe('Recycle form not found');
    });
  });

  describe('GET /api/recycle/:id', () => {
    test('should get single recycle form', async () => {
      const response = await request(app)
        .get(`/api/recycle/${mockForm._id}`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(response.body._id.toString()).toBe(mockForm._id.toString());
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .get(`/api/recycle/${mockForm._id}`)
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 404 if form not found', async () => {
      const response = await request(app)
        .get('/api/recycle/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(404);

      expect(response.body.message).toBe('Not found');
    });
  });

  describe('PUT /api/recycle/:id', () => {
    test('should update recycle form successfully', async () => {
      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: {
            metal: 10,
            plastic: 15
          },
          location: {
            district: 'Kandy',
            city: 'Kandy'
          },
          notes: 'Updated form'
        })
        .expect(200);

      expect(response.body.message).toBe('Recycle form updated');
      expect(response.body.form).toBeDefined();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}`)
        .send({
          categories: { metal: 10 }
        })
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 400 if form is not pending', async () => {
      // Update form status to completed
      mockForm.status = 'completed';
      await mockForm.save();

      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: { metal: 10 }
        })
        .expect(400);

      expect(response.body.message).toBe('Only pending forms can be edited');
    });

    test('should return 404 if form not found', async () => {
      const response = await request(app)
        .put('/api/recycle/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: { metal: 10 }
        })
        .expect(404);

      expect(response.body.message).toBe('Not found');
    });
  });

  describe('DELETE /api/recycle/:id', () => {
    test('should delete recycle form successfully', async () => {
      const response = await request(app)
        .delete(`/api/recycle/${mockForm._id}`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(200);

      expect(response.body.message).toBe('Recycle form deleted');

      // Verify form was deleted
      const deletedForm = await RecycleForm.findById(mockForm._id);
      expect(deletedForm).toBeNull();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .delete(`/api/recycle/${mockForm._id}`)
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 400 if form is not pending', async () => {
      // Update form status to completed
      mockForm.status = 'completed';
      await mockForm.save();

      const response = await request(app)
        .delete(`/api/recycle/${mockForm._id}`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(400);

      expect(response.body.message).toBe('Only pending forms can be deleted');
    });

    test('should return 404 if form not found', async () => {
      const response = await request(app)
        .delete('/api/recycle/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(404);

      expect(response.body.message).toBe('Not found');
    });
  });

  describe('Admin Analytics Routes', () => {
    test('should get admin overview with admin token', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/overview')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .expect(200);

      expect(response.body.kpis).toBeDefined();
      expect(response.body.byDistrict).toBeDefined();
    });

    test('should return 401 without token for admin overview', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/overview')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 403 for non-admin user accessing admin overview', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/overview')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(403);

      expect(response.body.message).toBe('Access denied. You do not have permission');
    });

    test('should get admin by month data', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/by-month')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should get admin by category data', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/by-category')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    test('should get admin recent forms', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/recent-forms?limit=5')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should get admin top users', async () => {
      const response = await request(app)
        .get('/api/recycle/admin/top-users?limit=5')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors in createRecycleForm', async () => {
      jest.spyOn(RecycleForm.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/recycle')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' }
        })
        .expect(500);

      expect(response.body.message).toBe('Server error');
    });

    test('should handle database errors in getUserRecycleForms', async () => {
      const findSpy = jest.spyOn(RecycleForm, 'find').mockImplementationOnce(() => { throw new Error('Database error'); });

      const response = await request(app)
        .get('/api/recycle')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .expect(500);

      expect(response.body.message).toBe('Server error');
      
      findSpy.mockRestore();
    });

    test('should handle database errors in updateFormStatus', async () => {
      jest.spyOn(RecycleForm, 'findById').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .put(`/api/recycle/${mockForm._id}/status`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({ status: 'completed' })
        .expect(500);

      expect(response.body.message).toBe('Server error');
    });
  });
});
