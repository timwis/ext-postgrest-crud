/**
 * This view is an example list of people.
 */
Ext.define('Crud.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Crud.store.Speakers'
    ],

    title: 'Speakers',

    store: {
        type: 'speakers'
    },

    listeners: {
        boxready: function() {
            this.getStore().load();
            this.fieldsToColumns(this.store.getModel().getFields());
        }
    },
    
    fieldsToColumns: function(fields) {
      console.log(fields);
      var gridView = Ext.ComponentQuery.query("gridpanel")[0],
        position = gridView.columns.length;
      
      fields.forEach(function(field) {
        if(field.name) {
          var column = Ext.create('Ext.grid.column.Column', {
            text: field.name,
            dataIndex: field.name,
            editor: 'textfield'
          });
          gridView.headerCt.insert(position, column);
          gridView.getView().refresh();
          position++;
        }
      });
    },
    
    selModel: 'cellmodel',
    
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    }
});
