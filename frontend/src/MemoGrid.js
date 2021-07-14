import MemoCard from './MemoCard'
import { wrapGrid, unwrapGrid } from 'animate-css-grid';
import React, {Component} from 'react';

class Grid extends Component {

    // constructor() {
    //     super();
    // }

    wrapGrid() {
        wrapGrid(this.grid, { easing : 'backOut', stagger: 10, duration: 400 });
    }

  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(this.grid, { easing : 'backOut', stagger: 10, duration: 400 });
  }

  render() {
    let classes = "grid";
    console.log(this.props.memos.length);
    return (
      <div className={classes} ref={el => (this.grid = el)}>
        {[...Array(this.props.memos.length).keys()].map(i => <MemoCard memo={this.props.memos[i]} key={i} />)}
      </div>
    );
  }
}

export default Grid;