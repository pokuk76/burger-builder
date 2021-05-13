import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
    }
    
    componentDidMount() {
        this.props.onInitIngredients();
    }

    
    purchaseHandler = () => {
        /**
         * Need to use an arrow function because this function is being triggered through an event handler (in BuildControls component) 
         * The "this" keyword no longer applies to this class component 
         * Alternatively, I would have binded this method in the class constructor 
         **/
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        /* In a production app, you should re-calculate price on the backend 
            -> So it's really not a big deal if there price we send has weird floating point rounding
        */
        /* const price = parseFloat(this.state.totalPrice.toFixed(2)); */
        this.props.onInitPurchase();
        this.props.history.push( "/checkout");
    }

    updatePurchaseState (currentIngredients) {
        // const ingredients = {...this.state.ingredients};
        const sum = Object.keys(currentIngredients)
            .map(ingredientKey => {
                return currentIngredients[ingredientKey]
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients   //ingredients handled from redux mapStateToProps
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients cannot be loaded right now T__T</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledControls={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated} 
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}
            />;
        }

        return(
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    { orderSummary }
                </Modal>
                { burger }
            </Auxiliary>
        );
    }
}

/* https://github.com/MartaNiemiec/Burger-builder/blob/master/src/components/Burger/BuildControls/BuildControl/BuildControl.css */

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error, 
        isAuthenticated: state.auth.token !== null, 
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch( actions.purchaseInit() )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );