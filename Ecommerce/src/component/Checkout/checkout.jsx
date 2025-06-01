import React, { useState, useContext } from 'react';
import './checkout.css';
import { ShopContext } from '../../Context/ShopContext';

const Checkout = () => {
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        paymentMethod: 'card'
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        
        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        // Phone validation
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
            alert('Order placed successfully! You will receive a confirmation email shortly.');
            setIsProcessing(false);
            // Reset form or redirect to success page
        }, 3000);
    };

    // Get cart items for order summary
    const getCartItems = () => {
        return all_product.filter(product => cartItems[product.id] > 0);
    };

    const getItemCount = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    return (
        <div className="checkout">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Checkout</h1>
                    <div className="checkout-steps">
                        <div className="step active">
                            <span className="step-number">1</span>
                            <span className="step-text">Shipping</span>
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <span className="step-text">Payment</span>
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            <span className="step-text">Review</span>
                        </div>
                    </div>
                </div>

                <div className="checkout-content">
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-section">
                                <h2>📍 Shipping Information</h2>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={errors.firstName ? 'error' : ''}
                                        />
                                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={errors.lastName ? 'error' : ''}
                                        />
                                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={errors.email ? 'error' : ''}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="1234567890"
                                            className={errors.phone ? 'error' : ''}
                                        />
                                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Street Address *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main Street, Apartment 4"
                                        className={errors.address ? 'error' : ''}
                                    />
                                    {errors.address && <span className="error-text">{errors.address}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={errors.city ? 'error' : ''}
                                        />
                                        {errors.city && <span className="error-text">{errors.city}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State *</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={errors.state ? 'error' : ''}
                                        />
                                        {errors.state && <span className="error-text">{errors.state}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zipCode">ZIP Code *</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className={errors.zipCode ? 'error' : ''}
                                        />
                                        {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>💳 Payment Method</h2>
                                <div className="payment-methods">
                                    <div className="payment-option">
                                        <input
                                            type="radio"
                                            id="card"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="card">
                                            <span className="payment-icon">💳</span>
                                            Credit/Debit Card
                                        </label>
                                    </div>
                                    <div className="payment-option">
                                        <input
                                            type="radio"
                                            id="upi"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={formData.paymentMethod === 'upi'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="upi">
                                            <span className="payment-icon">📱</span>
                                            UPI Payment
                                        </label>
                                    </div>
                                    <div className="payment-option">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="cod">
                                            <span className="payment-icon">💵</span>
                                            Cash on Delivery
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary-section">
                        <div className="order-summary">
                            <h2>📦 Order Summary</h2>
                            <div className="order-items">
                                {getCartItems().map((product) => (
                                    <div key={product.id} className="order-item">
                                        <img src={product.image} alt={product.name} className="order-item-image" />
                                        <div className="order-item-details">
                                            <h4>{product.name}</h4>
                                            <p className="order-item-price">Rs. {product.new_price} × {cartItems[product.id]}</p>
                                        </div>
                                        <div className="order-item-total">
                                            Rs. {product.new_price * cartItems[product.id]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="order-totals">
                                <div className="total-line">
                                    <span>Items ({getItemCount()})</span>
                                    <span>Rs. {getTotalCartAmount()}</span>
                                </div>
                                <div className="total-line">
                                    <span>Shipping</span>
                                    <span className="free">Free</span>
                                </div>
                                <div className="total-line">
                                    <span>Tax</span>
                                    <span>Rs. {Math.round(getTotalCartAmount() * 0.18)}</span>
                                </div>
                                <hr />
                                <div className="total-line final-total">
                                    <span>Total</span>
                                    <span>Rs. {getTotalCartAmount() + Math.round(getTotalCartAmount() * 0.18)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                form="checkout-form"
                                className={`place-order-btn ${isProcessing ? 'processing' : ''}`}
                                disabled={isProcessing}
                                onClick={handleSubmit}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="spinner"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        🛒 Place Order
                                    </>
                                )}
                            </button>

                            <div className="security-badges">
                                <div className="badge">🔒 Secure Payment</div>
                                <div className="badge">🚚 Free Shipping</div>
                                <div className="badge">↩️ Easy Returns</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;