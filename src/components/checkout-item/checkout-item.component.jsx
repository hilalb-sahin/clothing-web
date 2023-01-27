import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckOutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    const {clearItemFromCart} = useContext(CartContext);

    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    }
    return(
        <div className="checkout-item-container"> 
            <div className="image-container">
                <img src = {imageUrl} />
            </div>
            <span className ="name">{name} </span>
            <span className ="quantity"> {quantity} </span>
            <span className ="price">{price} </span>
            <div onClick = {clearItemHandler} className= "remove-button"> &#10005; </div>
        </div>
    )

}

export default CheckOutItem;