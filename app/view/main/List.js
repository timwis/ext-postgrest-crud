/**
 * This view is an example list of people.
 */
Ext.define('Crud.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    controller: 'spreadsheet',

    requires: [
        'Crud.store.Records',
        'Crud.controller.Spreadsheet',
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard'
    ],

    title: 'Spreadsheet',

    /*store: {
        type: 'records'
    },*/

    selModel: {
      type: 'spreadsheet',
      columnSelect: true,
      rowSelect: true
    },

    plugins: [
      'clipboard',
      {
        ptype: 'cellediting',
        clicksToEdit: 2
      }
    ],

    viewConfig: {
      columnLines: true
    },

    listeners: {
        boxready: function() {
            var self = this;
            this.getStore().load({
              callback: function(records, operation, success) {
                self.fieldsToColumns(self.store.getModel().getFields());
              }
            });
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
        },
        headermenucreate: 'onHeaderMenuCreate'
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
            id: field.name,
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

    // Dispatch named listener and handler methods to this instance
    //defaultListenerScope: true,

    tbar: [{
        text: 'Add Row',
        tooltip: 'Add a new row',
        handler: 'onAddRow'
    }, {
        text: 'Add Column',
        tooltip: 'Add a new column',
        handler: 'onAddColumn'
    }]
});
