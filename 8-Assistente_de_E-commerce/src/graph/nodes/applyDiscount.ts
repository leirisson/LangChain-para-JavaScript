import { StateAnnotation } from "../factory";



export function applyDiscount(state: typeof StateAnnotation.State){
    return {
        total: state.total - 10
    }
}