import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PizzaPage: React.FC = () => {
    const [pizzaData, setPizzaData] = React.useState<{
        name: string;
        imageUrl: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('http://localhost:3005/items/' + id);
                setPizzaData(data);
            } catch (e) {
                alert('Ошибка при получении пиццы');
                navigate('/');
            }
        }
        fetchPizza();
    }, [id]);

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
};

export default PizzaPage;
