import test from 'node:test';
import assert from 'node:assert/strict';

// Smelly test for the mood API using a hardcoded patientId.

test('should create mood entry (smelly version)', async () => {
  const res = await fetch('http://localhost:4000/api/mood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patientId: '000000000000000000000000',
      mood: 'happy',
      intensity: 5,
      notes: 'test'
    })
  });

  assert.equal(res.status, 200);
});
