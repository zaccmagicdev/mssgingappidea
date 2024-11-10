export const SETTINGS_MENU_VALUES = {
    newUsername: "",
    newPassword: "",
    newEmail: ""
};


export const SettingsMenuReducer = (state, action) => {
    switch(action.type){

        case "CHANGE_INPUT":
            return { ...state, [action.payload.name]: action.payload.value };

        case 'LOGOUT':
            return {...state, }

            
    }
}