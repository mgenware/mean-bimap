const BiMap = require('..').default;

test('set/get/del/length', () => {
  const m = new BiMap();
  expect(m.length).toBe(0);
  expect(m.keyByValue('b')).toBeUndefined();
  expect(m.set('a', 'b')).toBe(true);
  expect(m.keyByValue('b')).toBe('a');
  expect(m.valueByKey('a')).toBe('b');
  expect(m.set('a', 'b')).toBe(false);
  expect(m.length).toBe(1);
  expect(m.set('x', 'y')).toBe(true);
  expect(m.length).toBe(2);
  expect(m.deleteByValue('y')).toBe(true);
  expect(m.deleteByValue('zzz')).toBe(false);
  expect(m.length).toBe(1);
  expect(m.valueByKey('x')).toBeUndefined();
  expect(m.keyByValue('b')).toBe('a');
  expect(m.deleteByKey('a')).toBe(true);
  expect(m.keyByValue('b')).toBeUndefined();
  expect(m.length).toBe(0);
  expect(m.set('a', 'b')).toBe(true);
  expect(m.keyByValue('b')).toBe('a');
});

test('ctor', () => {
  const m = new BiMap([
    ['a', 'b'],
    ['x', 'y'],
  ]);
  expect(m.length).toBe(2);
  expect(m.keyByValue('b')).toBe('a');
  expect(m.valueByKey('x')).toBe('y');
});

test('setPair', () => {
  const m = new BiMap();
  m.setPair(['a', 'b']);
  expect(m.keyByValue('b')).toBe('a');
  expect(m.valueByKey('x')).toBeUndefined();
  expect(m.length).toBe(1);
  m.setPair(['x', 'y']);
  expect(m.valueByKey('x')).toBe('y');
  expect(m.length).toBe(2);
});

test('keys/values', () => {
  const m = new BiMap([
    ['a', 'b'],
    ['x', 'y'],
  ]);
  expect(m.keys().sort()).toEqual(['a', 'b'].sort());
  expect(m.values().sort()).toEqual(['x', 'y'].sort());
});
