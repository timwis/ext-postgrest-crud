Ext.define('Crud.model.Speaker', {
    extend: 'Jarvus.model.Postgrest',

    // the path will be used to load fields from the Postgrest server
    tableUrl: 'https://postgrest.herokuapp.com/speakers',
    path: '/speakers',
    fetchRemoteFields: true,
    
    // Create field
    createField: function(field, cb) {
      var self = this;
      console.log('Creating...')
      Jarvus.connection.Postgrest.request({
        method: 'POST',
        url: 'http://httpbin.org/post',
        jsonData: field,
        success: cb
      });
    }
});