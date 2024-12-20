export interface product {
    id?: string;
    name?: string;
    description?: string;
    saving: number;
    grandTotal: number;
    items: item[];
    qty:number;
    mobile?:string;
    created?:Date;
    modified?: Date;
    }

export interface item {
    name?:string;
    qty:string;
    size?:string;
    price:number;
    discount:number;
    total:number;
}

