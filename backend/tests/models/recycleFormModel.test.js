const RecycleForm = require('../../models/recycleFormModel');

describe('RecycleForm Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid recycle form with required fields', async () => {
      const formData = {
        userId: '123',
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
        notes: 'Test recycling form'
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm._id).toBeDefined();
      expect(savedForm.form_id).toBeDefined();
      expect(savedForm.userId).toBe(formData.userId);
      expect(savedForm.categories).toEqual(formData.categories);
      expect(savedForm.location).toEqual(formData.location);
      expect(savedForm.notes).toBe(formData.notes);
      expect(savedForm.status).toBe('pending');
      expect(savedForm.totalQuantity).toBe(44); // Sum of all categories
      expect(savedForm.pointsEarned).toBe(44); // Same as totalQuantity
      expect(savedForm.pointsAwarded).toBe(false);
    });

    test('should require userId', async () => {
      const formData = {
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should require location.district', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should require location.city', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should validate district enum', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'InvalidDistrict',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should validate status enum', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        },
        status: 'invalid_status'
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should enforce maxlength for city', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'A'.repeat(51) // Exceeds maxlength of 50
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });

    test('should enforce maxlength for notes', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        },
        notes: 'A'.repeat(501) // Exceeds maxlength of 500
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });
  });

  describe('Auto-increment form_id', () => {
    test('should auto-increment form_id for new forms', async () => {
      const form1 = new RecycleForm({
        userId: '123',
        categories: { metal: 5 },
        location: { district: 'Colombo', city: 'Colombo' }
      });

      const form2 = new RecycleForm({
        userId: '456',
        categories: { plastic: 10 },
        location: { district: 'Kandy', city: 'Kandy' }
      });

      const savedForm1 = await form1.save();
      const savedForm2 = await form2.save();

      expect(savedForm2.form_id).toBe(savedForm1.form_id + 1);
    });
  });

  describe('Quantity and Points Calculation', () => {
    test('should calculate totalQuantity correctly', async () => {
      const formData = {
        userId: '123',
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
        }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.totalQuantity).toBe(44);
    });

    test('should set pointsEarned equal to totalQuantity', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.pointsEarned).toBe(savedForm.totalQuantity);
    });

    test('should handle zero quantities', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 0,
          plastic: 0,
          polythene: 0,
          eWaste: 0,
          clothes: 0,
          paper: 0,
          regiform: 0
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.totalQuantity).toBe(0);
      expect(savedForm.pointsEarned).toBe(0);
    });

    test('should handle missing categories', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
          // Other categories missing
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.totalQuantity).toBe(15);
      expect(savedForm.pointsEarned).toBe(15);
    });

    test('should recalculate on update', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: 5,
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.totalQuantity).toBe(15);

      savedForm.categories.metal = 20;
      const updatedForm = await savedForm.save();

      expect(updatedForm.totalQuantity).toBe(30);
      expect(updatedForm.pointsEarned).toBe(30);
    });
  });

  describe('Default Values', () => {
    test('should set default status to pending', async () => {
      const formData = {
        userId: '123',
        categories: { metal: 5 },
        location: { district: 'Colombo', city: 'Colombo' }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.status).toBe('pending');
    });

    test('should set default pointsAwarded to false', async () => {
      const formData = {
        userId: '123',
        categories: { metal: 5 },
        location: { district: 'Colombo', city: 'Colombo' }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.pointsAwarded).toBe(false);
    });

    test('should set default values for categories', async () => {
      const formData = {
        userId: '123',
        location: { district: 'Colombo', city: 'Colombo' }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.categories.metal).toBe(0);
      expect(savedForm.categories.plastic).toBe(0);
      expect(savedForm.categories.polythene).toBe(0);
      expect(savedForm.categories.eWaste).toBe(0);
      expect(savedForm.categories.clothes).toBe(0);
      expect(savedForm.categories.paper).toBe(0);
      expect(savedForm.categories.regiform).toBe(0);
    });

    test('should set timestamps', async () => {
      const formData = {
        userId: '123',
        categories: { metal: 5 },
        location: { district: 'Colombo', city: 'Colombo' }
      };

      const form = new RecycleForm(formData);
      const savedForm = await form.save();

      expect(savedForm.createdAt).toBeDefined();
      expect(savedForm.updatedAt).toBeDefined();
    });
  });

  describe('Category Validation', () => {
    test('should enforce minimum value of 0 for categories', async () => {
      const formData = {
        userId: '123',
        categories: {
          metal: -5, // Negative value should fail
          plastic: 10
        },
        location: {
          district: 'Colombo',
          city: 'Colombo'
        }
      };

      const form = new RecycleForm(formData);
      await expect(form.save()).rejects.toThrow();
    });
  });

  describe('Status Transitions', () => {
    test('should allow valid status values', async () => {
      const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];

      for (const status of validStatuses) {
        const formData = {
          userId: '123',
          categories: { metal: 5 },
          location: { district: 'Colombo', city: 'Colombo' },
          status
        };

        const form = new RecycleForm(formData);
        const savedForm = await form.save();
        expect(savedForm.status).toBe(status);
      }
    });
  });
});
