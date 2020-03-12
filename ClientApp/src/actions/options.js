import * as Constants from './constants';

//internal client data

export function optionsDataInternal(items) {
    return {
        type: Constants.OPTIONS_DATA_INTERNAL,
        items
    }
}
export function optionsSetGoal(goal) {
    return {
        type: Constants.OPTIONS_SET_GOAL,
        goal
    }
}
export function optionsClearData() {
    return {type: Constants.OPTIONS_CLEAR_DATA}
}

// action creators before posting on server
export function optionInternalCreate(option) {
    return (dispatch, getState) => {
        const state = getState();
        let arr = state.options.items;
        arr.push(option);
        dispatch(optionsDataInternal(arr));
    }
}
export function optionInternalUpdate(option, index) {
    return (dispatch, getState) => {
        const state = getState();
        let items = state.options.items;
            items[index] = option;
            dispatch(optionsDataInternal(items));
    }
}
export function optionInternalDelete(index) {
    return (dispatch, getState) => {
        const state = getState();
        let items = state.options.items;
        items.splice(index, 1);
        dispatch(optionsDataInternal(items));
    }
}
export function optionSetGaol(goal) {
    return (dispatch) => {
        dispatch(optionsSetGoal(goal));
    }
}
export function optionClearData() {
    return (dispatch) => {
        dispatch(optionsClearData());
    }
}
