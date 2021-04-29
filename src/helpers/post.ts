export const createPostUrlKey = (title: string) => {
    let key: string = title.toLowerCase();
    key = key.replaceAll(' ', '-');
    key = key.replaceAll('wine', 'topaze');
    key = key.replaceAll(',', '');
    key = key.replaceAll('?', '');
    key = key.replaceAll('&', '');
    key = key.replaceAll('=', '');
    return key;
}
