import { ObjectId } from "mongoose"

export type City = {
    name: string,
    multiplier: number
}

export type Age = {
    range: string,
    min: number,
    max: number,
    base: number
}

export type CoverageDoc = {
    _id: ObjectId;
    title: string;
    condition?: "age" | "power";
    type: "power" | "fixed" | "base";
    variations: { threshold?: number, value: number }[]
}

export type Coverage = Omit<CoverageDoc, "variations"> & {
    value: number;
};

export type Discount = {
    _id: ObjectId;
    title: string;
    value: number;
    type: "base" | "coverage" | "total"
    condition: "coverage" | "power";
    treshold?: number;
    optional: boolean
}