// FIX #1: Extracted helper to keep patientId generation in one place so the component no longer hardcodes patientId
export const getDemoPatientId = () => {
  let patientId = localStorage.getItem('demoPatientId');
  if (!patientId) {
    patientId = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('demoPatientId', patientId);
  }
  return patientId;
};

// FIX #2: Extracted apiRequest helper to remove duplicate fetch 
export const apiRequest = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (data !== null) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`http://localhost:4000${url}`, options);
  return response;
};
