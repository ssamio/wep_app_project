import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ currentPage, totalPages, onChangePage }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onChangePage(page)}
    />
  );
};

export default PaginationComponent;
