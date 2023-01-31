import React from 'react';

import axios from 'axios';

import PizzaCard from '../components/PizzaCard';
import Placeholder from '../components/PizzaCard/Placeholder';
import Categoties from '../components/Categories';
import Sort from '../components/Sort';

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios
            .get('http://localhost:3005/items/')
            .then((res) => setItems(res.data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categoties></Categoties>
                <Sort></Sort>
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
