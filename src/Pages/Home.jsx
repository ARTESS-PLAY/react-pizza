import React from 'react';

import axios from 'axios';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort from '../components/Sort';
import Paginate from '../components/Paginate';

function Home({ search }) {
    const [activeCategory, setActiveCategory] = React.useState(0);
    const [activeSort, setActiveSort] = React.useState({
        title: 'Популярности ASC',
        sortParam: 'rating',
    });
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //Махинации для пагинации
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalItems, setTotalItems] = React.useState(-1);
    const limitItemsPerPage = 4;
    const totalPage = Math.ceil(totalItems / limitItemsPerPage);
    React.useEffect(() => {
        axios
            .get('http://localhost:3005/config/')
            .then((res) => setTotalItems(res.data.totalItems));
    }, []);

    React.useEffect(() => {
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
        window.scrollTo(0, 0);
    }, [activeCategory, activeSort, search, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categoties activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
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
