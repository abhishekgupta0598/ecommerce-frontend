export const ADDITEM = "ADDITEM";
export const REMOVEITEM = "REMOVEITEM";

export const addItem = () => {
  return {
    type: ADDITEM,
  };
};

export const removeItem = () => {
  return {
    type: REMOVEITEM,
  };
};
