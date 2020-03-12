import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { RoleService } from "../serviceManager/servicesProvider";
import { Layout } from "../components/Layout";


export default class List extends React.Component{

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    state = {
        activeTab: "1",
        textRole: '',
        textClaim: ''
    }
    toggle(tab,e) {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    handleSubmit(e) {
        let name = '';
        if (this.state.activeTab === '1') {
            name = 'textRole'
        } else {
            name= 'textClaim'
        }
        if (this.state[name] !== '' || typeof this.state[name] !== 'undefined') {
            RoleService.create({ Name: this.state[name] })
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <Layout>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={(e) => this.toggle('1',e)}>Create Role</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={(e) => this.toggle('2',e)}>Create Claim</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                        <label htmlFor="exampleText">Roles</label>
                        <input type="textarea" name="textRole" id="textRoles" value={this.state.textRole} onChange={this.handleInputChange} />
                        </TabPane>

                        <TabPane tabId="2">
                        <label htmlFor="exampleText">Claims</label>
                        <input type="textarea" name="textClaim" id="textClaims" value={this.state.textClaim} onChange={this.handleInputChange} />
                        </TabPane>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Save</button>
                        <Link className="btn btn-lg btn-light btn-block" to="/userlist">Cancel</Link>
                </TabContent>
            </Layout>
        )
    }

}

