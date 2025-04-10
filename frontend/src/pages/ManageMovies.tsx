import AuthorizeView from '../components/AuthorizeView';
import Table from '../components/ManageMovies/Table';
import { Footer } from '../components/MoviePage/Footer';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';

const ManageMovies = () => {
  return (
    <>
      <AuthorizeView requiredPrivilegeLevel={1}>
        <NavigationBar />
        <Table />
        <Footer />
      </AuthorizeView>
    </>
  );
};

export default ManageMovies;
