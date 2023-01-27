import { createContext, useState, useEffect} from 'react';


//receive cartItems array and productToAdd
const addCartItem = (cartItems, productToAdd ) =>{
    //check if cartItems contains productToAdd
    //if callback true, it will return the thing 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //don't do mutations , return new array always.
    if (existingCartItem) {
        return cartItems.map ((cartItem)=> 
            cartItem.id===productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity +1 }
            : cartItem 
        );
    }
    return [...cartItems, {...productToAdd, quantity:1 }];

};

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen : () => {},
    cartItems : [],
    addItemToCart: ()=>{},
    cartCount: 0
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen ]= useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //runs whenever the cartItems value changes 
    useEffect(()=> {
        const newCartCount = cartItems.reduce(
            (total, cartItem)=>  total +cartItem.quantity, 
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    
    //receives a product
    const addItemToCart =(productToAdd)=> {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen , addItemToCart , cartItems , cartCount };
    
    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
};

