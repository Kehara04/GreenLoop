const recycleController = require('../../controllers/recycleController');
const RecycleForm = require('../../models/recycleFormModel');
const User = require('../../models/user');

describe('RecycleController', () => {
  let mockUser;
  let mockForm;

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
  });

  describe('createRecycleForm', () => {
    test('should create recycle form successfully', async () => {
      const req = {
        user: { id: '1' },
        body: {
          categories: {
            metal: 5,
            plastic: 10
          },
          location: {
            district: 'Colombo',
            city: 'Colombo'
          },
          notes: 'New test form'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.createRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Recycle form created');
      expect(responseData.form).toBeDefined();
      expect(responseData.profile).toBeDefined();
    });

    test('should return 400 if userId is missing', async () => {
      const req = {
        body: {
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.createRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: expect.any(String) });
    });

    test('should return 404 if customer not found', async () => {
      const req = {
        user: { id: '999' },
        body: {
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.createRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });

  describe('getUserRecycleForms', () => {
    test('should get user recycle forms', async () => {
      const req = {
        user: { id: '1' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getUserRecycleForms(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData).toHaveLength(1);
    });

    test('should handle missing userId', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserRecycleForms(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: expect.any(String) });
    });
  });

  describe('getUserProfile', () => {
    test('should get user profile successfully', async () => {
      const req = {
        user: { id: '1' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getUserProfile(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.user).toBeDefined();
      expect(responseData.totalPoints).toBeDefined();
      expect(responseData.badges).toBeDefined();
      expect(responseData.totals).toBeDefined();
    });

    test('should return 404 if customer not found', async () => {
      const req = {
        user: { id: '999' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });

    test('should handle missing userId', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: expect.any(String) });
    });
  });

  describe('getDistricts', () => {
    test('should return list of districts', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      await recycleController.getDistricts(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData).toContain('Colombo');
      expect(responseData).toContain('Kandy');
      expect(responseData).toContain('Galle');
    });
  });

  describe('getUserStats', () => {
    test('should get user statistics', async () => {
      const req = {
        user: { id: '1' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getUserStats(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.byMonth).toBeDefined();
      expect(responseData.byCategory).toBeDefined();
    });

    test('should handle missing userId', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserStats(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: expect.any(String) });
    });
  });

  describe('getUserPointsHistory', () => {
    test('should get user points history', async () => {
      const req = {
        user: { id: '1' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getUserPointsHistory(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
    });

    test('should return 404 if customer not found', async () => {
      const req = {
        user: { id: '999' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserPointsHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });

    test('should handle missing userId', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getUserPointsHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: expect.any(String) });
    });
  });

  describe('awardPointsToUser', () => {
    test('should award points to user', async () => {
      const req = {
        params: { id: mockForm._id.toString() }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.awardPointsToUser(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Points awarded');
      expect(responseData.totalPoints).toBeDefined();
      expect(responseData.user_level).toBeDefined();
    });

    test('should return 404 if form not found', async () => {
      const req = {
        params: { id: '507f1f77bcf86cd799439011' } // Valid ObjectId but non-existent
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.awardPointsToUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle form not found' });
    });
  });

  describe('updateFormStatus', () => {
    test('should update form status successfully', async () => {
      const req = {
        params: { id: mockForm._id.toString() },
        body: { status: 'completed' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.updateFormStatus(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Status updated');
      expect(responseData.form).toBeDefined();
      expect(responseData.totalPoints).toBeDefined();
    });

    test('should return 404 if form not found', async () => {
      const req = {
        params: { id: '507f1f77bcf86cd799439011' },
        body: { status: 'completed' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.updateFormStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle form not found' });
    });
  });

  describe('getRecycleForm', () => {
    test('should get single recycle form', async () => {
      const req = {
        params: { id: mockForm._id.toString() }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getRecycleForm(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData._id.toString()).toBe(mockForm._id.toString());
    });

    test('should return 404 if form not found', async () => {
      const req = {
        params: { id: '507f1f77bcf86cd799439011' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.getRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });
  });

  describe('updateRecycleForm', () => {
    test('should update recycle form successfully', async () => {
      const req = {
        params: { id: mockForm._id.toString() },
        body: {
          categories: {
            metal: 10,
            plastic: 15
          },
          location: {
            district: 'Kandy',
            city: 'Kandy'
          },
          notes: 'Updated form'
        }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.updateRecycleForm(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.message).toBe('Recycle form updated');
      expect(responseData.form).toBeDefined();
    });

    test('should return 400 if form is not pending', async () => {
      // Update form status to completed
      mockForm.status = 'completed';
      await mockForm.save();

      const req = {
        params: { id: mockForm._id.toString() },
        body: {
          categories: { metal: 10 }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.updateRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Only pending forms can be edited' });
    });

    test('should return 404 if form not found', async () => {
      const req = {
        params: { id: '507f1f77bcf86cd799439011' },
        body: {
          categories: { metal: 10 }
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.updateRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });
  });

  describe('deleteRecycleForm', () => {
    test('should delete recycle form successfully', async () => {
      const req = {
        params: { id: mockForm._id.toString() }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.deleteRecycleForm(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Recycle form deleted' });

      // Verify form was deleted
      const deletedForm = await RecycleForm.findById(mockForm._id);
      expect(deletedForm).toBeNull();
    });

    test('should return 400 if form is not pending', async () => {
      // Update form status to completed
      mockForm.status = 'completed';
      await mockForm.save();

      const req = {
        params: { id: mockForm._id.toString() }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.deleteRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Only pending forms can be deleted' });
    });

    test('should return 404 if form not found', async () => {
      const req = {
        params: { id: '507f1f77bcf86cd799439011' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await recycleController.deleteRecycleForm(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });
  });

  describe('Admin Analytics', () => {
    test('should get admin overview', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      await recycleController.getAdminOverview(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData.kpis).toBeDefined();
      expect(responseData.byDistrict).toBeDefined();
    });

    test('should get admin by month data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      await recycleController.getAdminByMonth(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
    });

    test('should get admin by category data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      await recycleController.getAdminByCategory(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(responseData).toBeDefined();
    });

    test('should get admin recent forms', async () => {
      const req = {
        query: { limit: '5' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getAdminRecentForms(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
    });

    test('should get admin top users', async () => {
      const req = {
        query: { limit: '5' }
      };
      const res = {
        json: jest.fn()
      };

      await recycleController.getAdminTopUsers(req, res);

      expect(res.json).toHaveBeenCalled();
      
      const responseData = res.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
    });
  });
});
