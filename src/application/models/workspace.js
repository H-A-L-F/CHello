//Workspace
//name
//visibility
//delete
//admin
//member

export function constructWorkspace(name, vis) {
    const workspace = {
        name: name,
        visibility: vis,
        delete: "",
        admin: [],
        member: [],
    }

    return workspace
}