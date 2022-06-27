export class Product {
    // add all the property names of Product from the entity model in java
    // matches with the actual JSON data passed back from spring boot service
    id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number
    dateCreate: Date;
    lastUpdated: Date;
    
}
