export function convertForSelect(val) {
    return { value: val, label: val }
}

export function generateOptions(data) {
    let res = []
    data?.forEach(element => {
        res.push(convertForSelect(element.email))
    });
    return res
}