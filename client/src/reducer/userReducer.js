export const useReducer = (state = null, action) => {
  // state bằng null vì ban đầu chả có user nào cả
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
