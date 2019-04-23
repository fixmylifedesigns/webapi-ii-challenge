const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('posts');
}

function findById(id) {
  return db('posts').where({ id: Number(id) });
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

// server.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, bio } = req.body;
//   if (!name || !bio) {
//     sendUserError(400, 'Must provide name and bio', res);
//     return;
//   }
//   db
//     .update(id, { name, bio })
//     .then(response => {
//       if (response == 0) {
//         sendUserError(
//           404,
//           'The user with the specified ID does not exist.',
//           res
//         );
//         return;
//       }
//       db
//         .findById(id)
//         .then(user => {
//           if (user.length === 0) {
//             sendUserError(404, 'User with that id not found', res);
//             return;
//           }
//           res.json(user);
//         })
//         .catch(error => {
//           sendUserError(500, 'Error looking up user', res);
//         });
//     })
//     .catch(error => {
//       sendUserError(500, 'Something bad happened in the database', res);
//       return;
//     });
// });