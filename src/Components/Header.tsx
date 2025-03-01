import { Link } from "react-router-dom";
import "../styles/header.css";
import React, { useState } from "react";
import applogo from "../assets/applogo.webp"; 

type HeaderProps = {
  onSearch: (query: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={applogo} alt="App Logo" className="app-logo" />
        <h1 className="app-name">MyStore</h1>
      </div>

      {/* 🔄 Navigation links moved before search bar */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
    </header>
  );
};

export default Header;
