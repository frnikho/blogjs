export interface Post {
    id: string,
    userId: string
    content: string,
    title: string,
    url_key: string,
    categoryId?: string,
    imageCover?: string,
    created_date?: Date,
    updated_date?: Date
}

export function instanceOfPost(data: any): data is Post {
    return 'content' in data;
}


export function getPostFromJson(json: any): Post {
    if (instanceOfPost(json))
        return (json as Post);
    return null;
}

export function getPostsFromJsonArray(array: any[]): Post[] {
    let posts: Post[] = [];
    array.forEach((value) => {
        if (instanceOfPost(value))
            posts.push(value as Post);
    });
    return posts;
}
