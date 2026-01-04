const getUserRole = () => {
  return localStorage.getItem('user-role') || 'user';
};

export default getUserRole;
