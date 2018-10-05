const main = require('..').default;
const fs = require('fs');

describe('require this module', () => {
  test('Verify module members', () => {
    expect(typeof main).toBe('function');
  });

  test('Verify type definition files', () => {
    expect(fs.statSync('./dist/main.d.ts').isFile()).toBeTruthy();
  });
});
