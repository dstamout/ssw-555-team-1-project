export const getDemoPatientId = () => {
  let patientId = localStorage.getItem('demoPatientId');
  if (!patientId) {
    patientId = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('demoPatientId', patientId);
  }
  return patientId;
};

export const apiRequest = async (url, method = 'GET', data = null) => {
  const authToken = localStorage.getItem('authToken');
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (authToken) {
    options.headers.Authorization = `Bearer ${authToken}`;
  }
  if (data !== null) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`http://localhost:4000${url}`, options);
  return response;
};
