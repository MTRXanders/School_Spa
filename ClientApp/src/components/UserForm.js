
import React from 'react';
import User from '../stores/models/UserModel';
import { Link } from 'react-router-dom';
import { UserService } from '../App';
import { RoleService } from '../App';
import '../styles/UserForm.scss';
import { Layout } from './Layout';




export class UserForm extends React.Component {
    constructor(props) {
        super(props);
       
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.arrRetunToString = this.arrRetunToString.bind(this);
    }
    state = {
        Userlist: "/userlist",
        UserEdit: "/users/edit/:id",
        UserNew: "/users/new",
        User: null,
        Errors: {},
        CommonErrors: [],
        roleOptions: [],
    }

    componentWillMount() {
        if (this.props.match.path === this.state.UserEdit) {
            UserService.fetch(this.props.match.params.id).then((response) => {
                console.log(typeof response)
                if (response.id && typeof response === 'object') {
                    for (let prop in response) {
                        if (response[prop] === null) {
                            response[prop] = '';
                        }

                    }
                }
                this.setState({ User: response });
            });
            RoleService.fetchAll().then(response => {
                this.setState({ roleOptions: response })
            });
        
        } else {
            RoleService.fetchAll().then(response => {
                let newUser = new User();
                this.setState({ User: newUser, roleOptions: response });
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.saveUser(this.state.User);
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
    arrRetunToString(event) {
        this.state.User.roles.toString();
    }

    saveUser(User) {
        this.setState({ Errors: {} });
        let userUpdates = {};
        userUpdates.age = parseInt(this.state.User.age);
        
        if (this.state.User.roles.length > 0) {
            console.log(typeof this.state.User.roles);
            if (typeof this.state.User.roles === 'string') {
                if (this.state.User.roles.indexOf(",") === -1) {
                    userUpdates.roles = this.state.User.roles.split();
                } else {
                    userUpdates.roles = this.state.User.roles.split(",");
                   
                }
                this.setState({
                    User: Object.assign(this.state.User, userUpdates)
                });
            }
        }
        UserService.save(User).then((response) => {

            if (response.title  && response.title === "One or more validation errors occurred.") {
                this.setState({ Errors: response.errors });
            } else if (response) {
                if (Array.isArray(response))
                this.setState({ CommonErrors: response });
            } else {
                this.props.history.push(this.state.Userlist);
            }
        }).catch(response => {
           
            console.log(response)
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
        if (!this.state.User) {
            return <Layout><div> Loading...</ div></Layout>;
        }
        else {
            return <Layout><fieldset className="form-group">
                <legend>{this.state.User.ApplicationUserId !== "" ? "Edit User" : "New User" }</legend>
                <form onSubmit={this.handleSubmit}>
                    <div >{this.state.CommonErrors.map((errors) => <div className="form-control-feedback">{errors.description}</div>)}</div>
                 
                    <div className={this._formGroupClass(this.state.Errors.UserName)}>
                        <label htmlFor="inputUserName" className="form-control-label">User Name*</label>
                        <input type="text" autoFocus={true} name="userName" id="inputUserName" value={this.state.User.userName} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.Errors.UserName}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.Roles)}>
                        <label htmlFor="inputRoles" className="form-control-label">Roles</label>
                        <select name="roles" id="inputRoles" value={this.state.User.roles.toString()} onFocus={this.arrRetunToString} onChange={this.handleInputChange} className="form-control form-control-danger" >
                            <option></option>
                            {this.state.roleOptions && this.state.roleOptions.map((option) => <option key={option.id}>{option.name}</option>)}
                         </select>
                        <div className="form-control-feedback">{this.state.Errors.Roles}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.LastName)}>
                        <label htmlFor="inputLastName" className="form-control-label">Last Name*</label>
                        <input type="text"  name="lastName" id="inputLastName" value={this.state.User.lastName} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.Errors.LastName}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.FirstName)}>
                        <label htmlFor="inputFirstName" className="form-control-label">First Name*</label>
                        <input type="text" name="firstName" id="inputFirstName" value={this.state.User.firstName} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.Errors.FirstName}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.Patronymic)}>
                        <label htmlFor="inputPatronymic" className="form-control-label">Patronymic</label>
                        <input type="text" name="patronymic" id="inputPatronymic" value={this.state.User.patronymic} onChange={this.handleInputChange} className="form-control form-control-danger"  />
                        <div className="form-control-feedback">{this.state.Errors.Patronymic}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.Email)}>
                        <label htmlFor="inputEmail" className="form-control-label">Email*</label>
                        <input type="Email" name="email" id="inputEmail" value={this.state.User.email} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                        <div className="form-control-feedback">{this.state.Errors.Email}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.Age)}>
                        <label htmlFor="inputAge" className="form-control-label">Age</label>
                        <input type="number" name="age" id="inputAge" value={this.state.User.age} onChange={this.handleInputChange} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.Errors.Age}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.Gender)}>
                        <label htmlFor="inputGender" className="form-control-label">Gender*</label>
                        <select  name="gender" id="inputGender" value={this.state.User.gender} onChange={this.handleInputChange} className="form-control form-control-danger" required>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                            <div className="form-control-feedback">{this.state.Errors.Gender}</div>
                    </div>
                    <div className={this._formGroupClass(this.state.Errors.UniqId)}>
                        <label htmlFor="inputUniqId" className="form-control-label">Unique Identity*</label>
                        <input type="text"  name="uniqId" id="inputUniqId" value={this.state.User.uniqId} onChange={this.handleInputChange} className="form-control form-control-danger"  />
                        <div className="form-control-feedback">{this.state.Errors.UniqId}</div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                    <Link className="btn btn-lg btn-light btn-block" to="/userlist">Cancel</Link>
                </form>
            </fieldset>
            </Layout>
        }
    }
}
