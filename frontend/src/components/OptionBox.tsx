import React from "react"
import { Option } from "../types"
import useApi from "../hooks/useFetchApi"
import { useDataContext } from "../hooks/useDataContext"
import { useLoadingContext } from "../hooks/useLoadingContext"

const OptionRow = ({ option, index, type, className = '' }: { option: Option, index: number, type: "discounts" | "coverages", className?: string }) => {

    const { getOptions } = useApi()

    const { state, dispatch } = useDataContext()

    const {isLoading, setIsLoading} = useLoadingContext()


    const clickHandler = async () => {

        if (isLoading) return;

        setIsLoading(true);
        const tmpArr = [...state[type]];

        tmpArr[index].active = !tmpArr[index].active;

        //Find and update the active state of this option
        const updatedState = {
            ...state,
            [type]: tmpArr
        }


        let activeCoverageIds: string[] = [];
        if (updatedState.coverages.length > 0) {
            activeCoverageIds = updatedState.coverages.filter(coverage => coverage.active).map(coverage => coverage._id);
        }

        let activeDiscountIds: string[] = [];
        if (updatedState.discounts.length > 0) {
            activeDiscountIds = updatedState.discounts.filter(discount => discount.active).map(discount => discount._id);
        }

        const res = await getOptions({
            name: state.formData.name,
            age: state.formData.age,
            city: state.formData.city,
            power: state.formData.power,
            voucher: state.formData.voucher,
            priceMatch: state.formData.priceMatch,
            activeCoverageIds,
            activeDiscountIds
        });

        dispatch({
            type: 'UPDATE', payload: {
                coverages: res.coverages,
                discounts: res.discounts,
                bill: res.bill
            }
        })

        setIsLoading(false);
    }

    return (
        <button type="button" className={className + " flex items-center cursor-pointer py-4 pr-4 pointer"} onClick={(option.optional == null || option.optional) ? clickHandler : () => { }}>
            <div className="w-4 h-4 bg-white shadow-md p-[2px] rounded-sm">
                {option.active &&
                    <div className={((option.optional != null && !option.optional) && "opacity-50") + " w-full h-full bg-black rounded-sm"} />
                }
            </div>
            <p className="ml-2 select-none text-md font-semibold">{option.title}</p>
        </button>
    )
}

export default OptionRow