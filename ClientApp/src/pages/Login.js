
import React from 'react';
import { AuthService } from '../serviceManager/servicesProvider';
import { Redirect } from 'react-router-dom';
import '../styles/login.scss';
const { Component } = React;

    
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: "logIn",
            password: '',
            login: '',
            isSignedIn: AuthService.isSignedIn(),
        }
      
        this.from = this.props.location.state || { from: { pathname: "/" } };
        this.currentView = this.currentView.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeLog = this.handleChangeLog.bind(this);
        this.removeDescription = this.removeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeDescription() {
        if (this.state.error_description) {
            this.setState({ error_description: '' });
        }
    }
    handleChangePass(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleChangeLog(e) {
        this.setState({
            login: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        AuthService.signIn(this.state.login, this.state.password)
            .then((response) => {
                if (response.succeeded === true) {
                    this.props.history.push("./users");
                } else {
                    if (response.error_description) this.setState({ error_description: response.error_description })
                }
        })
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        });
    }
    _formGroupClass(field) {
        var className = "form-control-feedback ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }
    componentBefore
    currentView = () => {
        
        switch (this.state.currentView) {
            case "logIn":
                return (
                    <form onSubmit={this.handleSubmit}>
                        <h2>Welcome!</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>

                                <div className= {this._formGroupClass(this.state.error_description)}>{this.state.error_description}</div>

                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" value={this.state.login} onFocus={this.removeDescription} onChange={this.handleChangeLog} required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" value={this.state.password} onChange={this.handleChangePass} required />
                                </li>
                                <li>
                                    <i />
                                    <a onClick={() => this.changeView("PWReset")} href="#">Forgot Password?</a>
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit">Log In</button>
                    </form>
                )
                break
            case "PWReset":
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={() => this.changeView("logIn")}>Go Back</button>
                    </form>
                )
            default:
                break
        }
    }
    redirect() {
        console.log("login", AuthService.isSignedIn())
        this.props.history.push("./users")
    }
    render() {
        if (this.state.isSignedIn === true) {
           return ( <Redirect to="/users"/>)
        } else {
            return (
                <section id="entry-page">
                    {this.currentView()}
                </section>
            )
        }
  }
}


