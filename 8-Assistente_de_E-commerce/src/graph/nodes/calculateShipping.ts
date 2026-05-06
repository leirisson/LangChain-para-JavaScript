import { StateAnnotation } from '../factory.ts'


export function calculateShipping(state: typeof StateAnnotation.State) {
    return {
        total: state.cartValue + 20
    }
}