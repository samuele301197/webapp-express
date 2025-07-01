import connection from "../db.js";

const index = (req, res) => {
    const sql = "SELECT * FROM movies;";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Errore nella query dei film:", err);
            return res.status(500).json({ error: "Errore nel recupero dei film" });
        }

        const movies = results.map(movie => ({
            ...movie,
            image: movie.image
                ? 'http://localhost:3200/img/' + movie.image
                : null,
        }));

        res.json({ data: movies });
    });
};

const show = (req, res, next) => {
    const id = req.params.id;

    const movieSql = `
        SELECT movies.*, ROUND(AVG(reviews.vote), 2) AS vote_avg
        FROM movies
        LEFT JOIN reviews ON movies.id = reviews.movie_id
        WHERE movies.id = ?
        GROUP BY movies.id;
    `;

    const reviewsSql = `
        SELECT * FROM reviews WHERE reviews.movie_id = ?;
    `;

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) {
            console.error("Errore nella query del film:", err);
            return res.status(500).json({ error: "Errore nel recupero del film" });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }

        const movieData = movieResults[0];

        connection.query(reviewsSql, [movieData.id], (err, reviewsResult) => {
            if (err) {
                console.error("Errore nella query delle recensioni:", err);
                return res.status(500).json({ error: "Errore nel recupero delle recensioni" });
            }

            res.json({
                data: {
                    ...movieData,
                    image: movieData.image
                        ? 'http://localhost:3200/img/' + movieData.image
                        : null,
                    reviews: reviewsResult,
                },
            });
        });
    });
};

const storeReview = (req, res, next) => {
    const { id } = req.params;

    const movieSql =  `SELECT * FROM movies WHERE id = ?;`;

    connection.query(movieSql, [id], (err, movieResults) => {
        if (movieResults.length === 0) {
            return res.status(404).json({
                error: "Film non trovato",
            });
        }

    const { name, vote, text } = req.body;
    console.log(req.body);
    

    const newReviewSql =  ` INSERT INTO reviews ( movie_id, name, vote, text)
     VALUES ( ?, ?, ?, ?);`;
     
     connection.query(newReviewSql, [id, name, vote, text],
        (err, results) => {
            if (err) {
                return next(new Error(err));
            }
            return res.status(201).json({
                message: "Review creata",
                id: results.insertId,
            });
        });
    });
};

export default {
    index,
    show,
    storeReview,
};
