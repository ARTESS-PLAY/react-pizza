import React from 'react';

function Categoties({ activeCategory, setActiveCategory }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    return (
        <div className="categories">
            <ul>
                {categories.map((el, index) => (
                    <li
                        key={index}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => setActiveCategory(index)}>
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categoties;
