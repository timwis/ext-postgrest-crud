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
            var self = this;
            this.getStore().load({
              callback: function(records, operation, success) {
                self.fieldsToColumns(self.store.getModel().getFields());
              }
            });
        }
    },
    
    fieldsToColumns: function(fields) {
      var gridView = Ext.ComponentQuery.query("gridpanel")[0],
        position = gridView.columns.length;
      
      fields.forEach(function(field) {
        if(field.name) {
          var fieldXType = 'textfield';
          switch(field.type) {
            case 'integer':
              fieldXType = 'numberfield'; break;
          }
          var column = Ext.create('Ext.grid.column.Column', {
            text: field.name,
            dataIndex: field.name,
            editor: fieldXType,
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
    },
    
    // Dispatch named listener and handler methods to this instance
    defaultListenerScope: true,
    
    tbar: [{
        text: 'Add Column',
        tooltip: 'Add a new column',
        handler: 'onAddColumn'
    }],
    
    onAddColumn: function() {
      console.log('adding column')
      this.fieldsToColumns([{name: 'new_column'}])
    }
});
