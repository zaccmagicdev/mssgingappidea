export const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  submitMethod: () => {},
};

export const LoginLandingPageReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };

    case "SUBMIT_METHOD":
      return {
        ...state,
        submitMethod: (username, email, password) =>
          action.payload.submitMethod(username, email, password),
      };

    case "SUBMIT_METHOD_GOOGLE":
      return {
        ...state,
        submitMethod: () =>
          action.payload.submitMethod(),
      };
    case "SUBMIT_METHOD_APPLE":
      
    default:
      return state;
  }
};
