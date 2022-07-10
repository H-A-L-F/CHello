export function constructCard(name, status, lid) {
    const card = {
        name: name,
        list: lid,
        status: status
    }
    return card
}