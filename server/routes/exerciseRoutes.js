const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post('/get_exercise_by_id', async (req, res) => {
    try {
        const { id } = req.body;
        const query = "SELECT * FROM exercises WHERE id = $1";
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'id not found'})
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('error searching the id: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_exercises_by_ids', async (req, res) => {
    try {
        const { ids } = req.body;
        const query = "SELECT * FROM exercises WHERE id = ANY($1::int[])";
        const result = await pool.query(query, [ids]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'id not found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching the id: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_exercise_by_group', async (req, res) => {
    try {
        const { muscle_group } = req.body;
        const query = `SELECT * FROM exercises WHERE muscle_group LIKE $1`;
        const result = await pool.query(query, [ muscle_group ]);

        if (result.rows.length === 0) {
            return res.status(400).json({message: 'group not found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching the id: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_all_groups', async (req, res) => {
    try {
        const query = "SELECT DISTINCT(muscle_group) FROM exercises";
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('error searching muscle groups: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/get_all_exercises', async (req, res) => {
    try {
        const query = "SELECT * FROM exercises";
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('error searching exercises: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

router.post('/search_exercise', async (req, res) => {
    try {
        const { value } = req.body;
        console.log(value)
        const query = `SELECT * FROM exercises WHERE name ILIKE $1`;
        const result = await pool.query(query, [`%${value}%`]);
        if (result.rows.length === 0) {
            return res.status(400).json({message: 'no such exercise found'})
        }

        res.json(result.rows);
    } catch (err) {
        console.error('error searching: ', err);
        res.status(500).json({message: 'server internal error'});
    }
});

module.exports = router;