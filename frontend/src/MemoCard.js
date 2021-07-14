import React, {Component} from 'react';
class MemoCard extends Component {

    constructor(props) {
        super();
        this.state = {expanded: false};
        this.randomNumber = Math.floor(Math.random() * 5) + 1;
        this.props = props;
    }

    // render2() {
    //     return "<div class='memo-card memo-card--1' onClick={() => { this.setState({ expanded: !this.state.expanded }) }}>
    //         <div>
    //         <h1> {this.props.memo.title} </h1>
    //         <p> {this.props.memo.content} </p>
    //         </div>
    //     </div>
    //     ";
    // }
  render() {
    return (
        <div
            className={`memo-card memo-card--${this.randomNumber} ${
            this.state.expanded ? "memo-card--expanded" : ""
            }`}
            onClick={() => {
            this.setState({ expanded: !this.state.expanded });
            }}
        >
            <div>
            <h1> {this.props.memo.title} </h1>
            <p> {this.props.memo.content} </p>
            </div>
        </div>
    );
  }
  render2() {
    return (
      <div
        className={`memo-card memo-card--${this.randomNumber} ${
          this.state.expanded ? "memo-card--expanded" : ""
        }`}
        onClick={() => {
          this.setState({ expanded: !this.state.expanded });
        }}
      >
        <div>
          <h1> {this.props.memo.title} </h1>
          <p> {this.props.memo.content} </p>
        </div>
      </div>
    );
  }
}

export default MemoCard;
