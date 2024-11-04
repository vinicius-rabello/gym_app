const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post('/insert_exercise_into_routine', async (req, res) => {
    try {
        const { id, created_by, name, exercise_id, n_sets, n_reps } = req.body;
        const query = "INSERT INTO routines (id, created_by, name, exercise_id, n_sets, n_reps)\
                       VALUES ($1, $2, $3, $4, $5, $6)"
        await pool.query(query, [id, created_by, name, exercise_id, n_sets, n_reps]);
        res.send('exercise inserted successfuly');
    } catch (err) {
        console.error('error inserting the exercise into the routine: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_routine_by_id', async (req, res) => {
    try {
        const { id } = req.body;
        const query = "SELECT * FROM routines WHERE id = $1";
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'id not found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching the id: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_routine_by_id_with_exercise_name', async (req, res) => {
    try {
        const { id } = req.body;
        const query = "SELECT A.created_by, A.name AS routine_name, B.name, A.n_sets, A.n_reps FROM Routines A \
                        LEFT JOIN exercises B ON A.exercise_id = B.id WHERE A.id = $1;";
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'id not found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching the id: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_routines_by_user', async (req, res) => {
    try {
        const { created_by } = req.body;
        const query = "SELECT DISTINCT id, name, created_by FROM routines WHERE created_by = $1";
        const result = await pool.query(query, [ created_by ]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'creator not found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching the routines created by user: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_max_routine_id', async (req, res) => {
    try {
        const query = "SELECT MAX(id) AS max_id FROM routines;"
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'no routines found'})
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('error searching routines: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

module.exports = router;