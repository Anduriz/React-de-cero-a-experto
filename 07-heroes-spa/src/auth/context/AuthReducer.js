import { types } from "../types/types";

export const authReducer = ( state = {}, action ) => {
    switch(action.type){
        case types.login:
            return {
                ...state,
                logged: true,
                userName: action.payload
            }

        case types.logout:
            return {
                ...state,
                logged: false,
                userName: null
            }

        default:
            return state;
    }
}