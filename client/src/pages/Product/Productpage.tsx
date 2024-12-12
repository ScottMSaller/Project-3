import React from 'react';
import './productpage.css';

interface Product {
  imageUrl: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<Product> = ({
  imageUrl,
  name,
  price,
  originalPrice,
  rating,
  onAddToCart,
}) => {
  return (
    <div className="product">
      {originalPrice && <div className="sale">Sale</div>}
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <div className="price">
        {originalPrice && <del>${originalPrice.toFixed(2)}</del>}
        ${price.toFixed(2)}
      </div>
      {/* Add your star rating logic here */}
      <button className="add-to-cart" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const products: Product[] = [
    {
      imageUrl: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=800', // Replace with actual image URL
      name: 'Fancy Product',
      price: 40.00,
      originalPrice: 80.00,
      rating: 4.5,
      onAddToCart: () => {
        /* Handle add to cart for this product */
      },
    },
    {
        imageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: '', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: '  ', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: 'https://via.placeholder.com/450x300', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: 'https://via.placeholder.com/450x300', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
      {
        imageUrl: 'https://via.placeholder.com/450x300', // Replace with actual image URL
        name: 'Fancy Product',
        price: 40.00,
        originalPrice: 80.00,
        rating: 4.5,
        onAddToCart: () => {
          /* Handle add to cart for this product */
        },
      },
    // ... more products
  ];

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductPage;