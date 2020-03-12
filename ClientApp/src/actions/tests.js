import { TestManager } from '../serviceManager/servicesProvider';
import * as Constants from './constants';


    export function testsIsLoaded(bool) {
        return {
            type: Constants.TESTS_IS_LOADED,
            isLoaded: bool
        };
    }
    export function testsHasErrored(bool) {
        return {
            type: Constants.TESTS_HAS_ERRORED,
            hasErrored: bool
        };
    }
    export function testsIsLoading(bool) {
        return {
            type: Constants.TESTS_IS_LOADING,
            isLoading: bool
        };
    }
    export function testsIsSaving(bool) {
        return {
            type: Constants.TESTS_IS_SAVING,
            isSaving: bool
        }
    }
    export function testsFetchDataSuccess(items) {
        return {
            type: Constants.TESTS_FETCH_DATA_SUCCESS,
            items
        };
    }

    //internal client data
export function testToEdit(internalEditTest) {
    return {
        type: Constants.TESTS_ADD_TO_EDIT, 
        internalEditTest
    }
}
    export function testCurrentIndex(index) {
    return {
        type: Constants.TESTS_CURRENT_INDEX,
        currentIndex: index
    }
}
    export function testCurrentIndexQuestion(index) {
        return {
            type: Constants.TESTS_CURRENT_INDEX_QUESTION,
            currentIndexQuestion: index
        }
    }

    export function testsDataInternal(internalEditTest) {
        return {
            type: Constants.TESTS_DATA_INTERNAL,
            internalEditTest
        }
    }
    export function testsInternalHasErrored(bool) {
        return {
            type: Constants.TESTS_HAS_ERRORED,
            isErrored: bool
        }
    }
    export function testsInternalClearData() {
        return {
            type: Constants.TESTS_CLEAR_DATA_INTERNAL
        }
    }

    //action creators
    export function testsFetchData() {
        return (dispatch, getState) => {
           
            dispatch(testsIsLoading(true));
            TestManager.fetchAll()
                .then((response) => {
                    if (!Array.isArray(response)) {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                    }
                    dispatch(testsIsLoading(false));
                    if (response.length > 0) {
                        dispatch(testsIsLoaded(true));
                    }
                    return response;
                })
                .then((items) => {
                    dispatch(testsFetchDataSuccess(items))
                    console.log(items)
                })
                .catch(() => dispatch(testsHasErrored(true)));
        };
    }
    export function testDelete(id) {
        return (dispatch) => {

            dispatch(testsIsSaving(true));

            TestManager.delete(id).then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                dispatch(testsIsSaving(false));
                return response;
            }).then((items) => {
                let newState = { ...items };
                newState.items = newState.items.filter(el => el.id != id);
                dispatch(testsFetchDataSuccess(newState))
            })
        }
    }
    export function testCreate(test) {
        return (dispatch) => {

            dispatch(testsIsSaving(true));

            TestManager.create(test).then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                dispatch(testsIsSaving(false));
                testsFetchData();
            })
        }
    }
    export function testUpdate(test) {
        return (dispatch, getState) => {
            dispatch(testsIsSaving(true));
            TestManager.update(test).then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const state = getState();
                dispatch(testsIsSaving(false));
                dispatch(testsFetchDataSuccess(state.tests));
            })

        }
    }

    // action creators before posting on server
    export function testsToEdit(index) {
        return (dispatch, getState) => {
            const state = getState();
            let from = state.tests.items[index],
                internalEditTest = state.tests.internalEditTest
            if (state.tests.internalEditTest.isInCreation !== true) {
                internalEditTest.isInCreation = true
            }
            internalEditTest.items.push(from);
            internalEditTest.currentIndex = index
            dispatch(testToEdit(internalEditTest));
        }
    }
    export function testsCurrentIndex(index) {
        return (dispatch, getState) => {
            let state = getState();
            state.tests.internalEditTest.currentIndex = index;
            dispatch(testCurrentIndex(state.tests.internalEditTest));
        }
    }
    export function testsCurrentIndexQuestion(index) {
        return (dispatch, getState) => {
            let state = getState();
            state.tests.internalEditTest.currentIndexQuestion = index;
            dispatch(testCurrentIndexQuestion(state.tests.internalEditTest));
        }
    }

    export function testInternalCreate(test) {
        return (dispatch, getState) => {
            let state = getState();
            state.tests.internalEditTest.items.push(test);
            state.tests.internalEditTest.isInCreation = true;
            dispatch(testsDataInternal(state.tests.internalEditTest));
        }
    }
    export function testInternalUpdate(test, indexTest) {
        return (dispatch, getState) => {
            let state = getState();
           
            if (state.tests.internalEditTest.items &&
                state.tests.internalEditTest.items.length >= indexTest) {
                state.tests.internalEditTest.items[indexTest] = test;
                state.tests.internalEditTest.isInCreation = true;
                dispatch(testsDataInternal(state.tests.internalEditTest));
            } else {
                state.tests.internalEditTest.hasErrored = true
                dispatch(testsInternalHasErrored(state.tests.internalEditTest));
            }
        }
    }
    export function testInternalDelete(indexTest) {
        return (dispatch, getState) => {
            let state = getState();
            state.tests.internaEditTest.items.questions.splice(indexTest, 1);
            dispatch(testsDataInternal(state.tests.internalEditTest));
        }
    }
    export function testsClearData() {
        return (dispatch, getState) => {
           const state = getState();
           let res = Object.assign(state, {
                internalEditTest: {
                    currentIndex: '',
                    isInCreation: false,
                    hasErrored: false,
                    items: []
                } })
            dispatch(testsDataInternal(res.tests.internalEditTest));
        }
    }
