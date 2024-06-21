
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'clientDB';

const client = new MongoClient(url, { useUnifiedTopology: true });

async function initializeDB() {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const clientsCollection = db.collection('clients');

    await usersCollection.deleteMany({});
    await clientsCollection.deleteMany({});

    const users = [
        { full_name: 'Сидор Сидорович Сидоров', login: 'sidorov', password: 'password789' },
        { full_name: 'Петр Петрович Петров', login: 'petrov', password: 'password456' },
        { full_name: 'Иван Иванович Иванов', login: 'ivanov', password: 'password123' }
        

    ];

    const clients = [
        {
            account_number: 1,
            last_name: 'Петров',
            first_name: 'Петр',
            middle_name: 'Петрович',
            birth_date: '1980-01-01',
            inn: '123456789012',
            responsible_person: 'Иван Иванович Иванов',
            status: 'Не в работе'
        },
        {
            account_number: 2,
            last_name: 'Смирнов',
            first_name: 'Сергей',
            middle_name: 'Сергеевич',
            birth_date: '1985-02-15',
            inn: '234567890123',
            responsible_person: 'Иван Иванович Иванов',
            status: 'В работе'
        },
        {
            account_number: 3,
            last_name: 'Кузнецов',
            first_name: 'Алексей',
            middle_name: 'Алексеевич',
            birth_date: '1990-03-20',
            inn: '345678901234',
            responsible_person: 'Петр Петрович Петров',
            status: 'Отказ'
        },
        {
            account_number: 4,
            last_name: 'Новиков',
            first_name: 'Николай',
            middle_name: 'Николаевич',
            birth_date: '1975-04-25',
            inn: '456789012345',
            responsible_person: 'Петр Петрович Петров',
            status: 'Сделка закрыта'
        },
        {
            account_number: 5,
            last_name: 'Федоров',
            first_name: 'Федор',
            middle_name: 'Федорович',
            birth_date: '1983-05-30',
            inn: '567890123456',
            responsible_person: 'Сидор Сидорович Сидоров',
            status: 'Не в работе'
        },
        {
            account_number: 6,
            last_name: 'Михайлов',
            first_name: 'Михаил',
            middle_name: 'Михайлович',
            birth_date: '1995-06-10',
            inn: '678901234567',
            responsible_person: 'Сидор Сидорович Сидоров',
            status: 'В работе'
        },
        { account_number: 7,
         last_name: 'Новиков',
         first_name: 'Андрей',
         middle_name: 'Андреевич',
         birth_date: '1982-07-15',
         inn: '789012345678',
         responsible_person: 'Иван Иванович Иванов',
         status: 'Не в работе' },
         { account_number: 8,
             last_name: 'Борисов',
             first_name: 'Борис', 
             middle_name: 'Борисович', 
             birth_date: '1987-08-20', inn: '890123456789', 
             responsible_person: 'Петр Петрович Петров', 
             status: 'В работе' },
        { account_number: 9,
             last_name: 'Григорьев', 
             first_name: 'Григорий', 
             middle_name: 'Григорьевич', 
             birth_date: '1992-09-25', 
             inn: '901234567890', 
             responsible_person: 'Петр Петрович Петров', 
             status: 'Отказ' },
        { account_number: 10,
             last_name: 'Сергеев', 
             first_name: 'Сергей', 
             middle_name: 'Сергеевич', 
             birth_date: '1981-10-30', 
             inn: '012345678901', 
             responsible_person: 'Петр Петрович Петров', 
             status: 'Сделка закрыта' },
        { account_number: 11,
             last_name: 'Романов', 
             first_name: 'Роман', 
             middle_name: 'Романович', 
             birth_date: '1989-11-05', 
             inn: '123450987654', 
             responsible_person: 'Сидор Сидорович Сидоров', 
             status: 'Не в работе' },
        { account_number: 12,
             last_name: 'Егоров', 
             first_name: 'Егор', 
             middle_name: 'Егорович', 
             birth_date: '1994-12-10', 
             inn: '234567890876', 
             responsible_person: 'Сидор Сидорович Сидоров', 
             status: 'В работе' },
        { account_number: 13,
             last_name: 'Лебедев',
              first_name: 'Александр', 
              middle_name: 'Александрович', 
              birth_date: '1983-11-15', 
              inn: '345678901987', 
              responsible_person: 'Сидор Сидорович Сидоров', 
              status: 'Отказ' },
        { account_number: 14,
             last_name: 'Макаров', 
             first_name: 'Максим', 
             middle_name: 'Максимович', 
             birth_date: '1990-05-20', 
             inn: '456789012398', 
             responsible_person: 'Сидор Сидорович Сидоров', 
             status: 'Сделка закрыта' },
        { account_number: 15,
             last_name: 'Морозов', 
             first_name: 'Дмитрий', 
             middle_name: 'Дмитриевич', 
             birth_date: '1986-06-25', 
             inn: '567890123509', 
             responsible_person: 'Сидор Сидорович Сидоров', 
             status: 'Не в работе' },
    ];

    await usersCollection.insertMany(users);
    await clientsCollection.insertMany(clients);

    return db;
}

module.exports = initializeDB;