import React from "react"
import { useDataContext } from "../hooks/useDataContext"

const Receipt = () => {

    const { state } = useDataContext()

    if (!state.bill) {
        return null
    }

    return (
        <div className="text-left text-primary receipt w-[400px]">
            <h2 className="text-5xl font-bold mb-6">Receipt</h2>
            <div className="flex justify-between text-2xl font-semibold deco-underline pb-6">
                <span>Base price: </span>
                <span>{state.bill.price.base}</span>
            </div>

            <div className="mb-4">
                <h3 className="text-2xl font-semibold">Coverages:</h3>
                {state.bill.coverages.length > 0 ?
                    (<ul className="ml-4 ">
                        {state.bill.coverages.map((coverage, index) => {
                            return (
                                <li className="flex justify-between" key={index}>
                                    <span>{coverage.title}</span>
                                    <span>{coverage.value}</span>
                                </li>
                            )
                        })}
                    </ul>)
                    : <span className="ml-4">-</span>
                }
            </div>

            <div className="mb-4">
                <h3 className="text-2xl font-semibold">Discounts:</h3>
                {state.bill.discounts.length > 0 ?
                    (<ul className="ml-4 ">
                        {state.bill.discounts.map((discount, index) => {
                            return (
                                <li className="flex justify-between" key={index}>
                                    <span>{discount.title}</span>
                                    <span>{discount.value}</span>
                                </li>
                            )
                        })}
                    </ul>)
                    : <span className="ml-4">-</span>
                }

            </div>
            {state.bill.price.voucher && 
                        <div className="flex justify-between mt-8 text-xl font-semibold deco-underline pb-2">
                        <span>Voucher:</span>
                        <span>-{state.bill.price.voucher}</span>
                    </div>
            }

            <div className="flex justify-between text-3xl font-semibold pb-2">
                <span>Total:</span>
                <span>{state.bill.price.total}</span>
            </div>

        </div>
    )
}

export default Receipt