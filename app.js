import express from "express";
import moviesRouter from "./routes/movies.js";
import connection from "./db.js";
import cors from "cors";


const app = express();
const port = process.env.SERVER_PORT;

app.use(cors ({
    origin: process.env.FE_URL,
})
);


app.use('/img', express.static('public/img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        data: "Benvenuto in Movies API"
    });
});

app.use("/movies", moviesRouter);

app.listen(port, () => {
    console.log( `App in ascolto nella porta ${port}`);   
});

