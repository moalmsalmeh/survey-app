const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Server läuft');
});

app.listen(3000, ()=>{
    console.log(' Server läuft auf http://localhost:3000');
});