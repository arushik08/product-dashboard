import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import "../styles/home.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type HomeProps = {
  searchQuery: string; 
};

const Home = ({ searchQuery }: HomeProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });

    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  // Update product list when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleFilter = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  const handleSort = (order: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  const toggleFavorite = (id: number) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="home">
      <FilterBar onFilter={handleFilter} onSort={handleSort} />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="product-image" />
              </Link>
              <h3>{product.title}</h3>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <button
                className={`favorite-btn ${favorites.includes(product.id) ? "active" : ""}`}
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? "❤️" : "🤍"} Favorite
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
