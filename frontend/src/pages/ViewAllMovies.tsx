import AuthorizeView from '../components/AuthorizeView';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';
import MostViewGrid from '../components/ViewAllMovies/MostViewGrid';

const ViewAllMovies = () => {
  return (
    <AuthorizeView>
      <NavigationBar />
      <br></br>
      <br></br>
      <MostViewGrid />
    </AuthorizeView>
  );
};

export default ViewAllMovies;
