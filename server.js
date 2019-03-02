const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const SerialPort = require('serialport');
const serialPort = new SerialPort('/dev/tty.usbmodem14101', {baudRate: 9600});

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// fake DB
const messages = [];

// socket.io server
let client;

io.on('connection', socket => {
  client = socket;
  console.log('>connected');
});

serialPort.on('data', ()=>{
  client.emit('message', 'sup');
});

nextApp.prepare().then(() => {

  app.get('/messages', (req, res) => {
    res.json(messages);
  });

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000');
  });
})
