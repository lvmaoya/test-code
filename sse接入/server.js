const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
    
    // 每秒发送一次消息
    setInterval(() => {
      res.write(`data: ${JSON.stringify({time: new Date()})}\n\n`);
    }, 1000);
  }
}).listen(3000);