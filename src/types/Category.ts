export interface Category {
    id: string,
    name: string
}

export function instanceOfCategory(data: any): data is Category {
    return 'name' in data;
}
