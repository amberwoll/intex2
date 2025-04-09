import AuthorizeView from '../components/AuthorizeView';
import MovieDetails from '../components/MovieDetailsPage/MovieDetails';

const MovieDetail = () => (
  <>
    <AuthorizeView>
      <MovieDetails />
    </AuthorizeView>
  </>
);

export default MovieDetail;
