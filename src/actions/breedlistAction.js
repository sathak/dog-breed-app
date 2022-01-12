import {ActionTypes} from '../constants/action-types';
export const getListofBreeds=(breeds)=>{
    return{
        type:ActionTypes.GET_LIST_OF_BREEDS,
        payload:breeds
    }
};