const RecycleCentre = require('../../models/recycleCentre');

describe('RecycleCentre Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid recycle centre with required fields', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre._id).toBeDefined();
      expect(savedCentre.recycleCentre_id).toBeDefined();
      expect(savedCentre.name).toBe(centreData.name);
      expect(savedCentre.address).toBe(centreData.address);
      expect(savedCentre.contactNumber).toBe(centreData.contactNumber);
      expect(savedCentre.email).toBe(centreData.email);
      expect(savedCentre.role).toBe('recycleCentre');
      expect(savedCentre.location.city).toBe('colombo');
      expect(savedCentre.location.district).toBe('colombo');
      expect(savedCentre.acceptedItems).toEqual([]);
    });

    test('should require name', async () => {
      const centreData = {
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should require address', async () => {
      const centreData = {
        name: 'Eco Centre',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should require contactNumber', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should require password', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should require location.city', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should require location.district', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });

    test('should validate role enum', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        role: 'invalid_role',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      await expect(centre.save()).rejects.toThrow();
    });
  });

  describe('Auto-increment recycleCentre_id', () => {
    test('should auto-increment recycleCentre_id for new centres', async () => {
      const centre1 = new RecycleCentre({
        name: 'Eco Centre 1',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco1@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      });

      const centre2 = new RecycleCentre({
        name: 'Eco Centre 2',
        address: '456 Blue Street, Kandy',
        contactNumber: '+94112345679',
        email: 'eco2@example.com',
        password: 'password123',
        location: {
          city: 'kandy',
          district: 'kandy'
        }
      });

      const savedCentre1 = await centre1.save();
      const savedCentre2 = await centre2.save();

      expect(savedCentre2.recycleCentre_id).toBe(savedCentre1.recycleCentre_id + 1);
    });
  });

  describe('Location Processing', () => {
    test('should lowercase and trim city and district', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: '  COLOMBO  ',
          district: '  COLOMBO  '
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.location.city).toBe('colombo');
      expect(savedCentre.location.district).toBe('colombo');
    });
  });

  describe('Accepted Items', () => {
    test('should handle accepted items array', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        },
        acceptedItems: ['Plastic', 'Paper', 'Metal', 'Electronics']
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.acceptedItems).toEqual(['Plastic', 'Paper', 'Metal', 'Electronics']);
    });

    test('should default to empty array for accepted items', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.acceptedItems).toEqual([]);
    });
  });

  describe('Optional Fields', () => {
    test('should handle optional website field', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        email: 'eco@example.com',
        password: 'password123',
        website: 'https://ecocentre.com',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.website).toBe('https://ecocentre.com');
    });

    test('should handle optional email field', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.email).toBeUndefined();
    });
  });

  describe('Default Values', () => {
    test('should set default role to recycleCentre', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.role).toBe('recycleCentre');
    });

    test('should set timestamps', async () => {
      const centreData = {
        name: 'Eco Centre',
        address: '123 Green Street, Colombo',
        contactNumber: '+94112345678',
        password: 'password123',
        location: {
          city: 'colombo',
          district: 'colombo'
        }
      };

      const centre = new RecycleCentre(centreData);
      const savedCentre = await centre.save();

      expect(savedCentre.createdAt).toBeDefined();
      expect(savedCentre.updatedAt).toBeDefined();
    });
  });
});
