interface DeepCloneObject{
    [key: string]: DeepCloneObject | undefined
}
function deepClone(o: DeepCloneObject) {
    if(typeof o === 'object') {
        let clone = Array.isArray(o) ? [] : {}
        for(let key in o) {
            if(o.hasOwnProperty(key)) {
                clone[key] = deepClone(o[key])
            }
        }
        o.a
        return clone
    } else {
        return o
    }
}

