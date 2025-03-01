import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/favorites.css";


type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Favorites : React.FC= () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = () => {
    const storedFavorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (storedFavorites.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          const filteredProducts = data.filter((product: Product) => storedFavorites.includes(product.id));
          setFavoriteProducts(filteredProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
    } else {
      setFavoriteProducts([]);
    }
  };

  const removeFavorite = (id: number) => {
    const updatedFavorites = favoriteProducts.filter((product) => product.id !== id);
    setFavoriteProducts(updatedFavorites);

    const storedFavorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = storedFavorites.filter((favId) => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="favorites">
      <h2>My Favorite Products ❤️</h2>

      {favoriteProducts.length > 0 ? (
        <div className="favorite-grid">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="favorite-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="favorite-image" />
              </Link>
              <h3>{product.title}</h3>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <button className="remove-btn" onClick={() => removeFavorite(product.id)}>❌ Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-favorites">No favorite products yet. Start adding some! ⭐</p>
      )}
      <Link to='/'>Back to All Products</Link>
    </div>
  );
};

export default Favorites;
