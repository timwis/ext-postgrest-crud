Ext.define('Crud.model.Speaker', {
    extend: 'Jarvus.model.Postgrest',

    // the path will be used to load fields from the Postgrest server
    tableUrl: 'https://postgrest.herokuapp.com/speakers',
    path: '/speakers',
    //fetchRemoteFields: true,
    
    fields: [
      {name: 'name', allowNull: false},
      {name: 'twitter'},
      {name: 'avatar_url', allowNull: false},
      {name: 'bio'},
      {name: 'featured', allowNull: false},
      {name: 'lineup_order'}
    ],
    
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