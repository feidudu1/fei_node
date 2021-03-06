import {connect} from 'dva';
import V1 from './components/V1';

import {
  Component,
} from 'react';

import style from './index.less';

class S1 extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
    // console.log(111, V1);

  }

  componentWillUnmount () {
  }

  render () {
    const {
      usersData
    } = this.props;
    return (
      <div className={style.main}>
        获取后端users的接口返回：{usersData}
        <V1 />
      </div>
    )
  }
}

function mapStateToProps (state) {
  // console.log(555, state.s1.usersData);
  const {
    usersData
  } = state.s1
  return {
    usersData
  };
}

//  export default S1;
export default connect(mapStateToProps)(S1);
//  export default withRouter(connect(mapStateToProps)(S4));
