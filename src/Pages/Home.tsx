import React from 'react';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import Paginate from '../components/Paginate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';
import { Status } from '../redux/slices/pizza/types';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const isMount = React.useRef(false);
    const isQueryPars = React.useRef(false);
    const filter = useSelector((state: RootState) => state.filter);

    const totalAdd = useSelector((state: RootState) => state.cart.countList);
    const { items, status } = useSelector((state: RootState) => state.pizzas);

    const activeCategory = filter.category;
    const activeSort = filter.sort;
    const search = filter.search;

    const dispatch = useAppDispatch();

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
            if (sort) {
                dispatch(setFilters({ category: Number(params.activeCategory), sort: sort }));
                setCurrentPage(Number(params.currentPage));
            }
        }
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isQueryPars.current) {
            dispatch(fetchPizzas({ currentPage, limitItemsPerPage }));
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
                {(status == Status.ERROR || status == Status.SUCCSESS) && items.length == 0
                    ? 'Ничего не найдено :('
                    : 'Все пиццы'}
            </h2>
            {status == Status.ERROR ? (
                <p>Произошла ошибка, мы её уже чиним, повторите, пожалуйста попозже</p>
            ) : (
                <div className="content__items">
                    {status == Status.LOADING
                        ? Array(limitItemsPerPage)
                              .fill(0)
                              .map((_, i) => <Placeholder key={i} />)
                        : items.map((el) => {
                              const findItem = totalAdd.find((obj) => obj.id == el.id);
                              const count = findItem ? findItem.count : 0;
                              return <PizzaCard key={el.id} count1={count} {...el} />;
                          })}
                </div>
            )}
            {!search && totalItems != -1 && (
                <Paginate totalPage={totalPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
};

export default Home;
