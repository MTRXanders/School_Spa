import {Rest} from '../App';

export default class AuthServices {

    constructor() {
        this.STORAGE_KEY = "token";
        this.isSigned= false ;
    }
    isSignedIn() {
        return this.isToken();
    }

    signInOrRegister(name, password, isRegister = false) {

        return Rest.post(`/api/auth/${isRegister ? 'register' : 'login'}`,
            `username=${name}&password=${password}${!isRegister ? '&grant_type=password' : ''}`)
            .then((response) => {
               
                    console.log(response)
                if (response.succeeded === true) {
                    this.isSigned = true;
                    this.setToken(response.succeeded);
                } else {
                    this.isSigned = false;
                    if (this.isToken()) {
                        this.signOut()
                    }
                }
               
                return response;
            }).catch(error => {
                console.log(error)
            });
    }

    signIn(name, password) {
        return this.signInOrRegister(name, password, false);
    }

    register(name, password) {
        return this.signInOrRegister(name, password, true);
    }
    isToken() {
        return !!this.getToken();
    }
    confirm(token) {
        return Rest.post('/api/auth/confirm', { token: token })
            .then((response) => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    }

    signOut() {
        window.localStorage.removeItem(this.STORAGE_KEY);
        return Rest.post('api/auth/logout').then(res => {
            console.log(res)
        })
    }


    getToken() {
        return window.localStorage.getItem(this.STORAGE_KEY);
    }

    setToken(token) {
        window.localStorage.setItem(this.STORAGE_KEY, token);
    }

} 
