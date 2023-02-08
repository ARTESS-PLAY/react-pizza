import React from 'react';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

function Home() {
    const isMount = React.useRef(false);
    const isQueryPars = React.useRef(false);
    const filter = useSelector((state) => state.filter);

    const totalAdd = useSelector((state) => state.cart.countList);
    const { items, status } = useSelector((state) => state.pizzas);

    const activeCategory = filter.category;
    const activeSort = filter.sort;
    const search = filter.search;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //Махинации для пагинации
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalItems, setTotalItems] = React.useState(10);
    const limitItemsPerPage = 4;
    const totalPage = Math.ceil(totalItems / limitItemsPerPage);

    //для рендера по гет параметрам
    React.useEffect(() => {
        if (window.location.search) {
            isQueryPars.current = true;
            const params = qs.parse(window.location.search.substring(1));
            const sort = sorts.find((obj) => obj.sortParam == params.activeSort);
            dispatch(setFilters({ category: Number(params.activeCategory), sort: sort }));
            setCurrentPage(params.currentPage);
        }
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isQueryPars.current) {
            dispatch(
                fetchPizzas({ activeCategory, activeSort, search, currentPage, limitItemsPerPage }),
            );
        }
        isQueryPars.current = false;
    }, [activeCategory, activeSort, search, currentPage]);

    React.useEffect(() => {
        if (isMount.current && !isQueryPars.current) {
            const queryString = qs.stringify({
                activeSort: activeSort.sortParam,
                activeCategory: activeCategory,
                currentPage: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMount.current = true;
    }, [activeCategory, activeSort, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categoties />
                <Sort />
            </div>
            <h2 className="content__title">
                {(status == 'error' || status == 'success') && items.length == 0
                    ? 'Ничего не найдено :('
                    : 'Все пиццы'}
            </h2>
            {status == 'error' ? (
                <p>Произошла ошибка, мы её уже чиним, повторите, пожалуйста попозже</p>
            ) : (
                <div className="content__items">
                    {status == 'loading'
                        ? Array(limitItemsPerPage)
                              .fill(0)
                              .map((_, i) => <Placeholder key={i} />)
                        : items.map((el) => {
                              const findItem = totalAdd.find((obj) => obj.id == el.id);
                              const count = findItem ? findItem.count : 0;
                              return <PizzaCard key={el.id} count={count} {...el} />;
                          })}
                </div>
            )}
            {!search && totalItems != -1 && (
                <Paginate totalPage={totalPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
}

export default Home;
