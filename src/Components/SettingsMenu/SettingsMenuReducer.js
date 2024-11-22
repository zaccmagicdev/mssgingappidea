export const SETTINGS_MENU_VALUES = {
  newUsername: "",
  newAvatar: "",
  submitMethod: () => {},
};

export const SettingsMenuReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };

    case "DELETE_USER":
      return { submitMethod: () => action.payload.submitMethod() };

    case "UPDATE_INFORMATION":
      return {
        ...state,
        submitMethod: (user, newUsername, newAvatar) =>
          action.payload.submitMethod(user, newUsername, newAvatar),
      };
  }
};
