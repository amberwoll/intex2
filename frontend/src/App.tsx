import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Movies } from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Privacy from './pages/Privacy';
import SignupPage from './components/SignupPage/SignupPage';
import ManageMovies from './pages/ManageMovies';
import ViewAllMovies from './pages/ViewAllMovies';
import MovieModal from './components/Carousel/MovieModal'; // ⬅️ you'll create this if not already
import './App.css';

// Separate inner routing to support modal rendering
function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:showId" element={<MovieDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/manage-movies" element={<ManageMovies />} />
        <Route path="/view-movies" element={<ViewAllMovies />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/movies/:showId" element={<MovieModal />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
