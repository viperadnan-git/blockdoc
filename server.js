const express = require('express');
const cors = require('cors');
const db = require('./app/database');

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0';

app.use(require('./app/routes'));

db.sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(port, host, () => {
        console.log(`Server running on port ${port}`);
    }
    );
});