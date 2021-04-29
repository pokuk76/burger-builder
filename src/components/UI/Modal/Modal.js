import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => (
    <Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0', 
                display: props.show ? 'block' : 'none'
                /* Display takes care of a strange issue were there was a ghost clickable element on mobile */
            }}
        >
            {props.children}
        </div>
    </Auxiliary>
);

export default modal;