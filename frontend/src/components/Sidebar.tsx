import React from "react"
import { useDataContext } from "../hooks/useDataContext"
import { Option } from "../types"
import OptionBox from "./OptionBox"

const Sidebar = () => {

    const { state } = useDataContext()


    return (
        <div className="w-fit bg-white p-6 h-fit min-h-[60vh]">
            {state.coverages.length > 0 && 
            (
                <>
                    <h1>Coverages</h1>
                    {state.coverages.map((option: Option, index: number) =>
                        <OptionBox
                            key={option._id} option={option} index={index} type="coverages"
                        />
                    )}
                </>
            )}

        </div >
    )
}

export default Sidebar