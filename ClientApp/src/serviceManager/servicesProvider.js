import RestUtilities from '../services/RestUtilities';
import AuthServices from '../services/AuthServices';
import RolesService from '../services/RolesService';
import UsersService from '../services/UsersService';
import UsersTestManager from '../services/UsersTestManager';

export const Rest = new RestUtilities();
export const AuthService = new AuthServices();
export const RoleService = new RolesService();
export const UserService = new UsersService();
export const TestManager = new UsersTestManager();

export const servicesProvider = {
    rest : Rest,
    auth : AuthService,
    roles : RoleService,
    users : UserService,
    tests : TestManager
}