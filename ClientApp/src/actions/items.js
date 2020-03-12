import { servicesProvider } from '../serviceManager/servicesProvider';
import * as Constants from './constants';


export function boolGenerator(bool, type) {
    let arr = type.split('_');
    let partial = arr[arr.length - 2].toLowerCase();
    let name = arr[arr.length - 1].map((item, index) => {
        if (index > 0) { return item.toLowerCase(); }
        else { return item }
    });
    name = partial.concat(name);

    return {
        type,
        [name]: bool
    }
}

export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}
export function itemsFetchData(meth) {
    return (dispatch) => {
        dispatch(boolGenerator(true, Constants[itemsName + 'IsLoading']));

        servicesProvider[meth].fetchAll()
            .then((response) => {
                if (!Array.isArray(response)) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                }
                dispatch(boolGenerator(false, Constants[itemsName+'IsLoding']));
                return response;
            })
            .then((items) => {
                dispatch(itemsFetchDataSuccess(items))
                console.log(items)
            })
            .catch(() => dispatch(itemsHasErrored(true, Constants[itemsName + 'HasErrored'])));
    };
}
