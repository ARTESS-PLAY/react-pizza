import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

function PizzaCard({ name, imageUrl, price, sizes, types, id, count }) {
    const pizzaTypes = ['Тонкое', 'Традиционное'];

    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(0);

    const onClickType = (typeId) => {
        setActiveType(typeId);
    };

    const onClickSize = (sizeIndex) => {
        setActiveSize(sizeIndex);
    };

    const dispatch = useDispatch();

    const onClickAddToCart = () => {
        dispatch(
            addToCart({
                item: {
                    name: name,
                    price: price,
                    imageUrl: imageUrl,
                    type: pizzaTypes[activeType],
                    size: sizes[activeSize],
                    id: id,
                },
            }),
        );
    };

    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
                <img className="pizza-block__image" src={imageUrl} alt={name} />
                <h4 className="pizza-block__title">{name}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeId) => (
                        <li
                            key={typeId}
                            className={typeId === activeType ? 'active' : ''}
                            onClick={() => onClickType(typeId)}>
                            {pizzaTypes[typeId]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, index) => (
                        <li
                            key={index}
                            className={index === activeSize ? 'active' : ''}
                            onClick={() => onClickSize(index)}>
                            {size} см
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div className="button button--outline button--add" onClick={onClickAddToCart}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {count > 0 && <i>{count}</i>}
                </div>
            </div>
        </div>
    );
}

export default PizzaCard;
