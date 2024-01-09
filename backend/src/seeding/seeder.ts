import citiesData from "./citiesData.json";
import CityModel from "../models/city";
import ageData from "./ageData.json";
import AgeModel from "../models/age";
import coverageData from "./coveragesData.json";
import CoverageModel from "../models/coverages";
import discountsData from "./discountsData.json";
import DiscountsModel from "../models/discounts";


const seedCities = async () => {
    citiesData.forEach(async (data) => {
        const city = await CityModel.create(data);
    });
}

const seedAge = async () => {
    ageData.forEach(async (data) => {
        const age = await AgeModel.create(data);
    });
}

const seedCoverage = async () => {
    coverageData.forEach(async (data) => {
        const coverage = await CoverageModel.create(data);
    });
}

const seedDiscounts = async () => {
    discountsData.forEach(async (data) => {
        const discount = await DiscountsModel.create(data);
    });
}

const seed = async () => {

    // Check if data exists
    const cities = await CityModel.find();
    
    // If data exists, no need to seed.
    if (cities.length !== 0) {
        return;
    }

    try {
        seedCities();
        seedAge();
        seedCoverage();
        seedDiscounts();
    } catch (error) {
        console.log(error);
    }


    //SEED cities

    //SEED users



    //await seed.save()
}

export default seed