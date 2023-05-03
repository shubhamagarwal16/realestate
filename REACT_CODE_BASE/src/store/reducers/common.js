const initialState = {
  isPageLoaderActive: false,
  user: {}
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PAGELOADER":
      return {
        ...state,
        isPageLoaderActive: action.value
      };
    case "STORE_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      break;
  }
  return state;
};

export default commonReducer;
