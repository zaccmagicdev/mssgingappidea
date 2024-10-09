export const INITIAL_FORM_STATE= {
    username: "",
    password: "",
    submitMethod: () => {}
};

export const LoginLandingPageReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_INPUT":
            return {...state,
                [action.payload.name]: action.payload.value
            };
    
        default: return state;
    }
}

