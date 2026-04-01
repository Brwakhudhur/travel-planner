import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('Authentication Utilities', () => {
  
  test('bcrypt should hash a password successfully', async () => {
    const password = 'testPassword123';
    const hash = await bcrypt.hash(password, 10);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
  });

  test('bcrypt should correctly verify a valid password', async () => {
    const password = 'testPassword123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare(password, hash);
    expect(result).toBe(true);
  });

  test('bcrypt should reject an incorrect password', async () => {
    const password = 'testPassword123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare('wrongPassword', hash);
    expect(result).toBe(false);
  });

  test('JWT should generate and verify a token', () => {
    const payload = { userId: 1, email: 'test@scoop.com' };
    const secret = 'test-secret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const decoded = jwt.verify(token, secret) as typeof payload;
    expect(decoded.userId).toBe(1);
    expect(decoded.email).toBe('test@scoop.com');
  });

  test('JWT should reject a token signed with wrong secret', () => {
    const token = jwt.sign({ userId: 1 }, 'correct-secret');
    expect(() => jwt.verify(token, 'wrong-secret')).toThrow();
  });
});