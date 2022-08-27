// import bodyParser from "body-parser";
import express, { response } from "express";
// import { request } from "http";
import dbOperation from "./dbOperation";
import Server from "../model/Server";
import ServerType from "../model/ServerType";
import cors from 'cors';


// initialize middleware
const app = express();
app.use(express.json());
app.use(cors());
var urlencodedParser = express.urlencoded({ extended: false });

// var jsonParser = bodyParser.json();


//get all data from database (servers and server types)

app.get('/', (req, res) => {
    try {
        dbOperation.getAllData().then(resp => {
            // console.log(resp)
            return res.send(resp);
        });
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})


//get server by id


app.get('/:id', (req, res) => {
    try {
        var id = req.params.id;
        dbOperation.getServerById(id).then(resp => {
            return res.send(resp);
        });
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})

//create server in database

app.post('/', urlencodedParser, (req, res) => {
    try {
        var query = req.body;
        console.log(query)
        let server: Server = new Server(query.ipAdress, query.name, query.typeId);
        dbOperation.AddServer(server).then(resp => {
            return res.sendStatus(200);
        });

    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})

//create type in database


app.post('/type', urlencodedParser, (req, res) => {
    try {
        var query = req.body;
        console.log(query)
        let type: ServerType = new ServerType(query.type_name, parseInt(query.rate));
        dbOperation.AddType(type).then(resp => {
            return res.sendStatus(200);
        });

    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
})


//patch starttime on server

app.patch('/startTime/:id', (req, res) => {
    try {
        var id = req.params.id;
        dbOperation.addStartTime(id).then(resp => {
            return res.sendStatus(200);
        });
    } catch (err) {
        console.log(err);
    }
});

//patch endTime on server


app.patch('/endTime/:id', (req, res) => {
    try {
        var id = req.params.id;
        dbOperation.addEndTime(id).then(resp => {
            console.log(resp);
            return res.sendStatus(200);
        });
    } catch (err) {
        console.log(err);
    }
});


app.delete('/:id', (req, res) => {
    try {
        var id = req.params.id;
        let obj = Server;
        dbOperation.deleteServer(id, obj).then(() => {
            return res.sendStatus(200);
        });
    } catch (error) {
        res.sendStatus(404);
        console.log(error);
    }

})

//delete server by id

app.delete('/type/:id', (req, res) => {
    try {
        var id = req.params.id;
        let obj = ServerType;
        dbOperation.deleteServer(id, obj).then(() => {
            return res.sendStatus(200);
        });
    } catch (error) {
        res.sendStatus(404);
        console.log(error);
    }

})

//expose port 4321

app.listen(4321, () => {
    console.log('PORT 4321');
})
