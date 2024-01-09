import { Coverage, CoverageDoc, Discount } from "./types";

const parseCoverages = (coverages: Coverage[], power: number, basePrice: number) => {
    let coverageList: { title: string, value: string }[] = [];

    const coverageValue = +coverages.reduce((acc, coverage) => {
        let value = 0;
        if (coverage.type === "base") {
            value = coverage.value / 100 * basePrice;
        } else if (coverage.type === "power") {
            value = coverage.value / 100 * power;
        } else if (coverage.type === "fixed") {
            value = coverage.value;
        }
        coverageList.push({ title: coverage.title, value: value.toFixed(2) });
        return acc + value;
    }, 0).toFixed(2)

    return { coverageList, coverageValue }
}

const parseDiscounts = (discounts: Discount[], basePrice: number, coverageValue: number) => {
    let discountList: { title: string, value: string }[] = [];
    let totalDiscountList: Discount[] = [];

    const discountValue = +discounts.reduce((acc, discount) => {
        let value = 0;
        if (discount.type === "base") {
            value = discount.value / 100 * basePrice;
        } else if (discount.type === "coverage") {
            value = discount.value / 100 * coverageValue
        }
        if (discount.type !== "total") {
            discountList.push({ title: discount.title, value: value.toFixed(2) });
        } else {
            totalDiscountList.push(discount);
        }
        return acc + value;
    }, 0).toFixed(2);

    return { discountList, totalDiscountList, discountValue }
}

export const calculatePrice = (base: number, cityMulti: number, power: number, voucher = 0, discounts: Discount[] = [], coverages: Coverage[] = []) => {
    let discountValue = 0;
    let coverageValue = 0;
    let totalDiscountPerc = 0;

    const basePrice = base * (1 + cityMulti / 100);

    let coverageList: { title: string, value: string }[] = [];
    let discountList: { title: string, value: string }[] = [];
    let totalDiscountList: Discount[] = [];


    if (coverages.length > 0) {
        ({ coverageList, coverageValue } = parseCoverages(coverages, power, basePrice));
    }

    // Add up all discounts and get the discount value
    if (discounts.length > 0) {
        ({ discountList, totalDiscountList, discountValue } = parseDiscounts(discounts, basePrice, coverageValue));
    }

    //Price before total discount
    const priceBeforeTotal = basePrice + coverageValue + discountValue;


    //Calculate total discount values for each total discount
    if (totalDiscountList.length > 0) {
        totalDiscountList.forEach(discount => {
            totalDiscountPerc += discount.value;
            discountList.push({ title: discount.title, value: (priceBeforeTotal * (discount.value / 100)).toFixed(2) });
        })
    }

    const totalPrice = (priceBeforeTotal * (1 + totalDiscountPerc / 100) - voucher).toFixed(2);



    return {
        price: {
            base: (basePrice).toFixed(2),
            total: totalPrice
        },
        coverages: coverageList,
        discounts: discountList
    }
}

//Leaves only the active coverage variation (only allows for one valid variation per coverage)
export const parseCoverageVariations = (coverages: CoverageDoc[], power: number, age: number) => {

    let updatedCoverages: Coverage[] = [];
    let value: number;

    coverages.forEach(coverage => {

        if (coverage.variations.length > 1) {
            // Get condition variable to be used in the condition
            let conditionVariable: number;
            switch (coverage.condition) {
                case 'power':
                    conditionVariable = power;
                    break;
                case 'age':
                    conditionVariable = age;
                    break;

                default:
                    break;
            }

            coverage.variations.forEach((variation, index) => {
                if (variation.threshold) {
                    //Check if over treshold (x) or under treshold (-x)
                    if ((variation.threshold > 0 && conditionVariable >= variation.threshold) ||
                        (variation.threshold < 0 && conditionVariable < (-variation.threshold))) {
                        value = coverage.variations[index].value;
                    }
                }

            })
            // If there is no treshold
        } else {
            value = coverage.variations[0].value;
        }

        updatedCoverages.push({
            _id: coverage._id,
            title: coverage.title,
            type: coverage.type,
            value
        })
    });

    return updatedCoverages;
}

