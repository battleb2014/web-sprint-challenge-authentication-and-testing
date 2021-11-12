const db = require('../../data/dbConfig');

module.exports = {
    findAll,
    findById,
    findByUser,
    create
}

function findAll() {
    return db('users')
}

function findById(id) {
    return db('users').where('id', id).first()
}

function findByUser(username) {
    return db('users').where('username', username)
}

async function create(user) {
    const userId = await db('users').insert(user);
    return findById(userId);
}