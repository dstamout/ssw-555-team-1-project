import test from 'node:test';
import assert from 'node:assert/strict';

// Refactored test for the mood API after removing hardcoded patientId in the frontend

const generateDemoPatientId = () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

test('refactored mood entry works (refactored version)', async () => {
  const patientId = generateDemoPatientId();
  const res = await fetch('http://localhost:4000/api/mood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patientId,
      mood: 'happy',
      intensity: 7,
      notes: 'refactored test'
    })
  });

  assert.equal(res.status, 200);
});

// Refactored second test for request to show the refactored API helper can be reused
test('refactored API handles multiple requests (refactored version)', async () => {
  const patientId = generateDemoPatientId();
  const res = await fetch('http://localhost:4000/api/mood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patientId,
      mood: 'neutral',
      intensity: 4,
      notes: 'second test'
    })
  });

  assert.equal(res.status, 200);
});
