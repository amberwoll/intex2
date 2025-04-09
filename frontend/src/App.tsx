import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Movies } from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Privacy from './pages/Privacy';
import SignupPage from './components/SignupPage/SignupPage';
import ManageMovies from './pages/ManageMovies';
import ViewAllMovies from './pages/ViewAllMovies';
import './App.css';

// Import SharedLayout

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:showId" element={<MovieDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/manage-movies" element={<ManageMovies />} />
        <Route path="/view-movies" element={<ViewAllMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
