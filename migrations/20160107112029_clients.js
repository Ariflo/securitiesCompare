
exports.up = function(knex, Promise) {
    	return knex.schema.createTable('clients', function(table){
		table.increments(); //create id SERIAL PRIMARY KEY
		table.string('name');
		table.string('company');
		table.string('email');
		table.string('address');
		table.integer('phone');
		table.string('password');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('clients'); 
};
