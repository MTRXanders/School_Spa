import React from "react";
import { Link } from 'react-router-dom';
import { UserService } from '../serviceManager/servicesProvider';
import { Fade } from 'react-reveal';
import { Layout } from '../components/Layout';


export class List extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            Userlist: "/users",
            UserEdit: "/users/edit/:id",
            UserNew: "/users/create",
            users: [],
            searchQuery: '',
        };
        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
     }
    componentWillMount() {
       this.showAll();
    }

    showAll() {
        UserService.fetchAll().then((response) => {
            this.setState({ searchQuery: '', users: response });
        });
    }

    handleSearchQueryChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSeachSubmit(event) {
        event.preventDefault();

        if(!this.state.searchQuery){
            this.showAll();
            return;
        }

        UserService.search(this.state.searchQuery).then((response) => {

            this.setState({ users: response });
        });
    }
    
    delete(user) {
        UserService.delete(user.applicationUserId).then((response) => {
            let upadateUsers = this.state.users;
            upadateUsers.splice(upadateUsers.indexOf(user), 1);
            this.setState({ users: upadateUsers });
        });
    }

    render() {
            return (<Layout>
                <h1>Users</h1>
                <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                    <input className="form-control form-control form-control-sm" type="text" value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search!" />
                    <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
                {this.state.searchQuery && this.state.users && this.state.users.length === 0 &&
                    <p>No results!</p>
                }
                {this.state.users && this.state.users.length > 0 &&

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Patronymic</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <Fade left >
                            <tbody>
                                {
                                    this.state.users.map((user, index) =>
                                        <tr key={user.applicationUserId}>
                                            <td>{user.lastName}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.patronymic}</td>
                                            <td><button className="btn btn-link"><Link to={this.state.UserEdit.replace(":id", user.applicationUserId.toString())}>edit</Link></button>
                                                <button type="button" className="btn btn-link" onClick={(e) => this.delete(user)}>delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Fade>
                    </table>

                }
                <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>Clear search</button>
                <Link className="btn btn-success" to={this.state.UserNew}>Add</Link>
            </Layout>)
        };
    
}
