import React from 'react';

import axios from 'axios';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters } from '../redux/slices/filterSlice';

function Home() {
    // console.log('render');
    const isMount = React.useRef(false);
    const isQueryPars = React.useRef(false);
    const filter = useSelector((state) => state.filter);

    const activeCategory = filter.category;
    const activeSort = filter.sort;
    const search = filter.search;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPizzaz = () => {
        setIsLoading(true);
        //формируем шаблон для запроса
        let getArgs = `?${activeCategory ? 'category=' + activeCategory + '&' : ''}`;
        const order = activeSort.sortParam.includes('-') ? 'desc' : 'asc';
        const sort = activeSort.sortParam.replace('-', '');
        const page = search ? '' : `&_page=${currentPage}&_limit=${limitItemsPerPage}`;
        getArgs += `_sort=${sort}&_order=${order}&name_like=${search}${page}`;
        axios
            .get(`http://localhost:3005/items/${getArgs}`)
            .then((res) => setItems(res.data))
            .finally(() => setIsLoading(false));
    };

    //Махинации для пагинации
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalItems, setTotalItems] = React.useState(10);
    const limitItemsPerPage = 4;
    const totalPage = Math.ceil(totalItems / limitItemsPerPage);
    // React.useEffect(() => {
    //     axios
    //         .get('http://localhost:3005/config/')
    //         .then((res) => setTotalItems(res.data.totalItems));
    // }, []);

    //для рендера по гет параметрам
    React.useEffect(() => {
        if (window.location.search) {
            isQueryPars.current = true;
            const params = qs.parse(window.location.search.substring(1));
            const sort = sorts.find((obj) => obj.sortParam == params.activeSort);
            dispatch(setFilters({ category: Number(params.activeCategory), sort: sort }));
            setCurrentPage(params.currentPage);
        }
        console.log(isQueryPars.current);
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isQueryPars.current) {
            fetchPizzaz();
        }
        isQueryPars.current = false;
    }, [activeCategory, activeSort, search, currentPage]);

    React.useEffect(() => {
        console.log(isMount.current, isQueryPars.current);
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
                {!isLoading && items.length == 0 ? 'Ничего не найдено :(' : 'Все пиццы'}
            </h2>
            <div className="content__items">
                {isLoading
                    ? Array(limitItemsPerPage)
                          .fill(0)
                          .map((_, i) => <Placeholder key={i} />)
                    : items.map((el) => <PizzaCard key={el.id} {...el} />)}
            </div>
            {!search && totalItems != -1 && (
                <Paginate totalPage={totalPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
}

export default Home;
