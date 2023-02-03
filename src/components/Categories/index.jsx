import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/filterSlice';

function Categoties() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const dispatch = useDispatch();
    const activeCategory = useSelector((state) => state.filter.category);
    console.log('я перересовался');
    return (
        <div className="categories">
            <ul>
                {categories.map((el, index) => (
                    <li
                        key={index}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => dispatch(setCategory({ category: index }))}>
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categoties;
