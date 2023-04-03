//время из mongoDB

//формат 15.10.2022 18:22
export const getDateAndTime = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes();
};

//формат 15.10.2022
export const getDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString();
};
