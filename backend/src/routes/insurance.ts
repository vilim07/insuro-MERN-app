import express from 'express'
import CityModel from '../models/city';
import AgeModel from '../models/age';
import CoverageModel from '../models/coverages';
import DiscountModel from '../models/discounts';
import { calculatePrice as calculateBill, parseCoverageVariations } from '../helpers';
import { Coverage, Discount } from '../types';
import { ObjectId } from 'mongoose';

const router = express.Router()

router.post('/', async (req, res) => {

    const { age, city, power, voucher, activeCoverageIds, activeDiscountIds } = req.body

    // Fetch ageBase from the database
    const ageBase = await AgeModel.findOne({
        min: { $lte: age },
        max: { $gte: age }
    });

    if (!ageBase) {
        // Handle the case where ageBase is not found
        return res.status(404).json({ error: "Age base not found" });
    }

    // Fetch cityValue from the database
    const cityValue = await CityModel.findOne({ name: city }, { value: 1 });

    if (!cityValue) {
        // Handle the case where cityValue is not found
        return res.status(404).json({ error: "City value not found" });
    }
    const availableCoverages: Coverage[] = parseCoverageVariations(await CoverageModel.find({}), power, age);

    const availableDiscounts: Discount[] = await DiscountModel.find({
        $or: [
            { condition: null },
            {
                condition: "power",
                treshold: {
                    $lte: power
                }
            },
            {
                condition: "coverage",
                treshold: {
                    $lte: activeCoverageIds ? activeCoverageIds.length : 0
                }
            }
        ]
    }, { title: 1, value: 1, optional: 1, type: 1 }).lean();

    //Filter out non optional discounts as active ones
    let activeDiscounts: Discount[] = availableDiscounts.filter(discount => discount.optional === false);
    let activeCoverages: Coverage[] = [];

    //Assign active ids to their values if there are any in the body
    if (activeDiscountIds) {
        activeDiscounts = activeDiscountIds.map((id: ObjectId) => availableDiscounts.find(discount => discount._id == id || discount.optional === false));
    }
    if (activeCoverageIds) {
        activeCoverages = activeCoverageIds.map((id: ObjectId) => availableCoverages.find(coverage => coverage._id == id));
    }

    // Create new arrays of options with an 'active' property
    const coverages = availableCoverages.map(coverage => {
        const isActive = activeCoverages.some(activeCoverage => activeCoverage._id == coverage._id);
        return isActive ? { ...coverage, active: true } : coverage;
    });

    // Discounts have a complex query so they need to be converted from a mongoose document to an object
    const discounts = availableDiscounts.map(discount => {
        const isActive = activeDiscounts.some(activeDiscount => activeDiscount._id == discount._id);
        return isActive ? { ...discount, active: true } : discount;
    });


    const bill = calculateBill(ageBase.base, cityValue.value, power, voucher, activeDiscounts, activeCoverages);

    res.json({
        coverages,
        discounts,
        bill
    })
})


module.exports = router