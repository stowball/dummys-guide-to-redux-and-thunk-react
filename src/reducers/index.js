import { combineReducers } from 'redux';
import { hasError, isFetching, items } from './items';

export default combineReducers({
    items,
    hasError,
    isFetching
});
