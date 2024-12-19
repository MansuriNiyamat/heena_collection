export interface product {
    id?: string;
    name?: string;
    description?: string;
    saving: number;
    grandTotal: number;
    items: item[];
    mobile?:string;
}

export interface item {
    name?:string;
    qty:string;
    size?:string;
    price:number;
    discount:number;
    total:number;
}

