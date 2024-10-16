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
    const objects = await client.db('heartDiseaseDB').collection('heart').find({}).toArray();
    await client.close();
    res.status(200).send(objects);
});

app.post('/slist/create', async (req, res) => {
    const object = req.body;
    console.log("Received object:", object);
    
    const client = new MongoClient(uri);
    await client.connect();
    
    await client.db('heartDiseaseDB').collection('heart').insertOne({
        "Age": object['Age'],
        "Sex": object['Sex'],
        "Chest pain type": object['Chest pain type'],
        "BP": object['BP'],
        "Cholesterol": object['Cholesterol'],
        "FBS over 120": object['FBS over 120'],
        "EKG results": object['EKG results'],
        "Max HR": object['Max HR'],
        "Exercise angina": object['Exercise angina'],
        "ST depression": object['ST depression'],
        "Slope of ST": object['Slope of ST'],
        "Number of vessels fluro": object['Number of vessels fluro'],
        "Thallium": object['Thallium'],
        "Heart Disease": object['Heart Disease']
    });

    await client.close();

    res.status(200).send({
        "status": "ok",
        "message": "Heart disease data is created",
        "object": object['Age']
    });
});

app.get('/slist/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const object = await client.db('heartDiseaseDB').collection('heart').findOne({ "_id": new ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "ID": id,
        "Complaint": object
    });
})

app.put('/slist/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                'status': "error",
                'message': "Invalid ID format"
            });
        }

        const result = await client.db('heartDiseaseDB').collection('heart').updateOne(
            { '_id': new ObjectId(id) },
            {
                "$set": {
                    "Age": object['Age'],
                    "Sex": object['Sex'],
                    "Chest pain type": object['Chest pain type'],
                    "BP": object['BP'],
                    "Cholesterol": object['Cholesterol'],
                    "FBS over 120": object['FBS over 120'],
                    "EKG results": object['EKG results'],
                    "Max HR": object['Max HR'],
                    "Exercise angina": object['Exercise angina'],
                    "ST depression": object['ST depression'],
                    "Slope of ST": object['Slope of ST'],
                    "Number of vessels fluro": object['Number of vessels fluro'],
                    "Thallium": object['Thallium'],
                    "Heart Disease": object['Heart Disease']
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({
                'status': "error",
                'message': "Object not found"
            });
        }

        res.status(200).send({
            'status': "ok",
            'message': "Object with ID " + id + " is updated.",
            'object': object
        });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send({
            'status': "error",
            'message': "An error occurred while updating the document"
        });
    } finally {
        await client.close();
    }
});

// เพิ่มฟังก์ชัน delete
app.delete('/slist/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                'status': "error",
                'message': "Invalid ID format"
            });
        }

        const result = await client.db('heartDiseaseDB').collection('heart').deleteOne({ "_id": new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                'status': "error",
                'message': "Object not found"
            });
        }

        res.status(200).send({
            "status": "ok",
            "message": "Object with ID " + id + " is deleted."
        });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).send({
            'status': "error",
            'message': "An error occurred while deleting the document"
        });
    } finally {
        await client.close();
    }
});

app.get('/slist/field/:query', async (req, res) => {
    const query = req.params.query;
    const [field, value] = query.split(':');
    
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('heartDiseaseDB').collection('heart');

        let searchQuery = {};
        if (field && value) {
            // ถ้ามีการระบุฟิลด์และค่า
            searchQuery[field] = { $regex: value, $options: "i" };
        } else {
            // ถ้าไม่มีการระบุฟิลด์ ค้นหาในทุกฟิลด์
            searchQuery = {
                $or: [
                    { "Age": { $regex: query, $options: "i" } },
                    { "Sex": { $regex: query, $options: "i" } },
                    { "Chest pain type": { $regex: query, $options: "i" } },
                    { "BP": { $regex: query, $options: "i" } },
                    { "Cholesterol": { $regex: query, $options: "i" } },
                    { "FBS over 120": { $regex: query, $options: "i" } },
                    { "EKG results": { $regex: query, $options: "i" } },
                    { "Max HR": { $regex: query, $options: "i" } },
                    { "Exercise angina": { $regex: query, $options: "i" } },
                    { "ST depression": { $regex: query, $options: "i" } },
                    { "Slope of ST": { $regex: query, $options: "i" } },
                    { "Number of vessels fluro": { $regex: query, $options: "i" } },
                    { "Thallium": { $regex: query, $options: "i" } },
                    { "Heart Disease": { $regex: query, $options: "i" } }
                ]
            };
        }

        const objects = await collection.find(searchQuery).toArray();

        res.status(200).json({
            status: "ok",
            message: `Search results for "${query}"`,
            Complaint: objects
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while searching for data"
        });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})