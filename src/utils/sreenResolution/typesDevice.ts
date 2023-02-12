type forMedia = {
    query: string;
};

export const isMobileT: forMedia = {
    query: '(max-width: 900px)',
};
export const isDesctopT: forMedia = {
    query: '(min-width: 900px)',
};
