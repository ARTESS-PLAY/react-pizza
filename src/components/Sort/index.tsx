import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/slices/filter/slice';
import { SortItem } from '../../redux/slices/filter/types';
import { RootState } from '../../redux/store';

export const sorts: SortItem[] = [
    { title: 'Популярности ASC', sortParam: 'rating' },
    { title: 'Популярности DESC', sortParam: '-rating' },
    { title: 'Цене ASC', sortParam: 'price' },
    { title: 'Цене DESC', sortParam: '-price' },
    { title: 'Алфавиту ASC', sortParam: 'name' },
    { title: 'Алфавиту DESC', sortParam: '-name' },
];

const Sort: React.FC = () => {
    const [openPopup, setOpenPopup] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const activeSort = useSelector((state: RootState) => state.filter.sort);
    const dispatch = useDispatch();

    const onToggleSort = (obj: SortItem) => {
        dispatch(setSort({ sort: obj }));
        setOpenPopup(false);
    };

    const handleOutSideClick = (e: MouseEvent) => {
        const path = e.composedPath();
        if (sortRef.current && !path.includes(sortRef.current)) {
            setOpenPopup(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutSideClick);
        return () => document.body.removeEventListener('click', handleOutSideClick);
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <div
                className={`sort__label ${openPopup ? 'sort__label-active' : ''}`}
                onClick={() => setOpenPopup((prev) => !prev)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка&nbsp;по:</b>
                <span>{activeSort.title.toLocaleLowerCase()}</span>
            </div>
            {openPopup && (
                <div className="sort__popup">
                    <ul>
                        {sorts.map((obj, i) => (
                            <li
                                key={i}
                                className={obj.title === activeSort.title ? 'active' : ''}
                                onClick={() => onToggleSort(obj)}>
                                {obj.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default React.memo(Sort);
