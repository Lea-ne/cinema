import React from "react";
import SearchBar from "../search";
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
      <div>
        <h1>logo hihi</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="coming-soon">Coming Soon</Link></li>
            <li>mon profil</li>
        </ul>
        <SearchBar></SearchBar>
      </div>
    );
  }