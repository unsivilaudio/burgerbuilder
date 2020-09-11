import React from 'react';

import classes from '../../assets/stylesheets/burger.module.css';
import BurgerIngredient from './BurgerIngredient';

const burger = props => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />;
            });
        })
        .reduce((acc, val) => {
            return acc.concat(val);
        }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
