export default {
    load: () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            return token.user;
        } else {
            return null;
        }
    }
}