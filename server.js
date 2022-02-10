var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var path = require("path");
var cors = require("cors");
var router = require("./routes/route.js");
var authR = require("./routes/auth.js");

var app = express();
var http = require('http').Server(app);

const cookieParser = require("cookie-parser");
app.use(express.static(__dirname));


app.use(cookieParser());
app.use(express.json());
app.use(cors());
 
app.set("views", path.join(__dirname));
app.set("view engine", "ejs");
app.use(router);
app.use(authR);


//Declare MongoDB Schemas
var Message = mongoose.model('Message',{
    from_user: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date,
        // required: true
    }
  })

var dataUrl = 'mongodb+srv://Mina:Mina13@comp3123.2pj6o.mongodb.net/lab_test1?retryWrites=true&w=majority'

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{ 
    if(err)
    {
      //sendStatus(500);
      console.log(err)
    }

    //Send Message to all users
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})
app.use( function(req, res) {
    res.send("Welcome to chat app!");
});


const io = require("socket.io")(server);
io.on('connection',function (socket) {
console.log("New user connected");	

socket.username="xyz";

socket.on('change_username',function (data) {
socket.username = data.username;
});

socket.on('new_message',function (data) {
io.socket.emit('new_message', {
	message : data.message,
	username : socket.username
});
});
});


//formatting
function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format("h:mm a"),
    };
}


mongoose.connect(dataUrl , { useUnifiedTopology: true, useNewUrlParser: true ,useFindAndModify: false,useCreateIndex:true}, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

var server = http.listen(8082, () => {
  console.log('server is running on port', server.address().port);
});