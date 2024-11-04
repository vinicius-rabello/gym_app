const express = require('express');
const path = require('path');
const viewRoutes = require("./routes/viewRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const routineRoutes = require("./routes/routineRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', viewRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/routines', routineRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});