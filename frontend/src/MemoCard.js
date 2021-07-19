import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { format } from 'date-fns';
import Badge from 'react-bootstrap/Badge'

class MemoCard extends Component {

  constructor(props) {
      super();
      this.state = {expanded: false};
      this.randomNumber = Math.floor(Math.random() * 5) + 1;
      this.props = props;
  }

  removeCard() {
    this.props.onDelete(this.props.memo.time);
  }

  render() {
    var d = new Date(parseInt(this.props.memo.time));
    var formattedDate = format(d, "MMM do, yyyy • H:mma");

    return (
        <div
            className={`memo-card memo-card--${this.randomNumber} ${
            this.state.expanded ? "memo-card--expanded" : ""
            }`}
            onClick={() => {
            this.setState({ expanded: !this.state.expanded });
            }}
            id={`${this.props.memo.time}`}
        >
            <div>
              <p className="memo-card-time-stamp"> {formattedDate} </p>
              <i className="fa fa-times memo-card-remove-button" onClick={() => this.removeCard()}/>
              <h4 className="memo-card-title"> {this.props.memo.title} </h4>
              <Badge className="badge-medium-green">Badge1</Badge> 
              <Badge className="badge-light-peach">Badge2</Badge> 
              <Scrollbars id="memo-card-scrollbar" hideTracksWhenNotNeeded autoHide autoHideTimeout={0}> <p className="memo-card-content"> {this.props.memo.content} </p> </Scrollbars>

            </div>
        </div>
    );
  }
}

export default MemoCard;
