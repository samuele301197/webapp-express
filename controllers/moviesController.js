import connection from "../db.js";

const index = (req, res) => {
    const sql = "SELECT * FROM movies;";
    connection.query(sql, (err, results) => {
        if(err) {
            console.log(err);       
        } else {

            const movies = results.map(movie => {
                return {
                    ...movie,
                    image: 'http://localhost:3200/img/' + movie.image
                }
            });

            res.json({
                data: movies,
            });
        };
    });
};

const show = (req, res) => {
    const id = req.params.id;
    const movieSql =
    `select *
    from movies
    inner join reviews 
    on reviews.movie_id = movies.id 
    where movies.id = ?;`;

    connection.query(movieSql, [id], (err, results) => {
        if(err) {
            console.log(err);
        }

        if(results.length === 0) {
            res.status(404).json({
                error: "Movie non trovato",
            });
        } else {
            const movies = results.map(movie => {
                return {
                    ...movie,
                    image: 'http://localhost:3200/img/' + movie.image
                }
            });
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