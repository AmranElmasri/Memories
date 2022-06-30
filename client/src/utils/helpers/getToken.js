import jwt_decode from 'jwt-decode';

const getToken = () => {
    const token = document.cookie.split('=')[1];
    if (token) {
        return jwt_decode(token);
    } else {
        return false;
    }

}

export default getToken;
