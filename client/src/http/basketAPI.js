import { $authHost, $host } from "./index";





export const postBasket = async (basket) => {
    const {data} = await $host.post("api/basket", basket )
    return data
}

export const fetchBaskets = async (page, limit = 5) => {
    const {data} = await $authHost.get("api/basket", {params:{page, limit}} )
    return data
}

export const deleteBasket = async (id)  => {
    const {data} = await $authHost.delete("api/basket/"+id)
    return data
}
