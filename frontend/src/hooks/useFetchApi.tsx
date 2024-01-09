type Data = {
    name: string
    age: number
    city: string
    power: number
    voucher: number | null
    priceMatch: number | null
    activeCoverageIds?: string[]
    activeDiscountIds?: string[]
}

const useApi = () => {

    const apiURI = "http://localhost:4000/api/insurance"

    const getOptions = async (data: Data) => {
        const response = await fetch(apiURI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const json = await response.json()
        
        if (response.ok) {
            return json
        } else {
            throw new Error(json.message)
        }
    }

    return {
        getOptions,
    }
}

export default useApi
