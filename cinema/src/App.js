import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/homePage';
import Header from './components/header';
import ComingSoon from './pages/comingSoon';

function App() {
  return (
    <div>
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="coming-soon" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
