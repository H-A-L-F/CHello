export function constructUser(username, email, password, path) {
    const user = {
        username: username,
        email: email,
        password: password,
        photoURL: "",
        bio: "",
        privacy: "",
        notification_frequency: "instant",
        ws_admin: [],
        ws_member: [],
        b_admin: [],
        b_member: [],
        fav_board: [],
        path: path
    }
    return user
}