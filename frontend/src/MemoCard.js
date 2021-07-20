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

  renderBadges() {
    var res = [];
    if(this.props.memo.badge1 !== "") {
      var classColor = "badge-" + this.props.memo.badgeColor1;
      res.push(<Badge key={1} className={classColor}>{this.props.memo.badge1}</Badge>);
    }
    if(this.props.memo.badge2 !== "") {
      var classColor = "badge-" + this.props.memo.badgeColor2;
      res.push(<Badge key={2} className={classColor}>{this.props.memo.badge2}</Badge>);
    }
    if(this.props.memo.badge3 !== "") {
      var classColor = "badge-" + this.props.memo.badgeColor3;
      res.push(<Badge key={3} className={classColor}>{this.props.memo.badge3}</Badge>);
    }
    if(this.props.memo.badge4 !== "") {
      var classColor = "badge-" + this.props.memo.badgeColor4;
      res.push(<Badge key={4} className={classColor}>{this.props.memo.badge4}</Badge>);
    }
    return res;
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
              {this.renderBadges()}
              <Scrollbars id="memo-card-scrollbar" hideTracksWhenNotNeeded autoHide autoHideTimeout={0}> <p className="memo-card-content"> {this.props.memo.content} </p> </Scrollbars>

            </div>
        </div>
    );
  }
}

export default MemoCard;
