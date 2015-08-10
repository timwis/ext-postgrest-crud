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
      var self = this;
      
      fields.forEach(function(field) {
        if(field.name) {
          var fieldXType = 'textfield';
          switch(field.type) {
            case 'integer':
              fieldXType = 'numberfield'; break;
          }
          var column = {
            text: field.name,
            dataIndex: field.name,
            editor: fieldXType,
          };
          self.headerCt.insert(self.columns.length, Ext.create('Ext.grid.column.Column', column));
          self.columns.push(column);
          self.getView().refresh();
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
      var self = this;
      Ext.Msg.prompt('Add Column', 'New column name:', function(btn, text) {
        if(btn === 'ok') {
          self.fieldsToColumns([{name: text}])
        }
      });
    }
});
