import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import PropTypes from 'prop-types';

const ItemList = (props) => {
    useEffect(() => {
        props.fetchData('http://599167402df2f40011e4929a.mockapi.io/items');
    }, []);

    if (props.hasErrored) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (props.isLoading) {
        return <p>Loading…</p>;
    }

    return (
        <ul>
          {props.items.map((item) => (
              <li key={item.id}>
                {item.label}
              </li>
          ))}
        </ul>
    );
};

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
