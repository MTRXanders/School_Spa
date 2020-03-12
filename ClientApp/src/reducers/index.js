import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { tests } from './tests';
import { questions } from './questions';
import { options } from './options';


export default combineReducers({
    tests,
    options
  
});