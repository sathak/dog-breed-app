import { ActionTypes } from "../constants/action-types";

const initialState = {
    breeds:[]
};

const breedListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_LIST_OF_BREEDS:
            return {...state,breeds:payload};
            break;
        default:
            return state;
            break;
    }

};

export default breedListReducer;