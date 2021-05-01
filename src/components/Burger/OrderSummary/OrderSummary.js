import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={"OrderSummary_" + ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
                </li>
            );
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>Order Summary: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
    
}

export default OrderSummary;