import Header from './components/Header/Index';
import PizzaCard from './components/PizzaCard';
import Categoties from './components/Categories';
import Sort from './components/Sort';

import pizzas from './assets/pizza.json';

function App() {
    return (
        <div className="wrapper">
            <Header></Header>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categoties></Categoties>
                        <Sort></Sort>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map((el) => (
                            <PizzaCard key={el.id} {...el} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
