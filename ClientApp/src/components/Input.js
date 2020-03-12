import React from 'react';
import User from '../stores/models/UserModel';
import { UserService } from '../App';
import { RoleService } from '../App';

export default class Input {
    constructor() {
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let userUpdates = {
            [name]: value
        };
        this.setState({
            User: Object.assign(this.state.User, userUpdates)
        });
    }
    

    _formGroupClass(field) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }
    render() {
        return (
            <div className={this._formGroupClass(this.state.Errors.UserName)}>
                <label htmlFor="inputUserName" className="form-control-label">User Name*</label>
                <input type="text" autoFocus={true} name="userName" id="inputUserName" value={this.state.User.userName} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                <div className="form-control-feedback">{this.state.Errors.UserName}</div>
            </div>
        )
    }
}