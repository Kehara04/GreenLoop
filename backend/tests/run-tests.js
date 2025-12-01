#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running GreenLoop Backend Tests...\n');

try {
  // Run all tests
  console.log('📋 Running all test suites...');
  execSync('npm test', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('\n✅ All tests completed successfully!');
  
  // Run tests with coverage
  console.log('\n📊 Generating test coverage report...');
  execSync('npm run test:coverage', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('\n🎉 Test coverage report generated!');
  
} catch (error) {
  console.error('\n❌ Tests failed:', error.message);
  process.exit(1);
}
