import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import Favorites from "./Components/Favorites";
import Layout from "./Components/Layout";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
