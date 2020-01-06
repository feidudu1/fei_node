import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {fromJS} from 'immutable';
import style from './index.less';


class SnowBall extends Component {
  static propTypes = {
  };

  componentDidMount () {
  }

  componentDidUpdate () {
  }

  render () {
    return (
      <div className="wrap_snowBall">
        hi
        <div className={style.com_wrap_snowBall} />
      </div>
    );
  }
}

export default SnowBall;
