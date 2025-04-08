import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Movies } from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Privacy from './pages/Privacy';
import ManageMovies from './pages/ManageMovies';
import './App.css';
// Import SharedLayout
import SignupPage from './components/SignupPage/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie" element={<MovieDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/manage-movies" element={<ManageMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
