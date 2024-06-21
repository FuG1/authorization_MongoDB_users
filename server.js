const express = require('express');
const bodyParser = require('body-parser');
const initializeDB = require('./database');
const app = express();

let db, usersCollection, clientsCollection;

initializeDB().then(database => {
    db = database;
    usersCollection = db.collection('users');
    clientsCollection = db.collection('clients');
    console.log('Database initialized');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Форма авторизации
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
    if (!usersCollection) {
        return res.status(500).send('Database not initialized');
    }

    const { login, password } = req.query;

    try {
        const user = await usersCollection.findOne({ login, password });
        if (user) {
            res.send(encodeURIComponent(user.full_name));
        } else {
            res.send('Неверный логин или пароль');
        }
    } catch (err) {
        res.status(500).send('Ошибка запроса к базе данных');
    }
})



// Отправка HTML страницы клиентов
app.get('/clients', (req, res) => {
    res.sendFile(__dirname + '/public/clients.html');
});

// Получение клиентов ответственного пользователя
app.get('/api/clients', async (req, res) => {
    if (!clientsCollection) {
        return res.status(500).send('Database not initialized');
    }

    const responsible = req.query.responsible;
    try {
        const clients = await clientsCollection.find({ responsible_person: responsible }).toArray();
        res.json(clients);
    } catch (err) {
        res.status(500).send('Ошибка при получении данных');
    }
});



// Изменение статуса клиента
app.post('/update-status', async (req, res) => {
    const { account_number, status } = req.body;
    try {
        await clientsCollection.updateOne({ account_number: account_number }, { $set: { status: status } });
        res.send('Статус обновлен');
    } catch (err) {
        res.status(500).send('Ошибка при обновлении статуса');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
