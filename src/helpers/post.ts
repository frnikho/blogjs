export const createPostUrlKey = (title: string) => {
    let key: string = title.toLowerCase();
    key = key.replace(/: :/g, '-');
    key = key.replace(/:wine:/g, 'topaze');
    key = key.replace(/:,:/g, '');
    key = key.replace(/:?:/g, '');
    key = key.replace(/:&:/g, '');
    key = key.replace(/:=:/g, '');
    return key;
}
