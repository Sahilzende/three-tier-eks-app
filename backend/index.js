const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgrespw',
  database: process.env.POSTGRES_DB || 'testdb',
  port: 5432
});

app.get('/api/hello', async (req,res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() as now');
    res.json({ msg: `Hello from backend — db time ${rows[0].now}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`backend listening ${port}`));
