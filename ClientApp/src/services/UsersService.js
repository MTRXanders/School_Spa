import {Rest} from '../serviceManager/servicesProvider';


export default class UsersService {
    constructor() {

    }
    fetchAll() {
        return Rest.get('/api/users');
    }

    fetch(userId) {
        return Rest.get(`/api/users/${userId}`);
    }

    search(query) {
        return Rest.get(`/api/users/search/?q=${query}`);
    }

    update(user) {
        return Rest.put(`/api/users/${user.id}`, user);
    }

    create(user) {
        return Rest.post('/api/users/', user);
    }

    save(user) {
        if (user.id) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    delete(userId) {
        return Rest.delete(`/api/users/${userId}`);
    }
}