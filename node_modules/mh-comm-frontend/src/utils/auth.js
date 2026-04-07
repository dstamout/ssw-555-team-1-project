export const getAuthUser = () => {
  const raw = localStorage.getItem('authUser');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getAuthRole = () => getAuthUser()?.role || null;

export const isAuthorized = (allowedRoles = []) => {
  const user = getAuthUser();
  if (!user) return false;
  if (allowedRoles.length === 0) return true;
  return allowedRoles.includes(user.role);
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};
