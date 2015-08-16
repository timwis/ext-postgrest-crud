Ext.define('Crud.model.Speaker', {
    extend: 'Jarvus.model.Postgrest',

    tableUrl: '/candidates',
    fetchRemoteFields: true,

    /*fields: [
      {name: 'name', allowNull: false},
      {name: 'twitter'},
      {name: 'avatar_url', allowNull: false},
      {name: 'bio'},
      {name: 'featured', allowNull: false},
      {name: 'lineup_order'}
    ],*/

    /*validators: {
      name: 'presence',
      avatar_url: 'presence',
      featured: 'presence'
    },*/
    //validators: {name: "presence", avatar_url: "presence", featured: "presence"},

    // Create field
    createField: function(name, type, cb) {
      var self = this;
      console.log('Creating...')
      Jarvus.connection.Postgrest.request({
        method: 'POST',
        url: '/rpc/add_column',
        jsonData: {
          table_name: 'candidates',
          column_name: name,
          column_type: type
        },
        success: cb
      });
    }
});
