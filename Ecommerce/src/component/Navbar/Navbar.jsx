import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart.svg'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/dropdown_icon.png'

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dropdown_toggle = (e) => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
        setIsMobileMenuOpen(false);
        if (menuRef.current) {
            menuRef.current.classList.remove('nav-menu-visible');
        }
    }

    return (
        <div className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className='nav-logo'>
                <img src={logo} alt='Belle Ame Logo' className='logo'/>
            </div>
            
            <button 
                className={`nav-dropdown ${isMobileMenuOpen ? 'open' : ''}`} 
                onClick={dropdown_toggle}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <nav ref={menuRef} className='nav-menu'>
                <li onClick={() => handleMenuClick("shop")} className={menu === "shop" ? "active" : ""}>
                    <Link to='/'>Shop</Link>
                    <span className="nav-indicator"></span>
                </li>
                <li onClick={() => handleMenuClick("mens")} className={menu === "mens" ? "active" : ""}>
                    <Link to='/mens'>Men</Link>
                    <span className="nav-indicator"></span>
                </li>
                <li onClick={() => handleMenuClick("womens")} className={menu === "womens" ? "active" : ""}>
                    <Link to='/womens'>Women</Link>
                    <span className="nav-indicator"></span>
                </li>
                <li onClick={() => handleMenuClick("kids")} className={menu === "kids" ? "active" : ""}>
                    <Link to='/kids'>Kids</Link>
                    <span className="nav-indicator"></span>
                </li>
            </nav>
            
            <div className='nav-actions'>
                <Link to='/login' className='login-btn'>
                    <span>Login</span>
                </Link>  
                <Link to='/cart' className='cart-container'>
                    <img src={cart_icon} alt='Shopping cart' className='cart-icon'/>
                    {getTotalCartItems() > 0 && (
                        <span className='cart-badge'>{getTotalCartItems()}</span>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default Navbar