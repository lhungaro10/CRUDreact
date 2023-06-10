const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { response } = require("express");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crudreact"
});

app.use(cors());
app.use(express.json());


app.post("/register", (req, res) => {
    const { gName } = req.body;//mesmo que declarar const gName = req.body.gName
    const { gCost } = req.body;
    const { gCategory } = req.body;

    let SQL = "INSERT INTO games (gName, gCost, gCategory) VALUES (?, ?, ?)";

    db.query(SQL, [gName, gCost, gCategory], (err, result) => {
        (err)?console.log(err) : res.send(result);
    });
});

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * FROM games";

    db.query(SQL, (err, result) => {
        (err) ? console.log(err) : res.send(result);
    })
});

app.put("/edit", (req, res) =>{
    const {id} = req.body;
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;

    let SQL = "UPDATE games SET gName = ?, gCost = ?, gCategory = ? WHERE id = ?";

    db.query(SQL, [name, cost, category, id], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
    
})

app.delete("/delete/:id", (req, res)=>{
    const {id} = req.params;
    let SQL = "DELETE FROM games WHERE id = ?";
    db.query(SQL, [id], (err, result)=>{
        (err)?console.log(err):res.send(result);
    })
})

app.listen(3001, () => {
    console.log("rodando servidor")
})