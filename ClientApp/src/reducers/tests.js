import {
    TESTS_IS_SAVING,
    TESTS_IS_LOADED,
    TESTS_HAS_ERRORED,
    TESTS_IS_LOADING,
    TESTS_FETCH_DATA_SUCCESS,
    TESTS_ADD_TO_EDIT,
    TESTS_CURRENT_INDEX,
    TESTS_CURRENT_INDEX_QUESTION,
    TESTS_INTERNAL_HAS_ERRORED,
    TESTS_IS_IN_CREATION,
    TESTS_DATA_INTERNAL,
    TESTS_CLEAR_DATA_INTERNAL
   
} from "../actions/constants";


export function tests( 
    state = {
        isLoaded: false,
        isLoading: false,
        isSaving: false,
        hasErrored: false,
        items: [],
        internalEditTest: {
            currentIndex: '',
            currentIndexQuestion:'',
            isInCreation: false,
            hasErrored :false,
            items:[]
        },
    }, action) {
    let newState = state;
    switch (action.type) {
        case TESTS_IS_SAVING:
            return Object.assign(state, { isSaving: action.isSaving})
        case TESTS_IS_LOADED:
             return Object.assign(state, { isLoaded: action.isLoaded });
        case TESTS_HAS_ERRORED:
             return Object.assign(state, { hasErrored: action.hasErrored })
        case TESTS_IS_LOADING:
           return  Object.assign(state, { isLoading: action.isLoading })
        case TESTS_FETCH_DATA_SUCCESS:
            return Object.assign({}, state, { items: action.items });
        case TESTS_ADD_TO_EDIT:
           return Object.assign({}, state, { internalEditTest: action.internalEditTest })
        case TESTS_DATA_INTERNAL:
            return Object.assign({}, state, { internalEditTest: action.internalEditTest })
        case TESTS_CLEAR_DATA_INTERNAL:
            newState.internalEditTest =
             {
                currentIndex: '',
                isInCreation: false,
                hasErrored: false,
                items: []
             }
            return newState;
        default:
            return state;
    }
}

