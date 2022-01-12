import { combineReducers } from "redux";
import breedListReducer from "./breedListReducer";

const rootReducer=combineReducers({
    breedList:breedListReducer
});

export default rootReducer;