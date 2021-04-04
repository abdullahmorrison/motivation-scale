const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/api/scales', (req, res)=>{
    const scales = [
            {
                id: 1, 
                title: 'Coding the PGP Scale', 
                sliderValue: 50, 
                explanation: '',
                futurePlan: ''
            }
    ];
    res.json(scales);
})

const port = 3001;
app.listen(port, ()=>console.log(`Server started on port ${port}`))