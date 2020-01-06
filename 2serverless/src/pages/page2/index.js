import {connect} from 'dva';
import {
  Component,
} from 'react';

import style from './index.less';
const ws = new WebSocket('ws://127.0.0.1:3000/websocket')

class S2 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clientNum: ''
    };
  }

  componentDidMount () {
    this.initWs()
  }
  initWs () {
    // const ws = new WebSocket('ws://127.0.0.1:3000/websocket')
    ws.onopen = (e) => {
      console.log('连接成功', e);
    }
    ws.onmessage = (e) => {
      this.setState({serverNum: e.data})
      console.log('client接收到信息', e);
    }
  }

  componentWillUnmount () {
  }
  click () {
    const num = Math.random()
    this.setState({clientNum: num})
    ws.send(`client发送信息${num}`)
  }

  render () {
    const {clientNum, serverNum} = this.state;
    return (
      <div className={style.main} onClick={() => this.click()}>
        <div>client发送信息：{clientNum}</div>
        <div>server发送信息：{serverNum}</div>
      </div>
    )
  }
}

 export default S2;
// export default connect(mapStateToProps)(S1);
//  export default withRouter(connect(mapStateToProps)(S4));
