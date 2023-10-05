const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
let koalas = [{
    id: 1,
    name: 'Scotty',
    gender: 'M',
    age: 4,
    readyToTransfer: 'Y',
    notes: 'Born in Guatemala'
},
{
    id: 2,
    name: 'BoBody',
    gender: 'F',
    age: 19,
    readyToTransfer: 'N',
    notes: 'Loves tacos'
},{
    id: 3,
    name: 'Ororo',
    gender: 'F',
    age: 7,
    readyToTransfer: 'N',
    notes: 'Loves listening to Pantera'
},
{   id: 4,
    name: 'Mr. Bubbles',
    gender: 'M',
    age: 68,
    readyToTransfer: 'Y',
    notes: 'Once met President Clinton, never shuts up about it'
},
{
    id: 5,
    name: 'Charlie',
    gender: 'M',
    age: 9,
    readyToTransfer: 'Y',
    notes: 'Bit my finger'
}
];

// GET
koalaRouter.get('/', (req,res) =>{
    console.log('GET request made for koalas');
    // response of [koalas]
    res.send(koalas);
})

// POST
koalaRouter.post(('/'), (req,res) =>{
    console.log(req.body);
    // send new object to [koalas]
    koalas.push(req.body);
    // send your status back to client
    res.sendStatus(201);
    console.log(koalas);
})

// PUT
koalaRouter.put('/:id', (req, res) => {
    let idx = koalas.findIndex(koala => koala.id == req.params.id);
    koalas[idx].readyToTransfer = 'Y';
    console.log(koalas);
    
    res.sendStatus(200);
});

// DELETE
koalaRouter.delete('/:id', (req,res) =>{
    koalas = koalas.filter(koala => koala.id != req.params.id);
    console.log(koalas);
    res.sendStatus(200);
});

module.exports = koalaRouter;