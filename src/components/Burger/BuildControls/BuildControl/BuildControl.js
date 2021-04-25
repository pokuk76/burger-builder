import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl} >
        <div className={classes.Label}> {props.label} </div>
        <button className={classes.More} onClick={props.ingredientAdded}>+</button>
        <button 
            className={classes.Less} 
            onClick={props.ingredientRemoved}
            disabled={props.disabled}
        >-</button>
    </div>
);

export default buildControl;