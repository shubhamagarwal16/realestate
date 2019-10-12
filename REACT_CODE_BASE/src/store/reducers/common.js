const initialState = {
  isPageLoaderActive: false
};

const commonReducer = (state = initialState, action) => {
  //   console.log("common reducer", action.value);
  switch (action.type) {
    case "TOGGLE_PAGELOADER":
      return {
        ...state,
        isPageLoaderActive: action.value
      };
  }
  return state;
};

export default commonReducer;
