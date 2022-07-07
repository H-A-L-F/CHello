export function constructBoard(name, vis, wsid) {
    const board = {
        name: name,
        visibility: vis,
        workspace: wsid,
        delete: "",
        admin: [],
        member: [],
    }
    return board
}