import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";


type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductCard = ({ id, title, price, image }: ProductProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      favorites = favorites.filter((favId: number) => favId !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card"  onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>₹{price}</p>
      <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default ProductCard;
