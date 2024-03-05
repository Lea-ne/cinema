import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/homePage';
import Header from './components/header';
import ComingSoon from './pages/comingSoon';
import MovieDetail from "./pages/filmDetails";
import Realisateur from "./pages/realisateur";
import Actor from "./pages/actor";

function App() {
  return (
    <div>
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="coming-soon" element={<ComingSoon />} />
        <Route path=":categorie/:id" element={<MovieDetail />} />
        <Route path="realisateur/:name" element={<Realisateur />} />
        <Route path="actor/:name" element={<Actor />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
