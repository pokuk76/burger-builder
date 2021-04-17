import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    render() {
        return(
            <Aux>
                <div>
                    Graphics for the Burger Built
                </div>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;