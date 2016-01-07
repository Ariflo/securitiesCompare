exports.up = function(knex, Promise) {
    	return knex.schema.createTable('securities', function(table){
		table.increments(); //create id SERIAL PRIMARY KEY
		table.integer('client_id').references('id').inTable('clients');
		table.string('ticker');
		table.string('company');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('securities'); 
};
