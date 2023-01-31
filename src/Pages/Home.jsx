import React from 'react';

import axios from 'axios';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort from '../components/Sort';

function Home() {
    const [activeCategory, setActiveCategory] = React.useState(0);
    const [activeSort, setActiveSort] = React.useState({
        title: 'Популярности ASC',
        sortParam: 'rating',
    });
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        //формируем шаблон для запроса
        let getArgs = `?${activeCategory ? 'category=' + activeCategory + '&' : ''}`;
        const order = activeSort.sortParam.includes('-') ? 'desc' : 'asc';
        const sort = activeSort.sortParam.replace('-', '');
        getArgs += `_sort=${sort}&_order=${order}`;
        axios
            .get(`http://localhost:3005/items/${getArgs}`)
            .then((res) => setItems(res.data))
            .finally(() => setIsLoading(false));
        window.scrollTo(0, 0);
    }, [activeCategory, activeSort]);

    return (
        <div className="container">
            <div className="content__top">
                <Categoties activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? Array(10)
                          .fill(0)
                          .map((_, i) => <Placeholder key={i} />)
                    : items.map((el) => <PizzaCard key={el.id} {...el} />)}
            </div>
        </div>
    );
}

export default Home;
