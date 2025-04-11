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
import MovieModal from './components/Carousel/MovieModal';
import './App.css';
import { UserProvider } from './components/UserContext';
import AuthorizeView from './components/AuthorizeView';

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
    <div className="app-root">
      <Router>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </Router>

      <style>{`
        /* GLOBAL STYLES */
        * {
          box-sizing: border-box;
        }

        *::before,
        *::after {
          box-sizing: inherit;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          font-family: 'Lato', sans-serif;
          background-color: #0a0a0a;
        }

        .app-root {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 16px;
        }
      `}</style>
    </div>
  );
}

export default App;
