import {
    GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE
} from './actionTypes';

function getItemsRequest() {
    return {
        type: GET_ITEMS_REQUEST
    };
}

function getItemsSuccess(result) {
    return {
        type: GET_ITEMS_SUCCESS,
        result
    };
}

function getItemsFailure() {
    return {
        type: GET_ITEMS_FAILURE
    };
}

export function getItems(url) {
    return (dispatch) => {
        dispatch(getItemsRequest());

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getItemsSuccess(items)))
            .catch(response => dispatch(getItemsFailure()));
    };
}
