var server = require('mysql');
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//CORS Errors Handler
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = server.createPool({
    connectionLimit: 500,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'heroes'
});


//Get Method

app.get('/users/foods', function (req, resp) {
    connection.getConnection(function (error, tempCon) {
        if (!!error) {
            tempCon.release();
            console.log("Error");
        } else {
            tempCon.query(" SELECT * FROM heroes ", function (error, rows, fields) {
                tempCon.release();
                if (!!error) {
                    console.log("Error in the query");
                } else {
                    resp.json(rows);
                    console.log(rows);
                }
            })
        }
    })
});


//Post Method

app.post('/users/food', function (req, resp) {

    const obj = {
        hero_name: req.body.hero_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        favorite_food: req.body.favorite_food
    }


    connection.getConnection(function (error, tempCon) {
        const sql = `INSERT INTO heroes SET ?`;

        if (!!error) {
            tempCon.release();
            console.log("Error");
        } else {

            var query = tempCon.query(sql, obj, function (error, rows, fields) {
                if (!!error) {
                    console.log(error);
                } else {
                    resp.json(rows);
                    console.log(rows);
                }
            });
            console.log(query.sql);
        }
    })
})


app.listen(3001)