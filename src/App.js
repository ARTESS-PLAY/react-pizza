import './App.css';
import Header from './components/Header/Index';
import PizzaCard from './components/PizzaCard';
import Categoties from './components/Categories';
import Sort from './components/Sort';

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
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
            <PizzaCard></PizzaCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
