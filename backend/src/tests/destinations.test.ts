describe('Destination Search Logic', () => {

  const destinations = [
    { id: 1, name: 'Bali', budget: 'Low', interests: ['Beach', 'Culture'] },
    { id: 2, name: 'Tokyo', budget: 'High', interests: ['City', 'Culture'] },
    { id: 3, name: 'Iceland', budget: 'High', interests: ['Nature'] },
  ];

  test('should filter destinations by budget', () => {
    const results = destinations.filter(d => d.budget === 'High');
    expect(results).toHaveLength(2);
    expect(results.map(d => d.name)).toContain('Tokyo');
    expect(results.map(d => d.name)).toContain('Iceland');
  });

  test('should filter destinations by interest', () => {
    const results = destinations.filter(d => d.interests.includes('Culture'));
    expect(results).toHaveLength(2);
    expect(results.map(d => d.name)).toContain('Bali');
    expect(results.map(d => d.name)).toContain('Tokyo');
  });

  test('should return empty array when no destinations match', () => {
    const results = destinations.filter(d => d.budget === 'Medium');
    expect(results).toHaveLength(0);
  });

  test('destination should have required fields', () => {
    destinations.forEach(dest => {
      expect(dest).toHaveProperty('id');
      expect(dest).toHaveProperty('name');
      expect(dest).toHaveProperty('budget');
      expect(dest).toHaveProperty('interests');
    });
  });
});