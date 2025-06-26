import express from "express";
import moviesRouter from "./routes/movies.js";
import connection from "./db.js";
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        data: "Benvenuto in Movies API"
    });
});

app.use("/movies", moviesRouter);

app.listen(port, () => {
    console.log( `App in ascolto nella porta ${port}`);   
});

