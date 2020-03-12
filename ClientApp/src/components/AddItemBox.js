import React from 'react';
import '../styles/AddItemBox.scss';
export default class AddItemBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            components: [props.element]
        }
        this.handleOptionAdd = this.handleOptionAdd.bind(this);
    }
    
    handleOptionAdd(e) {
        e.preventDefault();
        let arr = this.state.components;
        arr.push(this.props.element);
        this.setState({ components: arr });
    }
    
    render() { 
        const eachComp = this.state.components.map((Element, index) => {
            return (
                <Element key={index} index={index}  />
            )
        });
        return (
            <div>
                <label className="option-label">Options</label>
                {eachComp}
                <button onClick={this.handleOptionAdd} className="plus-circle"></button>
            </div>
        )
    }
}

 