export interface _Inventory {

    id?: number;
    createAt?: string;
    name: string;
    description: string;
    category: string;
    status: 'Available' | 'Unavailable';
    price: number;
    discount?: number;
    quantity: number

}