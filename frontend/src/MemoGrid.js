import MemoCard from './MemoCard'
import { wrapGrid, unwrapGrid } from 'animate-css-grid';
import React, {Component} from 'react';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
          array: this.props.memos
        }
    }

    changeState() {
      this.setState({flag: !this.state.flag});
    }

    wrapGrid() {
        wrapGrid(this.grid, { easing : 'backOut', stagger: 10, duration: 400 });
    }

  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(this.grid, { easing : 'backOut', stagger: 10, duration: 400 });
  }

  render() {
    let classes = "grid";
    return (
      <div className={classes} ref={el => (this.grid = el)}>
        {[...Array(this.props.memos.length).keys()].map(i => <MemoCard memo={this.props.memos[i]} onDelete={this.props.onDelete} key={i} />)}
      </div>
    );
  }
}

export default Grid;