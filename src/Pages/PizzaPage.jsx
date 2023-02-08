import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

function PizzaPage() {
    const [pizzaData, setPizzaData] = React.useState(false);
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            const { data } = await axios.get('http://localhost:3005/items/' + id);
            setPizzaData(data);
        }
        fetchPizza();
    }, []);

    if (!pizzaData) {
        return <h2>Загружаю...</h2>;
    }

    return (
        <div className="container">
            <h2>{pizzaData.name}</h2>
            <img src={pizzaData.imageUrl} alt="pizza" />
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia debitis maiores
                fuga in deserunt perspiciatis, obcaecati dolore saepe nisi fugit sit deleniti natus
                numquam, tempore ratione corporis ipsa! Iure, amet? Sed cum nostrum modi quidem
                laborum inventore et facere eligendi repellat veniam, eos tempore at quam eveniet
                expedita iure illo ipsam consectetur minima earum perspiciatis incidunt doloremque?
                Harum, officia quidem! Exercitationem officia maxime repellat eveniet suscipit
                reprehenderit earum quaerat consectetur accusamus quia quasi nobis deleniti vitae
                aperiam neque ipsa magni libero mollitia voluptates incidunt repellendus quisquam,
                architecto in adipisci! Nisi!
            </p>
            <p>
                <b>Цена: {pizzaData.price} ₽</b>
            </p>
        </div>
    );
}

export default PizzaPage;
