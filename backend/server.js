const express = require('express');
const app = express();

app.get('/api/users', (req, res)=>{
    const users = [
        {id: 1, name: 'Abdullah'}
    ];
    res.json(users);
})

const port = 3001;
app.listen(port, ()=>console.log(`Server started on port ${port}`))