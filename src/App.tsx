import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import {MainPage} from './pages/main-page';
import { RecipeDetail } from './pages/recipe-detail';
function App() {
  return (
    <div className="page">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />      
          <Route path="/recipes/:id" element={<RecipeDetail />} />    
        </Routes>
      </Router>


    </div>
  )
}

export default App
