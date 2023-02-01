import ReactPaginate from 'react-paginate';
import cl from './Paginate.module.scss';

function Paginate({ totalPage, setCurrentPage }) {
    return (
        <ReactPaginate
            className={cl.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}

export default Paginate;
