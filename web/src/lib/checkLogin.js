const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        if (localStorage.getItem('tokenExpiration') < Date.now()) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            return false;
        }
        return true;
    }
    return false;
}
export default checkLogin;