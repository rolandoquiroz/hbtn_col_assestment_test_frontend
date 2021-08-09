import api from "./api";
import TokenService from "./token.service";


class AuthService {
    login({ email, password }) {
        return api
            .post('/token/access-refresh/', {
                email,
                password
        })
        .then(response => {
            if (response.data.access) {
                TokenService.setUser(response.data);
        }
            return response.data;
        });
    }

    logout() {
        TokenService.removeUser();
    }

}

export default new AuthService();
