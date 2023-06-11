/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-09-10 13:37:11
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-10 14:26:58
 */
import {
    // ref,
    // watch,
    onMounted,
    // Ref,
} from 'vue'

// type Status = Ref<number | null>
type Status = number | null
export interface UseStatus {
    status: Status,
    updateStatus: (status: Status) => void
}

export default function useStatus(): UseStatus{
    let status = null
    // let status: Status = ref(null)
    // watch(status, (newVal, oldVal) => {
    //     console.log('watch status', newVal, oldVal)
    // })

    function updateStatus(payload) {
        // status.value = payload
        status = payload
    }

    onMounted(() => {
        console.log('useStatus hook onMounted', status)
    })

    return {
        status,
        updateStatus
    }
}



interface Motorcycle {
    vType: string, //discriminant
    make:  number // year
}
interface Car {
    vType: string, // discriminant
    transmission:  Object // year
}
interface Truck {
    vType: string, // discriminant
    capacity:  number // year
}

interface Vehicle extends Motorcycle, Car, Truck {}
const EVALUATION_FACTOR = Math.PI
// function evaluatePrice(vehicle: Vehicle) { 
//     return vehicle.capacity! * EVALUATION_FACTOR 
// }

const evaluatePrice = <T extends Partial<Vehicle>>(vehicle: T) => {
    return vehicle.capacity! * EVALUATION_FACTOR 
}

const myTruck: Truck = { vType:'truck', capacity: 9.5 } 
evaluatePrice(myTruck)