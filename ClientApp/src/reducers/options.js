import {
    OPTIONS_DATA_INTERNAL,
    OPTIONS_SET_GOAL,
    OPTIONS_CLEAR_DATA
} from "../actions/constants";


export function options(
    state = {
        items: [],
        goal:''
    }, action) {
    switch (action.type) {
        case OPTIONS_DATA_INTERNAL:
            return Object.assign({}, state, { items: action.items });
        case OPTIONS_SET_GOAL:
            return Object.assign({}, state, { goal: action.goal });
        case OPTIONS_CLEAR_DATA:
            return Object.assign({}, state, {
                items: [],
                goal: ''
            });
        default:
            return state;
    }
}
