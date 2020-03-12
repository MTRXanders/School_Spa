import { Rest } from '../serviceManager/servicesProvider';


export default class UsersTestManager {
    constructor() {

    }
    fetchAll() {
        return Rest.get('/api/tests');
    }

    fetch(testId) {
        return Rest.get(`/api/tests/${testId}`);
    }

    search(query) {
        return Rest.get(`/api/tests/search/?q=${query}`);
    }

    update(test) {
        return Rest.put(`/api/tests/${test.id}`, test);
    }

    create(test) {
        return Rest.post('/api/tests/', test);
    }

    save(test) {
        if (test.id) {
            return this.update(test);
        } else {
            return this.create(test);
        }
    }

    delete(testId) {
        return Rest.delete(`/api/tests/${testId}`);
    }
}