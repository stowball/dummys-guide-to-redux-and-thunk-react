import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getItems('http://5826ed963900d612000138bd.mockapi.io/items'));
    }

    render() {
        const { hasError, isFetching, items } = this.props;

        return (
            <div>
                { hasError && <p>Sorry! There was an error loading the items</p> }
                { isFetching && <p>Loading…</p> }
                { items &&
                    <ul>
                        {items.map((item, i) => (
                            <li key={i}>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
    items: state.items,
    hasError: state.hasError,
    isFetching: state.isFetching
}))(ItemList);
