import AuthorizeView from '../components/AuthorizeView';
import MovieDetails from '../components/MovieDetailsPage/MovieDetails';

const MovieDetail = () => (
  <>
    <AuthorizeView requiredPrivilegeLevel={0}>
      <MovieDetails />
    </AuthorizeView>
  </>
);

export default MovieDetail;
