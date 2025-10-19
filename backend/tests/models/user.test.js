const User = require('../../models/user');
const bcrypt = require('bcryptjs');

describe('User Model', () => {
  describe('Schema Validation', () => {
    test('should create a valid user with required fields', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'customer'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.user_id).toBeDefined();
      expect(savedUser.firstName).toBe(userData.firstName);
      expect(savedUser.lastName).toBe(userData.lastName);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.role).toBe(userData.role);
      expect(savedUser.totalPoints).toBe(0);
      expect(savedUser.user_level).toBe('Beginner Recycler');
      expect(savedUser.userStatus).toBe('active');
      expect(savedUser.isVerified).toBe(false);
    });

    test('should require firstName', async () => {
      const userData = {
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    test('should require lastName', async () => {
      const userData = {
        firstName: 'John',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    test('should require email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    test('should require password', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    test('should enforce unique email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const user1 = new User(userData);
      await user1.save();

      const user2 = new User(userData);
      await expect(user2.save()).rejects.toThrow();
    });

    test('should validate role enum', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'invalid_role'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    test('should validate userStatus enum', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        userStatus: 'invalid_status'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Auto-increment user_id', () => {
    test('should auto-increment user_id for new users', async () => {
      const user1 = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john1@example.com',
        password: 'password123'
      });

      const user2 = new User({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane1@example.com',
        password: 'password123'
      });

      const savedUser1 = await user1.save();
      const savedUser2 = await user2.save();

      expect(savedUser2.user_id).toBe(savedUser1.user_id + 1);
    });
  });

  describe('User Level Calculation', () => {
    test('should set user level based on totalPoints', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        totalPoints: 0
      });

      await user.save();
      expect(user.user_level).toBe('Beginner Recycler');

      user.totalPoints = 25;
      await user.save();
      expect(user.user_level).toBe('Eco Learner');

      user.totalPoints = 75;
      await user.save();
      expect(user.user_level).toBe('Eco Star');

      user.totalPoints = 150;
      await user.save();
      expect(user.user_level).toBe('Earth Champion');
    });
  });

  describe('Points Management', () => {
    test('should add points correctly', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        totalPoints: 10
      });

      await user.save();

      await user.addPoints(20, null, 'Test points');
      
      expect(user.totalPoints).toBe(30);
      expect(user.pointsHistory).toHaveLength(1);
      expect(user.pointsHistory[0].points).toBe(20);
      expect(user.pointsHistory[0].description).toBe('Test points');
    });

    test('should remove points correctly', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        totalPoints: 50
      });

      await user.save();

      await user.removePoints(10, null, 'Test refund');
      
      expect(user.totalPoints).toBe(40);
      expect(user.pointsHistory).toHaveLength(1);
      expect(user.pointsHistory[0].points).toBe(-10);
      expect(user.pointsHistory[0].description).toBe('Test refund');
    });

    test('should not allow negative total points', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        totalPoints: 10
      });

      await user.save();

      await user.removePoints(20, null, 'Test refund');
      
      expect(user.totalPoints).toBe(0);
    });

    test('should get badges correctly', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        totalPoints: 75
      });

      await user.save();

      const badges = user.getBadges();
      
      expect(badges).toHaveLength(4);
      expect(badges[0].earned).toBe(true); // Beginner Recycler
      expect(badges[1].earned).toBe(true); // Eco Learner
      expect(badges[2].earned).toBe(true); // Eco Star
      expect(badges[3].earned).toBe(false); // Earth Champion
    });
  });

  describe('Virtual Properties', () => {
    test('should return full name correctly', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      await user.save();
      
      expect(user.fullName).toBe('John Doe');
    });
  });

  describe('Default Values', () => {
    test('should set default values correctly', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      await user.save();
      
      expect(user.role).toBe('customer');
      expect(user.userStatus).toBe('active');
      expect(user.isVerified).toBe(false);
      expect(user.totalPoints).toBe(0);
      expect(user.user_level).toBe('Beginner Recycler');
      expect(user.pointsHistory).toEqual([]);
      expect(user.createdAt).toBeDefined();
    });
  });
});
