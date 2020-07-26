const express = require("express");
const app = express();


const port = 8000;

app.get("/", (req, res)=> {
    return res.send("Hello World!")
});
app.get("/sign-out", (req, res)=> {
    return res.send("Hello User!")
});
app.get("/sign-up", (req, res)=> {
    return res.send("Hello New User!")
});
const admin = (req, res)=> {
    return res.send("I'm admin");
}
const isAdmin = (req, res, next)=> {
    console.log("I'm middleware");
    next();
}
app.get("/admin", isAdmin, admin);
app.listen(port, ()=> {
    console.log("It's running..")
});