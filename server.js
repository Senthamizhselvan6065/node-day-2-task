const express = require("express");
const server = express();
const port = 7000;

const data = [
    {
        id: "1",
        roomId: 146,
        customerName: "Tamizh",
        roomName: "Duplex",
        date: "05-feb-2022",
        startTime: "10:00:am",
        endTime: "11:30:pm",
        numberOfSeats: 100,
        amenities: ["Ac", "Discolights"],
        price: 5000,
        ifBooked: true
    },
    {
        id: "2",
        roomId: 16,
        customerName: "",
        roomName: "Duplex",
        date: "",
        startTime: "",
        endTime: "",
        numberOfSeats: 100,
        amenities: ["Ac", "Discolights"],
        price: 15000,
        ifBooked: false
    }
];


server.use(express.json())

/* Get All Hall Detais */
server.get("/", (req, res)=>{
    const hall = [...data]
    if(hall){
        res.status(201).send({
            success: true,
            message: "Get All Hall Details Successfully...",
            count: data.length,
            data
        })
    }else{
        res.status(400).send({
            success: false,
            message: "Can not find the Hall Details..."
        })
    }
})

/* Get Hall Detais Booked */
server.get("/hall-booked", (req, res)=>{
    if(req.query){
        const {ifBooked} = req.query;
        let filterHall = data;
        if(filterHall){
            filterHall = filterHall.filter((halls)=>halls.ifBooked)
        }
        res.status(201).send({
            success: true,
            filterHall
        })
    }else{
        res.status(400).send({
            success: false,
            message: "Can not find the Booked Hall Details..."
        })
    }
})


/* Get Hall Details By Id */
server.get("/hall/details/:id", (req, res)=>{
    const {id} = req.params;
    if(id){
       let specificHall = data.find((halls)=>halls.id === id)
       if(specificHall){
           res.status(201).send({
              success: true,
              message: "Get a Hall Details...",
              specificHall
           })
       }else{
           res.status(400).send({
              success: false,
              message: "Can not find the Hall Details..."
           })
       }
    }
})


/* Post Hall Details */
server.post("/booking", (req, res)=>{
    if(req.body){
        const newHallDetails = {
            id: data.length + 1,
            roomId: req.body.roomId,
            customerName: req.body.customerName,
            roomName: req.body.roomName,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            numberOfSeats: req.body.numberOfSeats,
            amenities: req.body.amenities,
            price: req.body.price
        }
         data.push(newHallDetails)
        res.status(201).send({
            success: true,
            message: "Created Hall Details Successfully...",
            data
         })
    }else{
        res.status(400).send({
            success: false,
            message: "Des not created Hall Details..."
         })
    }
})

/* Update Hall Details */
server.put("/hall/details/:id", (req, res)=>{
    const {id} = req.params;
    const halls = data.find((halls)=>halls.id === id)
    if(halls.ifBooked === "true"){
         return res.status(400).json({
            success: false,
            message: "Hey the Hall is already booked..."
         })
    }else{
        halls.date = req.body.date;
        halls.startTime = req.body.startTime;
        halls.endTime = req.body.endTime;
        halls.customerName = req.body.customerName;
        halls.ifBooked = "true";
        return res.status(201).json({
            success: true,
            message: "Update the Hall Details Successfully...",
            halls
        })
    }
})

server.listen(port, ()=>console.log(`server start with localhost:${port}`))