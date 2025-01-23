import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";
import { error } from "console";

const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: "*"
}))

app.use(express.json({ limit: '100mb' }));

const connection = mysql.createConnection({
    host: "db4free.net",
    user: "vcentry",
    password: "test@123",
    database: "travelix",
    port: 3306
});

connection.connect((error) => {
    if(error){
        throw error;
    }
    else{
        console.log("Mysql Connection Success");
    }
})

// url-http://localhost:4000/api/add/destination

// payload{
//     name:""
//     image:""
//     count:""
// }

app.post("/api/add/destination",(request,response)=> {
   const incomingValue = request.body;

   const sqlQuery = `INSERT INTO sks_destination (name,image,count,location) VALUES ('${incomingValue.name}','${incomingValue.image}','${incomingValue.count}','${incomingValue.location}')`;

   connection.query(sqlQuery,(error,result) => {
    if(error){
        response.status(500).send("please contact Admin");
    }
    else{
        response.status(200).send("Destination has been added");
    }
   })
})


app.get("/api/desttination/load",(request,response) => {
    const sqlQuery =`SELECT * FROM sks_destination`;

    connection.query(sqlQuery,(error,result) => {
        if(error) {
            response.status(500).send("Please Conatact Admin");
        }
        else{
            response.status(200).send(result);
        }
    })
})

app.delete("/api/destination/delete/:id",(request,response) => {
    const id = request.params.id;
    const sqlQuery =`DELETE FROM sks_destination WHERE id=${id}`;

    connection.query(sqlQuery,(error,result) => {
        if(error){
            response.status(500).send("Please Contact Admin");
        }
        else{
            response.status(200).send("Destination has been Deleted");
        }
       })
})


app.post("/api/add/hotels",(request,response)=> {
    const incomingValue = request.body;
    const actualPrice = parseInt(incomingValue.price);
 
    const sqlQuery = `INSERT INTO sks_hotels (name,location,price,image,destination) VALUES ('${incomingValue.name}','${incomingValue.location}','${actualPrice}','${incomingValue.image}','${incomingValue.destination}')`;
 
    connection.query(sqlQuery,(error,result) => {
     if(error){
         response.status(500).send("please contact Admin");
     }
     else{
         response.status(200).send("Hotel has been added");
     }
    })
 })


 app.get("/api/hotel/load",(request,response) => {
    const sqlQuery =`SELECT * FROM sks_hotels`;

    connection.query(sqlQuery,(error,result) => {
        if(error) {
            response.status(500).send("Please Conatact Admin");
        }
        else{
            response.status(200).send(result);
        }
    })
})

app.delete("/api/hotel/delete/:id",(request,response) => {
    const id = request.params.id;
    const sqlQuery =`DELETE FROM sks_hotels WHERE id=${id}`;

    connection.query(sqlQuery,(error,result) => {
        if(error){
            response.status(500).send("Please Contact Admin");
        }
        else{
            response.status(200).send("Destination has been Deleted");
        }
       })
})



const port = 4000;
server.listen(port, () => {
    console.log("Node JS is running on port 4000");
})
