
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'roger', password: 'roger'},
        {id: 2, username: 'raj', password: 'raj'}
        
      ]);
    });
};
