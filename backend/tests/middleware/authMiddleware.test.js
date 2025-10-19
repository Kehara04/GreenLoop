const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/authMiddleware');

describe('AuthMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn(),
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('Token Validation', () => {
    test('should call next() for valid token with correct role', () => {
      const token = jwt.sign(
        { id: 1, email: 'test@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin', 'customer']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(1);
      expect(req.user.role).toBe('admin');
    });

    test('should return 401 if no token provided', () => {
      req.header.mockReturnValue(null);

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if token format is invalid', () => {
      req.header.mockReturnValue('InvalidToken');

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if Bearer token is malformed', () => {
      req.header.mockReturnValue('Bearer');

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 for invalid token', () => {
      req.header.mockReturnValue('Bearer invalid-token');

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Invalid token', 
        error: expect.any(String) 
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 for expired token', () => {
      const expiredToken = jwt.sign(
        { id: 1, email: 'test@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '-1h' } // Expired token
      );

      req.header.mockReturnValue(`Bearer ${expiredToken}`);

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Session expired. Please log in again.' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Role Authorization', () => {
    test('should allow access for admin role', () => {
      const token = jwt.sign(
        { id: 1, email: 'admin@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should allow access for customer role', () => {
      const token = jwt.sign(
        { id: 1, email: 'customer@example.com', role: 'customer' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['customer']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should allow access for multiple roles', () => {
      const token = jwt.sign(
        { id: 1, email: 'admin@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin', 'customer']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should deny access for unauthorized role', () => {
      const token = jwt.sign(
        { id: 1, email: 'customer@example.com', role: 'customer' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin']); // Only admin allowed
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. You do not have permission' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should deny access for recycleCentre role when not allowed', () => {
      const token = jwt.sign(
        { id: 1, email: 'centre@example.com', role: 'recycleCentre' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin', 'customer']); // recycleCentre not allowed
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. You do not have permission' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Token Payload', () => {
    test('should set user data from token payload', () => {
      const tokenPayload = {
        id: 123,
        email: 'test@example.com',
        role: 'admin',
        userType: 'user'
      };

      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });
      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(req.user).toMatchObject(tokenPayload);
      expect(next).toHaveBeenCalled();
    });

    test('should handle token with additional fields', () => {
      const tokenPayload = {
        id: 456,
        email: 'centre@example.com',
        role: 'recycleCentre',
        userType: 'recycleCentre',
        extraField: 'extraValue'
      };

      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });
      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['recycleCentre']);
      middleware(req, res, next);

      expect(req.user).toMatchObject(tokenPayload);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty roles array', () => {
      const token = jwt.sign(
        { id: 1, email: 'test@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware([]); // Empty roles array
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. You do not have permission' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should handle token with missing role', () => {
      const token = jwt.sign(
        { id: 1, email: 'test@example.com' }, // No role field
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`);

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. You do not have permission' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should handle Authorization header with extra spaces', () => {
      const token = jwt.sign(
        { id: 1, email: 'test@example.com', role: 'admin' },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.header.mockReturnValue(`Bearer ${token}`); // Remove extra spaces for now

      const middleware = authMiddleware(['admin']);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
    });
  });
});
