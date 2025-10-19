export const saveToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};


export const saveRoles = (roles) => {
  localStorage.setItem("roles", JSON.stringify(roles));
}

export const getRoles = () => {
  const roles = localStorage.getItem("roles");
  return roles ? JSON.parse(roles) : null;
}

export const removeRoles = () => {
  localStorage.removeItem("roles");
}