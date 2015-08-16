/*Ext.define('Crud.overrides.Postgrest', {
	override: 'Jarvus.model.Postgrest'
}, function(Postgrest) {
	console.log('overriding', Postgrest)
  // Create field
  Postgrest.statics = {
		createField: function(name, type, cb) {
	    var self = this;
	    console.log('Creating...')
	    Jarvus.connection.Postgrest.request({
	      method: 'POST',
	      url: '/rpc/add_column',
	      jsonData: {
	        table_name: self.tableName,
	        column_name: name,
	        column_type: type
	      },
	      success: cb
	    });
	  },

	  // Drop field
	  dropField: function(name, cb) {
	    var self = this;
	    console.log('Dropping...')
	    Jarvus.connection.Postgrest.request({
	      method: 'POST',
	      url: '/rpc/drop_column',
	      jsonData: {
	        table_name: self.tableName,
	        column_name: name
	      },
	      success: cb
	    });
	  },

	  // Rename field
	  renameField: function(old_name, new_name, cb) {
	    var self = this;
	    console.log('Renaming...')
	    Jarvus.connection.Postgrest.request({
	      method: 'POST',
	      url: '/rpc/rename_column',
	      jsonData: {
	        table_name: self.tableName,
	        old_column_name: old_name,
	        new_column_name: new_name
	      },
	      success: cb
	    });
	  }
	}
});*/
