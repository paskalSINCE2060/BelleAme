import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../component/Breadcrums/Breadcrum';
import ProductDisplay from '../component/ProductDisplay/ProductDisplay';
import DescriptionBox from '../component/DescriptionBox/DescriptionBox';
import RelatedProduct from '../component/RelatedProduct/RelatedProduct';

const Product = () => {
  const {all_product}= useContext(ShopContext);
  const {productId}= useParams();
  const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>  
      <DescriptionBox/>  
      <RelatedProduct/>
    </div>
  )
}

export default Product
