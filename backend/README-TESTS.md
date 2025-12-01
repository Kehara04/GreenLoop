# GreenLoop Backend Test Suite

This document describes the comprehensive test suite for the GreenLoop backend application.

## Test Structure

The test suite is organized into the following categories:

### 1. Models Tests (`tests/models/`)
- **user.test.js** - Tests for User model including:
  - Schema validation
  - Auto-increment user_id
  - User level calculation
  - Points management (add/remove points)
  - Badge system
  - Virtual properties
  - Default values

- **recycleCentre.test.js** - Tests for RecycleCentre model including:
  - Schema validation
  - Auto-increment recycleCentre_id
  - Location processing
  - Accepted items handling
  - Optional fields
  - Default values

- **recycleFormModel.test.js** - Tests for RecycleForm model including:
  - Schema validation
  - Auto-increment form_id
  - Quantity and points calculation
  - Default values
  - Category validation
  - Status transitions

### 2. Controllers Tests (`tests/controllers/`)
- **userController.test.js** - Tests for user authentication and management
- **adminController.test.js** - Tests for admin operations
- **customerController.test.js** - Tests for customer operations
- **recycleCentreController.test.js** - Tests for recycle centre operations
- **recycleController.test.js** - Tests for recycling form operations

### 3. Routes Tests (`tests/routes/`)
- **userRoutes.test.js** - Tests for user API endpoints
- **adminRoutes.test.js** - Tests for admin API endpoints
- **customerRoutes.test.js** - Tests for customer API endpoints
- **recycleCentreRoutes.test.js** - Tests for recycle centre API endpoints
- **recycleFormRoute.test.js** - Tests for recycling form API endpoints

### 4. Middleware Tests (`tests/middleware/`)
- **authMiddleware.test.js** - Tests for authentication middleware

## Test Features

### Database Testing
- Uses MongoDB Memory Server for isolated testing
- Automatic database cleanup between tests
- No external database dependencies

### Authentication Testing
- JWT token validation
- Role-based access control
- Token expiration handling
- Authorization middleware testing

### API Testing
- Complete endpoint coverage
- Request/response validation
- Error handling
- Status code verification
- Input validation

### Model Testing
- Schema validation
- Business logic testing
- Data integrity
- Default values
- Virtual properties

## Running Tests

### Prerequisites
```bash
cd backend
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test Files
```bash
# Run model tests only
npm test -- tests/models/

# Run controller tests only
npm test -- tests/controllers/

# Run route tests only
npm test -- tests/routes/
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Node.js test environment
- MongoDB Memory Server setup
- Coverage collection from all source files
- Test timeout: 10 seconds
- Clear mocks between tests

### Test Setup (`tests/setup.js`)
- MongoDB connection setup
- Database cleanup
- Environment variable mocking
- Global test configuration

## Coverage Reports

Test coverage reports are generated in the `coverage/` directory:
- **HTML Report**: `coverage/lcov-report/index.html`
- **LCOV Report**: `coverage/lcov.info`
- **Text Summary**: Console output

## Test Categories

### Unit Tests
- Individual function testing
- Model method testing
- Utility function testing

### Integration Tests
- API endpoint testing
- Database integration
- Authentication flow testing

### Error Handling Tests
- Invalid input handling
- Database error scenarios
- Authentication failures
- Authorization failures

## Mocking

### External Dependencies
- Email service (mailer utility)
- File upload (multer)
- Database operations (for error testing)

### Authentication
- JWT token generation
- User authentication
- Role-based access

## Best Practices

1. **Isolation**: Each test is independent
2. **Cleanup**: Database is cleaned between tests
3. **Mocking**: External dependencies are mocked
4. **Coverage**: Comprehensive test coverage
5. **Error Testing**: Both success and failure scenarios
6. **Validation**: Input and output validation

## Test Data

### Sample Users
- Customer users with different roles
- Admin users
- Recycle centre users

### Sample Data
- Recycle forms with various categories
- Different locations and districts
- Various statuses and points

## Continuous Integration

The test suite is designed to run in CI/CD environments:
- No external dependencies
- Fast execution
- Comprehensive coverage
- Clear error reporting

## Troubleshooting

### Common Issues

1. **MongoDB Memory Server Issues**
   - Ensure sufficient memory
   - Check Node.js version compatibility

2. **Test Timeouts**
   - Increase timeout in jest.config.js
   - Check for infinite loops in tests

3. **Mock Issues**
   - Verify mock implementations
   - Check mock cleanup

### Debug Mode
```bash
# Run tests with debug output
DEBUG=* npm test
```

## Contributing

When adding new tests:
1. Follow existing test patterns
2. Include both success and failure cases
3. Add appropriate mocks
4. Update this documentation
5. Ensure good coverage

## Test Metrics

The test suite provides:
- **Function Coverage**: All functions tested
- **Line Coverage**: All code lines covered
- **Branch Coverage**: All conditional branches tested
- **Statement Coverage**: All statements executed

Target: >90% coverage across all metrics.
