import React from 'react';

import classes from '../../assets/stylesheets/order.module.css';

const order = props => {
    return (
        <div className={classes.Order}>
            <p>
                Ingredients:
                {Object.keys(props.ingredients).map(key => {
                    return (
                        <span key={key}>
                            {key}: ({props.ingredients[key]})
                        </span>
                    );
                })}
            </p>

            <p>
                Price: <strong>${props.price} USD</strong>
            </p>
        </div>
    );
};

export default order;
