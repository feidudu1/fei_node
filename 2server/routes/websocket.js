var express = require('express');
var router = express.Router();
const expressWs = require('express-ws')
expressWs(router);

router.ws('/', function(ws, req) {
  ws.send('websocket连接成功')
  ws.on('message', msg => {
    console.log('server接收到信息：' + msg);
    ws.send('server接收到信息：' + msg)
  })
  let interval
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(2))
    } else {
      clearInterval(interval)
    }
  }, 1000);
});

module.exports = router;
