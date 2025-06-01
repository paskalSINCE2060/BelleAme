import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart, decreaseQuantity} = useContext(ShopContext);
    
    // Check if cart is empty
    const isCartEmpty = () => {
        return Object.values(cartItems).every(quantity => quantity === 0);
    };

    // Handle quantity increase
    const handleIncreaseQuantity = (productId) => {
        addToCart(productId);
    };

    // Handle quantity decrease
    const handleDecreaseQuantity = (productId) => {
        if (decreaseQuantity) {
            decreaseQuantity(productId);
        } else {
            // Fallback: remove one item at a time
            const currentQuantity = cartItems[productId];
            if (currentQuantity > 1) {
                // You'll need to implement this in your ShopContext
                // For now, we'll just remove the item completely
                removeFromCart(productId);
            }
        }
    };

    // If cart is empty, show empty cart message
    if (isCartEmpty()) {
        return (
            <div className='cartitems'>
                <div className='empty-cart'>
                    <h2>No Products Selected</h2>
                    <p>Your cart is empty. Add some products to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Size</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if(cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image} alt="" className='cart-icon-product-icon'/>
                                <p>{e.name}</p>
                                <div className='cart-item-size'>
                                    <select 
                                        className='size-selector'
                                        defaultValue="M"
                                        onChange={(event) => {
                                            // You can add size change logic here if needed
                                            console.log(`Size changed to: ${event.target.value}`);
                                        }}
                                    >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>
                                <p>Rs. {e.new_price}</p>
                                <div className='quantity-controls'>
                                    <button 
                                        className='quantity-btn decrease'
                                        onClick={() => handleDecreaseQuantity(e.id)}
                                        disabled={cartItems[e.id] <= 1}
                                    >
                                        -
                                    </button>
                                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                    <button 
                                        className='quantity-btn increase'
                                        onClick={() => handleIncreaseQuantity(e.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>Rs. {e.new_price * cartItems[e.id]}</p>
                                <img 
                                    className='cartitems-remove-icon' 
                                    onClick={() => removeFromCart(e.id)} 
                                    src={remove_icon} 
                                    alt="" 
                                />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>Rs {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>Rs {getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>
                        <a href="/checkout">PROCEED TO CHECKOUT</a></button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promocode, Enter it here!</p>
                    <div className='cartitems-promobox'>
                        <input type="text" placeholder='Promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems