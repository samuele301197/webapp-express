import connection from "../db.js";

const index = (req, res) => {
    const sql = "SELECT * FROM movies;";
    connection.query(sql, (err, results) => {
        if(err) {
            console.log(err);       
        } else {
            res.json({
            data: results,
            });
        };
    });
};

const show = (req, res) => {
    const id = req.params.id;
    const movieSql = "SELECT * FROM movies WHERE id = ?;";

    connection.query(movieSql, [id], (err, results) => {
        if(err) {
            console.log(err);
        }

        if(results.length === 0) {
            res.status(404).json({
                error: "Movie non trovato",
            });
        } else {
            res.json({
            data: {
                ...results[0],
            },
            });
        }
    });
};

export default {
    index,
    show,
};