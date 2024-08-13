import { Controller, Route, Get } from "tsoa";
export interface IItem {
    id: number;
    name: string;
    email: string;
    password: string;
}

@Route("api/v1")
export class ProductController extends Controller {
    @Get("/users")
    public getAllProducts(): Promise<IItem[]> {
        return Promise.resolve([{ id: 1, name: "Cherrie", email: "seyhaoeurn920@gmail.com", password: "Seyha*9999" }]);
    }

    @Get("/users/1")
    public getOne(): Promise<IItem[]> {
        return Promise.resolve([{ id: 1, name: "Cherrie", email: "seyhaoeurn@gmail.com", password: "Seyha*9999" }]);
    }

    @Get("/products")
    public getProduct(): Promise<IItem[]> {
        return Promise.resolve([{ id: 1, name: "Cherrie", email: "seyhaoeurn@gmail.com", password: "Seyha*9999" }]);
    }
    
}
