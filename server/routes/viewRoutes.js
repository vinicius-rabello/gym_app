const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/exercises', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/exercises.html'));
});

router.get('/routines', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/routines.html'));
});

router.get('/routine/:created_by/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/routine.html'));
});

router.get('/create_routine', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/create_routine.html'));
});

module.exports = router;