import React, {Component} from 'react';

class MemoNewEntryForm extends Component {

    constructor(props) {
        super();
        this.values = { // time is given internally
            title: "",
            content: "",
            badge1: "",
            badgeColor1: "",
            badge2: "",
            badgeColor2: "",
            badge3: "",
            badgeColor3: "",
            badge4: "",
            badgeColor4:"",
        };
    }

    getValues() {
        return this.values;
    }

    // Keep user input updated
    handleInputChange = (event) => {
        this.values[event.target.name] = event.target.value;
    };

    render() {
        return(

            <div>

            <form id="memos-add-box" onSubmit={this.addMemo}>
                <input 
                type="text"
                name="title"
                placeholder="Memo title"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="content"
                placeholder="Type your memo here"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badge1"
                placeholder="badge1 name"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badgeColor1"
                placeholder="badge1 color"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badge2"
                placeholder="badge2 name"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badgeColor2"
                placeholder="badge2 color"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badge3"
                placeholder="badge3 name"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badgeColor3"
                placeholder="badge3 color"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badge4"
                placeholder="badge4 name"
                onChange={this.handleInputChange}
                />
                <input 
                type="text"
                name="badgeColor4"
                placeholder="badge4 color"
                onChange={this.handleInputChange}
                />
            </form>
            </div>
        )
    }
}

export default MemoNewEntryForm;