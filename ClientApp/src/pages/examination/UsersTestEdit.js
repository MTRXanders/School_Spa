import React from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { Layout } from '../../components/Layout';
import  Field  from '../../components/Field';
import { Link } from 'react-router-dom';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Input
} from 'reactstrap';
import {
    testCreate,
    testUpdate,
    testInternalCreate,
    testInternalUpdate,
    testInternalDelete,
    testsToEdit,
} from '../../actions/tests';
import AddItemBox  from '../../components/AddItemBox';
import classnames from 'classnames';
import Test from '../../stores/models/Test';
import Question from '../../stores/models/Question';
import { questionInternalCreate, questionInternalUpdate, questionInternalDelete} from '../../actions/questions';


 class UsersTestEdit extends React.Component {
     constructor(props) {
         super(props);
        

         this.state = {
             test: new Test(),
             testIndex:'',
             questionIndex: props.index || '',
             activeTab: '1',
             examplePath: 'create',
             Errors: {}
         }
         this.createOr();
         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleInputChangeQuestion = this.handleInputChangeQuestion.bind(this);
         this.handleSaveToDraft = this.handleSaveToDraft.bind(this);
         this.handleCreateAnotherQuestion = this.handleCreateAnotherQuestion.bind(this);
     }
     createOr() {
         const arr = this.props.location.pathname.split('/')

         if (arr[arr.length - 1] === 'create') {
             this.props.testInternalCreate(new Test());
         } else {
             this.props.testToEdit(this.props.location.state.index);
         }
     }
   
     handleInputChange(e) {
         e.preventDefault();
         const target = e.target;
         const value = target.type === 'checkbox' ? target.checked : target.value;
         const name = target.name;
         const testUpdates = {
             [name]: value
         };
         const test = Object.assign(this.current(), testUpdates)
         this.props.testInternalUpdate(this.state.test, this.state.testIndex);

     }
     handleInputChangeQuestion(e) {
         e.preventDefault();
         const target = e.target;
         const value = target.type === 'checkbox' ? target.checked : target.value;
         const name = target.name;
         const questionUpdates = {
             [name]: value
         };
         const question = Object.assign(
             this.current().questions[e._targetInst.index], questionUpdates)

         this.props.questionInternalUpdate(question, this.props.tests.internalEditTest.questionIndex);
     }

     handleCreateAnotherQuestion(e) {
         e.preventDefault();
         if(this.state)
         if (this.state.test.id !== '') {
             this.props.testInternalUpdate(this.state.test,this.state.testIndex)
         } else {
             this.props.testInternalCreate(this.state.test)
         }
     }

     next(tab, e) {
         e.preventDefault();
         if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
         
     }

     handleSaveDraft() {
         if (this.props.test.internalEditTest.isInCreation === true) {
             this.props.testInternalCreate(this.state.test)
         }
     }

     handleSaveToDraft(e) {
         e.preventDefault();

         if (this.state.id === '' || typeof this.state.id === 'undefined') {
             this.props.testInternalCreate(this.state.test,this.state.testIndex);
         } else {
             this.props.testInternalUpdate(this.state.test,this.state.testIndex);
         }
     }

     handleSubmit(e) {
         e.preventDefault();
         if (this.state.id === '' || typeof this.state.id === 'undefined') {
             this.props.testCreate(this.state.test);
         } else {
             this.props.testUpdate(this.state.test);
         }
     }
    _formGroupClass(field) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
     }
    
    
     current() {
         const index = this.props.location.state.regime === 'create' ? this.props.tests.internalEditTest.items.length - 1 : this.props.tests.internalEditTest.currentIndex;
         return this.props.tests.internalEditTest.items[index];
     }
     render() {
        const current = this.props.tests.internalEditTest.items[this.props.tests.internalEditTest.items.length - 1];
      
        return (
            <Layout>
                <Nav tabs>
                    <NavItem>
                        <NavLink name="ref" className={classnames({ active: this.state.activeTab === '1' })} onClick={(e) => this.next('1', e)}>Describe Test</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink name="ref" className={classnames({ active: this.state.activeTab === '2' })} onClick={(e) => this.next('2', e)}> All Questions</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink name="ref" className={classnames({ active: this.state.activeTab === '3' })} onClick={(e) => this.next('3', e)}> Add Questions</NavLink>
                    </NavItem>
                   
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <label htmlFor="exampleText">Test</label>
                       
                        <div className={this._formGroupClass(this.state.Errors.Title)}>
                            <label htmlFor="inputTitle" className="form-control-label">Title*</label>
                            <input type="text" name="title" id="inputTitle" value={current.title} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                            <div className="form-control-feedback">{this.state.Errors.Title}</div>
                        </div>
                        <div className={this._formGroupClass(this.state.Errors.Theme)}>
                            <label htmlFor="inputTheme" className="form-control-label">Theme*</label>
                            <input type="text" name="theme" id="inputTheme" value={current.theme} onChange={this.handleInputChange} className="form-control form-control-danger" required />
                                <div className="form-control-feedback">{this.state.Errors.Theme}</div>
                        </div>
                            <button  className="btn btn-lg btn-primary btn-block" onClick={(e) => this.next('2', e)}> Next step </button>
                    </TabPane>

                    <TabPane tabId="2">
                        <label htmlFor="exampleText">Questions:{this.state.test.questions.length}</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <Fade left >
                                <tbody>
                                    {current.questions && current.questions.length > 0 ? current.questions.map((item, index) =>
                                        <tr key={item.id}>
                                            <td>{item.value}</td>

                                            <td><button className="btn btn-link">Edit</button></td>
                                            <td><button className="btn btn-link" onClick={(e) => this.delete(test)}>Delete</button></td>
                                        </tr>
                                    ) : <tr><td>No questions</td></tr>
                                    }
                                </tbody>
                            </Fade>
                        </table>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSaveToDraft}>Save to draft</button>
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Save Test</button>
                    </TabPane>

                    <TabPane tabId="3">
                        <label htmlFor="exampleText">Questions:{current.questions.length}</label>
                        <Input index={this.props.index} className="form-control form-control-danger" type="textarea" name="value" id="value" value={this.state.textClaim} onChange={this.handleInputChangeQuestion} />
                        <AddItemBox element={Field} />
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.handleCreateAnotherQuestion}>Create another question</button>
                        <button className="btn btn-lg btn-primary btn-block" index={current.questions.length + 1} onClick={(e) => this.next('3', e)}>Next step</button>
                    </TabPane>
                    <Link className="btn btn-lg btn-light btn-block" to="/tests">Cancel</Link>
                </TabContent>
            </Layout>
        )
    }
 }
const mapStateToProps = (state) => {
    return {
        tests: state.tests,
        itemsEdit: state.tests.internalEditTest.items,
        index: state.tests.internalEditTest.currentIndex
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        testCreate: (test) => dispatch(testCreate(test)),
        testUpdate: (test) => dispatch(testUpdate(test)),
        testInternalCreate: (test) => dispatch(testInternalCreate(test)),
        testInternalUpdate: (test, indexTest) => dispatch(testInternalUpdate(test,indexTest)),
        testInternalDelete: (indexTest) => dispatch(testInternalDelete(indexTest)),
        testToEdit: (index) => dispatch(testsToEdit(index)),
        questionInternalCreate: (question) => dispatch(questionInternalCreate(question)),
        questionInternalUpdate: (question,index) => dispatch(questionInternalUpdate(question, index)),
        questionInternalDelete: (index) => dispatch(questionInternalDelete(index))

    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(UsersTestEdit);

