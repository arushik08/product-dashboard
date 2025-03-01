import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/productDetails.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="loading">Loading product details...</p>;
  }

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="details">
        <h2>{product.title}</h2>
        <p className="category">Category:{product.category}</p>
        <p className="price">Price: ₹{product.price.toFixed(2)}</p>
        <p className="description">Description: {product.description}</p>
        <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={handleFavoriteToggle}>
          {isFavorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
        </button>
      </div>
      <div className="backHome">
        <Link to="/">Back To All Products</Link>
      </div>
    </div>
  );
};

export default ProductDetails;
