import AuthorizeView from '../components/AuthorizeView';
import Table from '../components/ManageMovies/Table';
import { Footer } from '../components/MoviePage/Footer';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';

const ManageMovies = () => {
  return (
    <>
      <AuthorizeView>
        <NavigationBar />
        <Table />
        <Footer />
      </AuthorizeView>
    </>
  );
};

export default ManageMovies;
