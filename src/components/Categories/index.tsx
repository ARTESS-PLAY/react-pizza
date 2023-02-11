import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/filter/slice';
import { RootState } from '../../redux/store';

const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categoties: React.FC = () => {
    const dispatch = useDispatch();
    const activeCategory: number = useSelector((state: RootState) => state.filter.category);

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
};

export default React.memo(Categoties);
