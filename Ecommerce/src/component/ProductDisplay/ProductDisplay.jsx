import React, { useContext, useState, useRef } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const images = [product.image, product.image, product.image, product.image]; // You can replace with different images

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to cart');
            return;
        }
        
        setIsAddingToCart(true);
        setTimeout(() => {
            addToCart(product.id);
            setIsAddingToCart(false);
        }, 800);
    };

    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setZoomPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const calculateDiscount = () => {
        if (product.old_price && product.new_price) {
            const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100);
            return discount;
        }
        return 0;
    };

    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    {images.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            alt="" 
                            className={selectedImage === index ? 'selected-thumbnail' : ''}
                            onClick={() => setSelectedImage(index)}
                        />
                    ))}
                </div>
                <div className='productdisplay-img'>
                    <div 
                        className='image-zoom-container'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img 
                            ref={imageRef}
                            className={`productdisplay-main-img ${isZoomed ? 'zoomed' : ''}`} 
                            src={images[selectedImage]} 
                            alt=""
                            style={{
                                transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                            }}
                        />
                        <div className='zoom-hint'>
                            🔍 Hover to zoom
                        </div>
                    </div>
                    {calculateDiscount() > 0 && (
                        <div className='discount-badge'>
                            -{calculateDiscount()}%
                        </div>
                    )}
                </div>
            </div>
            <div className='productdisplay-right'>
                <div className='product-header'>
                    <div className='product-title-section'>
                        <h1>{product.name}</h1>
                        <div className='product-badges'>
                            <div className='stock-status in-stock'>
                                <div className='status-indicator'></div>
                                <span>In Stock</span>
                            </div>
                            <div className='product-badge trending'>
                                🔥 Trending
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='productdisplay-right-stars'>
                    <div className='stars-container'>
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_dull_icon} alt="" />
                    </div>
                    <p>(122 reviews)</p>
                </div>
                
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-new'>${product.new_price}</div>
                    {product.old_price && (
                        <div className='productdisplay-right-price-old'>${product.old_price}</div>
                    )}
                </div>
                
                <div className='productdisplay-right-description'>
                    <p className={showFullDescription ? 'expanded' : 'collapsed'}>
                        "Elevate your style with Belle Ame—where comfort meets cool in every tee. Effortlessly trendy, our shirts are designed for those who embrace life with confidence and ease. Made from premium cotton blend for maximum comfort and durability."
                    </p>
                    <button 
                        className='description-toggle'
                        onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                </div>
                
                <div className='productdisplay-right-size'>
                    <h3>Select Size</h3>
                    <div className='productdisplay-right-sizes'>
                        {sizes.map((size) => (
                            <div 
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className='size-guide'>
                        <span>📏 Size Guide</span>
                    </div>
                </div>
                
                <div className='action-buttons'>
                    <button 
                        className={`add-to-cart-btn ${isAddingToCart ? 'adding' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                    >
                        {isAddingToCart ? (
                            <>
                                <span className='spinner'></span>
                                Adding...
                            </>
                        ) : (
                            <>
                                🛒 ADD TO CART
                            </>
                        )}
                    </button>
                    <button className='wishlist-btn'>
                        ♡ Add to Wishlist
                    </button>
                </div>
                
                <div className='product-features'>
                    <div className='feature'>
                        <span className='feature-icon'>🚚</span>
                        <span>Free Shipping over $50</span>
                    </div>
                    <div className='feature'>
                        <span className='feature-icon'>↩️</span>
                        <span>30-day Return Policy</span>
                    </div>
                    <div className='feature'>
                        <span className='feature-icon'>🛡️</span>
                        <span>2-year Warranty</span>
                    </div>
                </div>
                
                <div className='product-details'>
                    <div className='detail-item'>
                        <span className='detail-label'>Category:</span>
                        <span className='detail-value'>Women, T-shirt, Crop Top</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Tags:</span>
                        <span className='detail-value'>
                            <span className='tag'>Modern</span>
                            <span className='tag'>Latest</span>
                            <span className='tag'>Trendy</span>
                        </span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>SKU:</span>
                        <span className='detail-value'>BA{product.id}2024</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay