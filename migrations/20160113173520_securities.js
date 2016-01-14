exports.up = function(knex, Promise) {
    	return knex.schema.createTable('securities', function(table){
		table.increments(); //create id SERIAL PRIMARY KEY
		table.integer('client_id').references('id').inTable('clients');
		table.integer('portfolio_id').references('id').inTable('portfolios');
		table.string('ticker');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('securities'); 
};
