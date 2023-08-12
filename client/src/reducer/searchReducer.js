export const searchReducer = (state = { text: "" }, action) => {
  // state bằng null vì ban đầu chả có user nào cả
  switch (action.type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload }; // thêm các trường để search
    case "DELETE_QUERY":
      delete state?.[action.payload];
      return state;
    default:
      return state;
  }
};
