const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hi Bukhoree !!!')
})

const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';


app.get('/slist', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('heartDiseaseDB').collection('heart').find({}).sort({_id:-1}).toArray();
    await client.close();
    res.status(200).send(objects);

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})