import Table from '../components/ManageMovies/Table';
import { Footer } from '../components/MoviePage/Footer';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';

const ManageMovies = () => {
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <Table />
      <Footer />
    </>
  );
};

export default ManageMovies;
