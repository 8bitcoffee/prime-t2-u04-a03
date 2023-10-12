const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js')

// GET
koalaRouter.get('/', (req,res) =>{
    console.log('GET request made for koalas');

    // koala database code 
    let queryText = `SELECT * FROM "koalas";`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET /koala success`);
            res.send(result.rows);
    }).catch((error) => {
        console.log(`error in GET /koala`);
        res.sendStatus(500);
    });

    // response of [koalas]
    // no need for the array anymore
    // res.send(koalas);
})

// POST
koalaRouter.post(('/'), (req,res) =>{
    console.log('/koalas POST req.body', req.body);
    let queryText = `
        INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
        VALUES ($1, $2, $3, $4, $5);
    `

    pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.readyToTransfer, req.body.notes])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error in POST /koalas', error);
        res.sendStatus(500);
    })
})

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log('PUT/koalas/:id', req.params.id);
    let queryText = `
        UPDATE "koalas" SET "ready_to_transfer" = TRUE 
        WHERE "id" = $1;
    `;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('PUT/koalas/:id', error);
            res.sendStatus(500);
        });
});

// DELETE
koalaRouter.delete('/:id', (req,res) =>{
    console.log(`DELETE koala`, req.params);

    // SQL database code
    let queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id])
            .then((result) => {
                console.log(`DELETE success`);
                res.sendStatus(200);
            }).catch((error) => {
                console.log(`Error in DELETE /koalas/:id`, error);
                res.sendStatus(500);
            });
});

module.exports = koalaRouter;