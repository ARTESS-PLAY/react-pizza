import React from 'react';
import ContentLoader from 'react-content-loader';

const Placeholder = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="140" cy="125" r="125" />
        <rect x="0" y="265" rx="15" ry="15" width="280" height="20" />
        <rect x="0" y="293" rx="15" ry="15" width="280" height="88" />
        <rect x="0" y="405" rx="15" ry="15" width="90" height="27" />
        <rect x="128" y="392" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
);

export default Placeholder;
