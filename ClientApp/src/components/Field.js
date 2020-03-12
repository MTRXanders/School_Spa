import React from 'react';
import { connect } from 'react-redux';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { optionInternalDelete, optionInternalUpdate, optionInternalCreate, optionsSetGoal} from '../actions/options';
import '../styles/Field.scss';

 class Field extends React.Component {
    constructor(props) {
        super(props)
        this.handlerChangeInput = this.handlerChangeInput.bind(this);
        this.handlerChangeCheck = this.handlerChangeCheck.bind(this);
        this.state = {
            isCheck: () => (this.props.goal !== '' && Number(this.props.goal) === this.props.index) ? true : false,
            bool: false
           
        }
      // this.input = React.createRef();
    }
    componentDidMount() {
        if (typeof this.props.options[this.props.index] === 'undefined') {
            this.props.optionsInternalCreate('');
        }
    }
     shouldComponentUpadate(state, nextState) {
         console.log(state, nextState);
     }
     handlerChangeCheck(e) {

        this.setState(previosState => ({ bool: !previosState.bool }));
        console.log(e.target, e)
        this.props.optionsSetGoal( this.props.index.toString());
    }

    handlerChangeInput(e) {
        this.props.optionsInternalUpdate(e.target.value, this.props.index);
    }
    render() {
        return (
            <InputGroup className="top-margin">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <Input onChange={this.handlerChangeCheck} addon name={"checkBox" + this.props.index.toString()} checked={this.state.isCheck()} type="checkbox" index={this.props.index} aria-label="Checkbox for following text input" />
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={this.props.options[this.props.index]} onChange={this.handlerChangeInput} index={this.props.index} placeholder="Check it out" />

            </InputGroup>
        )
    }
 }
const mapStateToProps = (state)=>{
    return {
        options: state.options.items,
        goal: state.options.goal
    }
}
 const mapDispatchToProps =(dispatch)=>{
    return {
        optionsInternalCreate: (option) => dispatch(optionInternalCreate(option)),
        optionsInternalUpdate: (option, index) => dispatch(optionInternalUpdate(option, index)),
        optionsInternalDelete: (index) => dispatch(optionInternalDelete(index)),
        optionsSetGoal: (goal) => dispatch(optionsSetGoal(goal))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Field);