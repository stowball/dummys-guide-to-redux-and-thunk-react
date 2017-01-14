import {
    GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE
} from '../actions/actionTypes';

export const hasError = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case GET_ITEMS_FAILURE:
            return true;

        case GET_ITEMS_REQUEST:
            return false;

        case GET_ITEMS_SUCCESS:
            return false;

        default:
            return state;
    }
};

export const isFetching = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case GET_ITEMS_REQUEST:
            return true;

        case GET_ITEMS_FAILURE:
            return false;

        case GET_ITEMS_SUCCESS:
            return false;

        default:
            return state;
    }
};

export const items = (state = [], action) => {
    const { type, result } = action;

    switch (type) {
        case GET_ITEMS_SUCCESS:
            return result;

        default:
            return state;
    }
};
