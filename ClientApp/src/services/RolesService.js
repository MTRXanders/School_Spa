import { Rest } from '../App';

export default class RolesService {
    constructor() {

    }
    fetchAll() {
        return Rest.get('/api/roles');
    }

    fetch(roleId) {
        return Rest.get(`/api/roles/${roleId}`);
    }

   
    update(role) {
        return Rest.put(`/api/roles/${role.id}`, role);
    }

    create(role) {
        return Rest.post('/api/roles/', role);
    }

    save(role) {
        if (role.id) {
            return this.update(role);
        } else {
            return this.create(role);
        }
    }

    delete(roleId) {
        return Rest.delete(`/api/roles/${roleId}`);
    }
}