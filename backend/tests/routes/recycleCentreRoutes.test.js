const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const recycleCentreRoutes = require('../../routes/recycleCentreRoutes');
const RecycleCentre = require('../../models/recycleCentre');

const app = express();
app.use(express.json());
app.use('/api/recycleCentre', recycleCentreRoutes);

describe('RecycleCentre Routes', () => {
  let mockRecycleCentre;
  let authToken;

  beforeEach(async () => {
    // Create mock recycle centre
    mockRecycleCentre = new RecycleCentre({
      name: 'Eco Centre',
      address: '123 Green Street, Colombo',
      contactNumber: '+94112345678',
      email: 'centre@example.com',
      password: await bcrypt.hash('password123', 12),
      location: {
        city: 'colombo',
        district: 'colombo'
      },
      acceptedItems: ['Plastic', 'Paper', 'Metal'],
      recycleCentre_id: 1
    });
    await mockRecycleCentre.save();

    // Create auth token for recycle centre
    authToken = jwt.sign(
      { id: 1, email: 'centre@example.com', role: 'recycleCentre', userType: 'recycleCentre' },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/recycleCentre', () => {
    test('should get all recycle centres without passwords', async () => {
      const response = await request(app)
        .get('/api/recycleCentre')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).not.toHaveProperty('password');
      expect(response.body[0].name).toBe('Eco Centre');
    });

    test('should handle database errors', async () => {
      jest.spyOn(RecycleCentre, 'find').mockImplementationOnce(() => { throw new Error('Database error'); });

      const response = await request(app)
        .get('/api/recycleCentre')
        .expect(500);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/recycleCentre/id', () => {
    test('should get recycle centre by ID', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/id?id=1')
        .expect(200);

      expect(response.body.recycleCentre_id).toBe(1);
      expect(response.body).not.toHaveProperty('password');
    });

    test('should return 404 if recycle centre not found', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/id?id=999')
        .expect(404);

      expect(response.text).toBe('"Recycle centre not found"');
    });
  });

  describe('POST /api/recycleCentre/email', () => {
    test('should get recycle centre by email', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/email')
        .send({ email: 'centre@example.com' })
        .expect(200);

      expect(response.body.email).toBe('centre@example.com');
      expect(response.body).not.toHaveProperty('password');
    });

    test('should return 404 if recycle centre not found', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/email')
        .send({ email: 'nonexistent@example.com' })
        .expect(404);

      expect(response.text).toBe('"Recycle centre not found"');
    });
  });

  describe('POST /api/recycleCentre/signup', () => {
    test('should add recycle centre successfully', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/signup')
        .send({
          name: 'New Eco Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'newcentre@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          website: 'https://newcentre.com',
          city: 'Kandy',
          district: 'Kandy',
          acceptedItems: ['Electronics', 'Clothes']
        })
        .expect(200);

      expect(response.body.message).toBe('Recycle centre registered successfully!');
      expect(response.body.recycleCentre.name).toBe('New Eco Centre');
      expect(response.body.recycleCentre.email).toBe('newcentre@example.com');

      // Verify recycle centre was created
      const createdCentre = await RecycleCentre.findOne({ email: 'newcentre@example.com' });
      expect(createdCentre).toBeTruthy();
      expect(createdCentre.location.city).toBe('kandy');
      expect(createdCentre.location.district).toBe('kandy');
    });

    test('should return 400 if email already exists', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/signup')
        .send({
          name: 'Duplicate Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'centre@example.com', // Already exists
          password: 'password123',
          confirmPassword: 'password123',
          city: 'Kandy',
          district: 'Kandy'
        })
        .expect(400);

      expect(response.body.message).toBe('Recycle centre with this email already exists.');
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/signup')
        .send({
          name: 'New Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'newcentre@example.com',
          password: 'password123',
          confirmPassword: 'differentpassword',
          city: 'Kandy',
          district: 'Kandy'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('GET /api/recycleCentre/by-area', () => {
    test('should get centres by district', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/by-area?district=Colombo')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.centres).toHaveLength(1);
    });

    test('should get centres by district and city', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/by-area?district=Colombo&city=Colombo')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
    });

    test('should filter by accepted items', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/by-area?district=Colombo&acceptedItems=Plastic,Paper')
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('should return 400 if district is missing', async () => {
      const response = await request(app)
        .get('/api/recycleCentre/by-area?city=Colombo')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('District is required');
    });
  });

  describe('POST /api/recycleCentre/suggest', () => {
    test('should get suggested centres based on categories', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/suggest')
        .send({
          district: 'Colombo',
          city: 'Colombo',
          categories: {
            plastic: 5,
            paper: 10,
            metal: 3
          }
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.centres).toHaveLength(1);
      expect(response.body.centres[0]).toHaveProperty('matchScore');
      expect(response.body.centres[0]).toHaveProperty('matchPercentage');
    });

    test('should return 400 if district is missing', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/suggest')
        .send({
          city: 'Colombo',
          categories: { plastic: 5 }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('District is required');
    });

    test('should handle empty categories', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/suggest')
        .send({
          district: 'Colombo',
          city: 'Colombo',
          categories: {}
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
    });
  });

  describe('PUT /api/recycleCentre/update', () => {
    test('should update recycle centre successfully with auth', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Eco Centre',
          address: '789 Updated Street, Colombo',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          website: 'https://updated.com',
          city: 'Colombo',
          district: 'Colombo',
          acceptedItems: ['Plastic', 'Paper', 'Metal', 'Electronics'],
          recycleCentreId: 1
        })
        .expect(200);

      expect(response.body.message).toBe('Recycle centre updated successfully');
      expect(response.body.recycleCentre.name).toBe('Updated Eco Centre');
      expect(response.body.recycleCentre.acceptedItems).toHaveLength(4);
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update')
        .send({
          name: 'Updated Centre',
          address: '789 Updated Street',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          city: 'Colombo',
          district: 'Colombo',
          recycleCentreId: 1
        })
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 404 if recycle centre not found', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Centre',
          address: '789 Updated Street',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          city: 'Colombo',
          district: 'Colombo',
          recycleCentreId: 999
        })
        .expect(404);

      expect(response.body.message).toBe('Recycle centre not found');
    });
  });

  describe('PUT /api/recycleCentre/update-password', () => {
    test('should update password successfully with auth', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recycleCentreId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.message).toBe('Password updated successfully!');

      // Verify password was updated
      const updatedCentre = await RecycleCentre.findOne({ recycleCentre_id: 1 });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedCentre.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update-password')
        .send({
          recycleCentreId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        })
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 400 if passwords do not match', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          recycleCentreId: 1,
          password: 'newpassword123',
          confirmPassword: 'differentpassword'
        })
        .expect(400);

      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('DELETE /api/recycleCentre/delete', () => {
    test('should delete recycle centre successfully with auth', async () => {
      const response = await request(app)
        .delete('/api/recycleCentre/delete?id=1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.message).toBe('Recycle centre deleted successfully!');

      // Verify recycle centre was deleted
      const deletedCentre = await RecycleCentre.findOne({ recycleCentre_id: 1 });
      expect(deletedCentre).toBeNull();
    });

    test('should return 401 without token', async () => {
      const response = await request(app)
        .delete('/api/recycleCentre/delete?id=1')
        .expect(401);

      expect(response.body.message).toBe('Access denied. No token provided.');
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors in getRecycleCentres', async () => {
      jest.spyOn(RecycleCentre, 'find').mockImplementationOnce(() => { throw new Error('Database error'); });

      const response = await request(app)
        .get('/api/recycleCentre')
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in getRecycleCentreById', async () => {
      jest.spyOn(RecycleCentre, 'findOne').mockImplementationOnce(() => { throw new Error('Database error'); });

      const response = await request(app)
        .get('/api/recycleCentre/id?id=1')
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in addRecycleCentre', async () => {
      jest.spyOn(RecycleCentre.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/api/recycleCentre/signup')
        .send({
          name: 'New Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'newcentre@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          city: 'Kandy',
          district: 'Kandy'
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });

    test('should handle database errors in updateRecycleCentre', async () => {
      jest.spyOn(RecycleCentre, 'findOneAndUpdate').mockImplementationOnce(() => { throw new Error('Database error'); });

      const response = await request(app)
        .put('/api/recycleCentre/update')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Centre',
          address: '789 Updated Street',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          city: 'Colombo',
          district: 'Colombo',
          recycleCentreId: 1
        })
        .expect(500);

      expect(response.body).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    test('should handle missing required fields in signup', async () => {
      const response = await request(app)
        .post('/api/recycleCentre/signup')
        .send({
          name: 'New Centre',
          // Missing address, contactNumber, email, password, etc.
        })
        .expect(500); // This will likely result in a server error due to validation

      expect(response.body).toBeDefined();
    });

    test('should handle missing recycleCentreId in update', async () => {
      const response = await request(app)
        .put('/api/recycleCentre/update')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Centre',
          address: '789 Updated Street',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          city: 'Colombo',
          district: 'Colombo'
          // Missing recycleCentreId
        })
        .expect(404);

      expect(response.body).toBeDefined();
    });
  });
});
