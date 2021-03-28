import React from 'react';

import classes from './BurgerIngredient.module.css'

const burgerIngredient = (props) => {
    let ingredient = null;

    /* TODO: Change this from a switch statement to just having 
        the props.type being the key from the classes
        Note: might still need a switch to check for bread-top 
        b/c the format is a bit different
    */
    switch(props.type) {
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

export default burgerIngredient;