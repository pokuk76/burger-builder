import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong> {props.price.toFixed(2)} </strong></p>
        { controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                // type={ctrl.type} 
                ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabledControls[ctrl.type]}
            />
        )) }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{ props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER" }</button>
    </div>
);

export default buildControls;