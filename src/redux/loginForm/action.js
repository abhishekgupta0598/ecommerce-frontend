export const OPEN = "OPEN";
export const CLOSE = "CLOSE";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export const openForm = () => {
  return { type: OPEN };
};

export const closeForm = () => {
  return { type: CLOSE };
};

export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
