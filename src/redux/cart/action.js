export const ADDITEM = "ADDITEM";
export const REMOVEITEM = "REMOVEITEM";

export const addItem = (value) => {
  return {
    type: ADDITEM,
    items: value,
  };
};

export const removeItem = (value) => {
  return {
    type: REMOVEITEM,
    items: value,
  };
};
