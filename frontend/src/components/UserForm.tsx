import React, { FormEvent, useRef, useState } from "react"
import { useDataContext } from "../hooks/useDataContext"
import useFetchApi from "../hooks/useFetchApi"
import moment from "moment"
import { useLoadingContext } from "../hooks/useLoadingContext"

const UserForm = () => {

    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [city, setCity] = useState('')
    const [power, setPower] = useState(0)
    const [voucher, setVoucher] = useState(0)
    const [priceMatch, setPriceMatch] = useState(0)

    const { dispatch } = useDataContext()

    const { getOptions } = useFetchApi()

    const {isLoading, setIsLoading} = useLoadingContext();


    const submit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        if (isLoading) return;

        setIsLoading(true);

        const [day, month, year] = birthdate.split("/");

        // month is zero based so we need to subtract 1
        const dateObject = new Date(+year, +month - 1, +day);

        const today = new Date();

        const age = Math.abs(moment.duration(+dateObject - +today).years());

        const cityLowerCase = city.toLowerCase()

        const options = await getOptions({ name, age, city: cityLowerCase, power, voucher, priceMatch })

        dispatch({
            type: 'SET_ALL', payload: {
                formData: {
                    name: name,
                    age: age,
                    city: cityLowerCase,
                    power: power,
                    voucher: voucher,
                    priceMatch: priceMatch
                },
                coverages: options.coverages,
                discounts: options.discounts,
                bill: options.bill
            }
        })

        setIsLoading(false);


    }

    return (
        <div className="text-primary">
            <h2 className="flex text-5xl font-bold mb-6">User Data</h2>
            <form onSubmit={submit} className="flex flex-col mb-4 user-form">
                <div className="input-container">
                    <label className="mr-4">Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <label className="mr-4">Birthdate: </label>
                    <input pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\d{2}" placeholder="DD/MM/YYYY" type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <label className="mr-4">City: </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <label className="mr-4">Vehicle Power: </label>
                    <input className="text-right" type="number" value={power || ''} onChange={(e) => setPower(+e.target.value)} required/>
                    <span>kW</span>

                </div>
                <div className="input-container">
                    <label className="mr-4">Voucher: </label>
                    <input className="text-right" type="number" value={voucher || ''} onChange={(e) => setVoucher(+e.target.value)} />
                    <span>EUR</span>
                </div>
                <div className="input-container">
                    <label className="mr-4">Price Match: </label>
                    <input className="text-right" type="number" value={priceMatch || ''} onChange={(e) => setPriceMatch(+e.target.value)} />
                    <span>EUR</span>
                </div>
                <button className="flex bg-secondary w-fit text-white py-2 px-4 text-xl font-semibold transition-all hover:opacity-90 hover:scale-90" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserForm