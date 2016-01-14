exports.up = function(knex, Promise) {
    	return knex.schema.createTable('portfolios', function(table){
		table.increments(); //create id SERIAL PRIMARY KEY
		table.integer('client_id').references('id').inTable('clients');
		table.string('portfolio_name');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('portfolios'); 
};
