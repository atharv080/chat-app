// const { Socket } = require('socket.io');

//  node server for handling Socket.io connections
const io=require('socket.io')(8000, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
  },
});
const users={};
io.on('connection', Socket =>{
    Socket.on('new-user-joined',name=>{
        // console.log("new-user",name);
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined',name); 
    });
    Socket.on('send',message=>{
        Socket.broadcast.emit('recive',{message:message,name: users[Socket.id]})
    });
    Socket.on('disconnect',message=>{
      Socket.broadcast.emit('left',users[Socket.id]);
      delete users[socket.id];
  });
});