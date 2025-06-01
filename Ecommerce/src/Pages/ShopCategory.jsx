import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../component/Assets/dropdown_icon.png'
import Item from '../component/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  const [sortBy, setSortBy] = useState('default')
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Filter products by category
  const filteredProducts = all_product.filter(item => props.category === item.category)
  
  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.new_price - b.new_price
      case 'price-high':
        return b.new_price - a.new_price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleSortChange = (value) => {
    setSortBy(value)
    setShowDropdown(false)
  }
  
  return (
    <div className='shop-category'>
      {/* Hero Banner Section */}
      <div className='shopcategory-banner-container'>
        <img 
          className='shopcategory-banner' 
          src={props.banner} 
          alt={`${props.category} collection banner`}
        />
      </div>
      
      {/* Filter and Sort Section */}
      <div className='shopcategory-controls'>
        <div className='shopcategory-indexSort'>
          <div className='product-count'>
            <span className='count-highlight'>Showing 1-{Math.min(12, sortedProducts.length)}</span>
            <span className='count-total'>of {sortedProducts.length} products</span>
          </div>
          
          <div className='shopcategory-sort' onClick={() => setShowDropdown(!showDropdown)}>
            <span>Sort by: {sortBy === 'default' ? 'Default' : 
                           sortBy === 'price-low' ? 'Price: Low to High' :
                           sortBy === 'price-high' ? 'Price: High to Low' : 'Name'}</span>
            <img 
              src={dropdown_icon} 
              alt="Sort options"
              className={`dropdown-icon ${showDropdown ? 'rotated' : ''}`}
            />
            
            {showDropdown && (
              <div className='sort-dropdown'>
                <div className='sort-option' onClick={() => handleSortChange('default')}>
                  Default
                </div>
                <div className='sort-option' onClick={() => handleSortChange('price-low')}>
                  Price: Low to High
                </div>
                <div className='sort-option' onClick={() => handleSortChange('price-high')}>
                  Price: High to Low
                </div>
                <div className='sort-option' onClick={() => handleSortChange('name')}>
                  Name A-Z
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className='shopcategory-products'>
        {sortedProducts.slice(0, 12).map((item) => (
          <div key={item.id} className='product-card'>
            <Item 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          </div>
        ))}
      </div>
      
      {/* Load More Section */}
      {sortedProducts.length > 12 && (
        <div className='shopcategory-loadmore'>
          <button type="button" className='loadmore-btn'>
            <span>Explore More</span>
            <div className='btn-shimmer'></div>
          </button>
          <p className='load-more-text'>Discover {sortedProducts.length - 12} more amazing products</p>
        </div>
      )}
    </div>
  )
}

export default ShopCategory