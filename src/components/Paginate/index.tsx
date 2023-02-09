import ReactPaginate from 'react-paginate';
import cl from './Paginate.module.scss';

type PaginateProps = {
    totalPage: number;
    setCurrentPage: any;
};

const Paginate: React.FC<PaginateProps> = ({ totalPage, setCurrentPage }) => {
    return (
        <ReactPaginate
            className={cl.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="<"
            // renderOnZeroPageCount={null}
        />
    );
};

export default Paginate;
