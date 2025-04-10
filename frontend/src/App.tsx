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
import AuthorizeView from './components/AuthorizeView';

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
        <Route
          path="/movies"
          element={
            // <AuthorizeView requiredPrivilegeLevel={0}>
            <Movies />
            // </AuthorizeView>
          }
        />
        <Route
          path="/movies/:showId"
          element={
            <AuthorizeView requiredPrivilegeLevel={0}>
              <MovieDetail />
            </AuthorizeView>
          }
        />
        <Route
          path="/privacy"
          element={
            <AuthorizeView requiredPrivilegeLevel={0}>
              <Privacy />
            </AuthorizeView>
          }
        />
        <Route
          path="/manage-movies"
          element={
            <AuthorizeView requiredPrivilegeLevel={1}>
              <ManageMovies />
            </AuthorizeView>
          }
        />
        <Route
          path="/view-movies"
          element={
            <AuthorizeView requiredPrivilegeLevel={0}>
              <ViewAllMovies />
            </AuthorizeView>
          }
        />
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
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
