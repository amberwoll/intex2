import AuthorizeView from '../components/AuthorizeView';
import Table from '../components/ManageMovies/Table';

const ManageMovies = () => {
  return (
    <>
      <AuthorizeView>
        <Table />
      </AuthorizeView>
    </>
  );
};

export default ManageMovies;
