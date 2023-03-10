import './cart-item.styles.scss'

//receives a cartItem PROP when you want to use it. 
const CartItem = ({cartItem}) => {
    //destructure 
    const { name, quantity, imageUrl, price } = cartItem;

    return(
        <div className= "cart-item-container">
            <img src={imageUrl}  alt={`${name}`}/>
            <div className ="item-details"> 
                <span className="name">{name} </span>
                <span className="price"> {quantity} x ${price}</span>
            </div>
        </div>
    )
}
export default CartItem;