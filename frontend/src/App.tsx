import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Privacy from './pages/Privacy';
import ManageMovies from './pages/ManageMovies';
import './App.css';
import SharedLayout from './components/UniversalLayout/SharedLayout'; // Import SharedLayout

function App() {
  return (
    <Router>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/manage-movies" element={<ManageMovies />} />
        </Routes>
      </SharedLayout>
    </Router>
  );
}

export default App;
