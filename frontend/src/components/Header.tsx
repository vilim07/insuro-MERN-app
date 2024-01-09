import React from "react"
import { useDataContext } from "../hooks/useDataContext"
import OptionBox from "./OptionBox"

const Header = () => {

    const { state } = useDataContext()


    return (
        <header className="flex w-full bg-primary shadow-lg">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-semibold tracking-wide pl-6"><span className="font-extrabold">i</span>nsuro</h1>
                <div className="flex gap-8 h-full items-center">
                    {state.discounts && state.discounts.map((option, index) =>
                        <OptionBox
                            key={option._id} option={option} index={index} type="discounts" className=""
                        />
                    )}
                    <div className="bg-secondary px-6 py-6">
                        <p className="text-white text-2xl"><span className="font-semibold">Price:</span> {state.bill ? state.bill.price.total : 0}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header