import api from './api';

class UserService {
    getUsersAll() {
        return api.get('/api/v1/users/all/');
    }

    getUserId(id) {
        return api.get(`/api/v1/users/${id}/`);
    }

    postUser(data) {
        return api.post('/api/v1/users/', data);
    }
}

export default new UserService();
