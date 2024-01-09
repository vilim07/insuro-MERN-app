export interface FormData {
    name: string;
    age: number;
    city: string;
    power: number;
    voucher: number | null;
    priceMatch: number | null;
}

export type DataContextState = {
    formData: FormData;
    discounts: Option[] | [];
    coverages: Option[] | [];
    bill: {
        price: {
            base: number;
            total: number;
        },
        coverages: { title: string, value: number }[],
        discounts: { title: string, value: number }[],
    } | null;
}

export type AllPayload = {
    formData: FormData;
    coverages: Option[] | [];
    discounts: Option[] | [];
    bill: {
        price: {
            base: number;
            total: number;
        },
        coverages: { title: string, value: number }[],
        discounts: { title: string, value: number }[],
    };
}

export type UpdatePayload = Omit<AllPayload, 'formData'>;


export type Action = {
    type: string;
    payload: AllPayload | UpdatePayload;
}

export type Option = {
    _id: string;
    title: string;
    optional?: boolean;
    active: boolean;
    type: "discounts" | "coverages";
}
