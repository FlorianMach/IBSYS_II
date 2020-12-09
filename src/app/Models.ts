export interface MRP2PSNS {
    n1: number;
    n2: number;
    n3: number;
    n4: number;
}
export interface Procurement {
    ItemNo: number
    deliveryTime: any[]
    deviation: any[]
    Initialstock: any
    grossRequirements: MRP2PSNS
    amount: number
    Order: boolean
}


