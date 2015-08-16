/**
 * This view is an example list of people.
 */
Ext.define('Crud.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    //controller: 'grid',

    requires: [
        'Crud.store.Speakers'
    ],

    columns: [
      {xtype: 'rownumberer'}
    ],

    columnLines: true,

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
            console.log(this.getStore().getModel().validators);
        },
        itemcontextmenu: function(view, record, item, index, e, eOpts) {
            console.log('right-clicked');
            var self = this;
            Ext.create('Ext.menu.Menu', {
                items: [{
                    text: 'Delete row',
                    handler: function() {
                        self.getStore().removeAt(index)
                    }
                }]
            }).showAt(e.getXY());
            e.stopEvent();
        }
    },

    fieldsToColumns: function(fields) {
      var self = this;

      fields.forEach(function(field) {
        if( ! field.identifier) {
          var fieldXType = 'textfield';
          switch(field.type) {
            case 'integer':
              fieldXType = 'numberfield'; break;
          }
          var column = {
            text: field.name,
            dataIndex: field.name,
            editor: {
              xtype: fieldXType,
              allowBlank: field.nullable
            },
            flex: 1
          };
          self.headerCt.add(column);
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
        text: 'Add Row',
        tooltip: 'Add a new row',
        handler: 'onAddRow'
    }, {
        text: 'Add Column',
        tooltip: 'Add a new column',
        handler: 'onAddColumn'
    }],

    onAddColumn: function() {
      var self = this;
      Ext.Msg.prompt('Add Column', 'New column name:', function(btn, text) {
        if(btn === 'ok') {
          self.getStore().getModel().prototype.createField(text, 'text', function(response) {
            console.log('Success', response);
            self.fieldsToColumns([{name: text}]);
          });
        }
      });
    },

    onAddRow: function(){
        // Create a model instance
        var rec = new Crud.model.Speaker({});

        this.getStore().insert(0, rec);
        this.findPlugin('cellediting').startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onRemoveRow: function(grid, rowIndex){
        console.log('onRemoveRow')
        this.getStore().removeAt(rowIndex);
    }
});
