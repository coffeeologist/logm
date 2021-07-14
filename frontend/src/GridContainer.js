import React, {Component} from 'react';
import { wrapGrid } from 'animate-css-grid'


class GridContainer extends Component {
  state = {
    "grid-gap": false,
    "grid-template-columns": false,
  };
  constructor () {
    super ();
  }

  render() {
    return (
      <div className="p-4">
        <a href="https://github.com/aholachek/animate-css-grid">
          animate-css-grid
        </a>
        <div className="mb-4 pt-4">
          {Object.keys(this.state).map(k => (
            <button
              className="btn"
              onClick={() => this.setState({ [k]: !this.state[k] })}
            >
              toggle <code>{k}</code>
            </button>
          ))}
        </div>
        <Grid settings={this.state} />
      </div>
    );
  }
}

export default GridContainer;
// ReactDOM.render(<GridContainer />, document.getElementById("main"));
