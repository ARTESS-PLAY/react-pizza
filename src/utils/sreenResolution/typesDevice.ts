type forMedia = {
    query: string;
};

export const isMobile: forMedia = {
    query: '(max-width: 900px)',
};
export const isDesctop: forMedia = {
    query: '(min-width: 900px)',
};
