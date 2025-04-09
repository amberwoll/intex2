import AuthorizeView from '../components/AuthorizeView';
import MostViewGrid from '../components/ViewAllMovies/MostViewGrid';

const ViewAllMovies = () => {
  return (
    <AuthorizeView>
      <MostViewGrid />
    </AuthorizeView>
  );
};

export default ViewAllMovies;
