import React from 'react';
import cl from './Search.module.scss';

import { setSearch } from '../../redux/slices/filter/slice';

import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [localValue, setLocalValue] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const changeSearch = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearch(str));
        }, 550),
        [],
    );

    const handleChange = (str: string) => {
        setLocalValue(str);
        changeSearch(str);
    };
    const { pathname } = useLocation();
    if (pathname === '/cart') {
        return null;
    }
    return (
        <div className={cl.search}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z" />
            </svg>
            <input
                type="text"
                ref={inputRef}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
            />
            {localValue && (
                <svg
                    onClick={() => {
                        setLocalValue('');
                        dispatch(setSearch(''));
                        inputRef.current?.focus();
                    }}
                    className={cl.close}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                </svg>
            )}
        </div>
    );
};

export default Search;
