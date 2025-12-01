const bcrypt = require('bcryptjs');

const recycleCentreController = require('../../controllers/recycleCentreController');
const RecycleCentre = require('../../models/recycleCentre');

describe('RecycleCentreController', () => {
  let mockRecycleCentre;

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
  });

  describe('getRecycleCentres', () => {
    test('should get all recycle centres without passwords', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentres(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toHaveLength(1);
      expect(responseData[0].password).toBeUndefined();
      expect(responseData[0].name).toBe('Eco Centre');
    });

    test('should handle database errors', async () => {
      jest.spyOn(RecycleCentre, 'find').mockImplementationOnce(() => { throw new Error('Database error'); });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentres(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getRecycleCentreById', () => {
    test('should get recycle centre by ID', async () => {
      const req = {
        query: { id: '1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentreById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.recycleCentre_id).toBe(1);
      expect(responseData.password).toBeUndefined();
    });

    test('should return 404 if recycle centre not found', async () => {
      const req = {
        query: { id: '999' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentreById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Recycle centre not found');
    });
  });

  describe('getRecycleCentreByEmail', () => {
    test('should get recycle centre by email', async () => {
      const req = {
        body: { email: 'centre@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentreByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.email).toBe('centre@example.com');
      expect(responseData.password).toBeUndefined();
    });

    test('should return 404 if recycle centre not found', async () => {
      const req = {
        body: { email: 'nonexistent@example.com' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getRecycleCentreByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Recycle centre not found');
    });
  });

  describe('addRecycleCentre', () => {
    test('should add recycle centre successfully', async () => {
      const req = {
        body: {
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
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.addRecycleCentre(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Recycle centre registered successfully!');
      expect(responseData.recycleCentre.name).toBe('New Eco Centre');
      expect(responseData.recycleCentre.email).toBe('newcentre@example.com');

      // Verify recycle centre was created
      const createdCentre = await RecycleCentre.findOne({ email: 'newcentre@example.com' });
      expect(createdCentre).toBeTruthy();
      expect(createdCentre.location.city).toBe('kandy');
      expect(createdCentre.location.district).toBe('kandy');
    });

    test('should return 400 if email already exists', async () => {
      const req = {
        body: {
          name: 'Duplicate Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'centre@example.com', // Already exists
          password: 'password123',
          confirmPassword: 'password123',
          city: 'Kandy',
          district: 'Kandy'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.addRecycleCentre(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle centre with this email already exists.' });
    });

    test('should return 400 if passwords do not match', async () => {
      const req = {
        body: {
          name: 'New Centre',
          address: '456 Blue Street, Kandy',
          contactNumber: '+94112345679',
          email: 'newcentre@example.com',
          password: 'password123',
          confirmPassword: 'differentpassword',
          city: 'Kandy',
          district: 'Kandy'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.addRecycleCentre(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
    });
  });

  describe('updateRecycleCentre', () => {
    test('should update recycle centre successfully', async () => {
      const req = {
        body: {
          name: 'Updated Eco Centre',
          address: '789 Updated Street, Colombo',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          website: 'https://updated.com',
          city: 'Colombo',
          district: 'Colombo',
          acceptedItems: ['Plastic', 'Paper', 'Metal', 'Electronics'],
          recycleCentreId: 1
        }
      };
      const res = {
        json: jest.fn()
      };

      await recycleCentreController.updateRecycleCentre(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Recycle centre updated successfully');
      expect(responseData.recycleCentre.name).toBe('Updated Eco Centre');
      expect(responseData.recycleCentre.acceptedItems).toHaveLength(4);
    });

    test('should return 404 if recycle centre not found', async () => {
      const req = {
        body: {
          name: 'Updated Centre',
          address: '789 Updated Street',
          contactNumber: '+94112345680',
          email: 'updated@example.com',
          city: 'Colombo',
          district: 'Colombo',
          recycleCentreId: 999
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.updateRecycleCentre(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle centre not found' });
    });
  });

  describe('updatePassword', () => {
    test('should update password successfully', async () => {
      const req = {
        body: {
          recycleCentreId: 1,
          password: 'newpassword123',
          confirmPassword: 'newpassword123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password updated successfully!' });

      // Verify password was updated
      const updatedCentre = await RecycleCentre.findOne({ recycleCentre_id: 1 });
      const isPasswordValid = await bcrypt.compare('newpassword123', updatedCentre.password);
      expect(isPasswordValid).toBe(true);
    });

    test('should return 400 if passwords do not match', async () => {
      const req = {
        body: {
          recycleCentreId: 1,
          password: 'newpassword123',
          confirmPassword: 'differentpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
    });
  });

  describe('deleteRecycleCentre', () => {
    test('should delete recycle centre successfully', async () => {
      const req = {
        query: { id: '1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.deleteRecycleCentre(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle centre deleted successfully!' });

      // Verify recycle centre was deleted
      const deletedCentre = await RecycleCentre.findOne({ recycleCentre_id: 1 });
      expect(deletedCentre).toBeNull();
    });
  });

  describe('getCentresByArea', () => {
    test('should get centres by district', async () => {
      const req = {
        query: { district: 'Colombo' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getCentresByArea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
      expect(responseData.count).toBe(1);
      expect(responseData.centres).toHaveLength(1);
    });

    test('should get centres by district and city', async () => {
      const req = {
        query: { district: 'Colombo', city: 'Colombo' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getCentresByArea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
      expect(responseData.count).toBe(1);
    });

    test('should filter by accepted items', async () => {
      const req = {
        query: { 
          district: 'Colombo', 
          acceptedItems: 'Plastic,Paper' 
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getCentresByArea(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
    });

    test('should return 400 if district is missing', async () => {
      const req = {
        query: { city: 'Colombo' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getCentresByArea(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        success: false, 
        message: 'District is required' 
      });
    });
  });

  describe('getSuggestedCentres', () => {
    test('should get suggested centres based on categories', async () => {
      const req = {
        body: {
          district: 'Colombo',
          city: 'Colombo',
          categories: {
            plastic: 5,
            paper: 10,
            metal: 3
          }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getSuggestedCentres(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
      expect(responseData.count).toBe(1);
      expect(responseData.centres).toHaveLength(1);
      expect(responseData.centres[0]).toHaveProperty('matchScore');
      expect(responseData.centres[0]).toHaveProperty('matchPercentage');
    });

    test('should return 400 if district is missing', async () => {
      const req = {
        body: {
          city: 'Colombo',
          categories: { plastic: 5 }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getSuggestedCentres(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        success: false, 
        message: 'District is required' 
      });
    });

    test('should handle empty categories', async () => {
      const req = {
        body: {
          district: 'Colombo',
          city: 'Colombo',
          categories: {}
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleCentreController.getSuggestedCentres(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.success).toBe(true);
      expect(responseData.count).toBe(1);
    });
  });
});
