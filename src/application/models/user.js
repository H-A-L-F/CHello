export function constructUser(username, email, password, path) {
    const user = {
        username: username,
        email: email,
        password: password,
        ws_admin: [],
        ws_member: [],
        b_admin: [],
        b_member: [],
        path: path
    }
    return user
}