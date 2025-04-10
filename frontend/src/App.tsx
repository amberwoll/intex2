import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import { UserProvider } from './components/UserContext';

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
        <Route path="*" element={<Navigate to="/login" replace />} />
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
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;
