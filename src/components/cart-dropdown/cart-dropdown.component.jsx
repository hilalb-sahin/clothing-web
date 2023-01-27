import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';
import { CartContext} from '../../context/cart.context';

import { useNavigate } from 'react-router-dom'; //get navigate function

//use CartItem component and pass item to it as prop
const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('./checkout'); //goes to checkout route 
    }
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items"> 
                {cartItems.map(item=> <CartItem key = {item.id} cartItem = {item} />)}
            </div>
            <Button onClick = {goToCheckoutHandler}> Go checkout </Button>
        </div>
    )
}

export default CartDropdown;