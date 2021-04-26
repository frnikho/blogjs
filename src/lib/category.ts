import {Category, instanceOfCategory} from "../types/Category";
import {createConnection} from "./db";

export async function getCategories(): Promise<Category[]> {
    let categories: Category[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * from categories`);
    response.map((category) => {
        if (instanceOfCategory(category))
            categories.push(category as Category);
    });
    return categories;
}
