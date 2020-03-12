import {
    QUESTIONS_INTERNAL_HAS_ERRORED,
    QUESTIONS_IS_IN_CREATION,
    QUESTIONS_DATA_INTERNAL,
    QUESTIONS_CLEAR_DATA
} from "../actions/constants";


export function  questions(
    state = {
            isInCreation: false,
            hasErrored: false,
            items: []
    }, action) {
    switch (action.type) {
        case QUESTIONS_IS_IN_CREATION:
            return Object.asign({}, state, { isInCreation: action.isInCreation });
        case QUESTIONS_DATA_INTERNAL:
            return Object.assign({}, state, { items: action.items });
        case QUESTIONS_INTERNAL_HAS_ERRORED:
            return Object.assign({}, state, { hasErrored: action.hasErrored });
        case QUESTIONS_CLEAR_DATA:
            return Object.assign({}, state, {
                isInCreation: false,
                hasErrored: false,
                items: []
            });
        default:
            return state;
    }
}
