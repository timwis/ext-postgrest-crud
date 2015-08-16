Ext.define('Crud.controller.Spreadsheet', {
		extend: 'Ext.app.ViewController',
		alias: 'controller.spreadsheet',

    onAddColumn: function() {
      var grid = this.getView();
      Ext.Msg.prompt('Add Column', 'New column name:', function(btn, text) {
        if(btn === 'ok') {
					console.log(grid.getStore().getModel().prototype);
          grid.getStore().getModel().prototype.createField(text, 'text', function(response) {
            console.log('Success', response);
            grid.fieldsToColumns([{name: text}]);
          });
        }
      });
    },

    onAddRow: function(){
        // Create a model instance
				var rec = new (this.getView().getStore().model)({});

        this.getView().getStore().insert(0, rec);
        this.getView().findPlugin('cellediting').startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onRemoveRow: function(grid, rowIndex){
        console.log('onRemoveRow')
        this.getView().getStore().removeAt(rowIndex);
    },

		onHeaderMenuCreate: function(grid, menu, headerCt, eOpts) {
				// Rename column
        menu.insert(menu.items.indexOfKey('columnItem') + 1, {
            text: 'Rename Column',
            xtype: 'menuitem',
						handler: function() {
							this.onRenameColumn(menu.activeHeader.dataIndex);
						},
            scope: this
        });

				// Delte column
        menu.insert(menu.items.indexOfKey('columnItem') + 1, {
            text: 'Delete Column',
            xtype: 'menuitem',
						handler: function() {
							this.onDeleteColumn(menu.activeHeader.dataIndex);
						},
            scope: this
        });
    },

		onRenameColumn: function(column) {
				var grid = this.getView();
				Ext.Msg.prompt('Rename Column', 'Rename "' + column + '" to:', function(btn, text) {
					if(btn === 'ok') {
						console.log('renaming', column, 'to', text);
						grid.getStore().getModel().prototype.renameField(column, text, function(response) {
							console.log('Success', response);
							var columnComponent = grid.headerCt.getComponent(column);
							columnComponent.dataIndex = text;
							columnComponent.setConfig('text', text);
						})
					}
				});
		},

		onDeleteColumn: function(column) {
				var grid = this.getView();
				Ext.Msg.confirm('Delete Column?', 'Delete column "' + column + '"?', function(btn, text) {
						if(btn === 'yes') {
							console.log(grid.headerCt);
		          grid.getStore().getModel().prototype.dropField(column, function(response) {
		            console.log('Success', response);
		            grid.headerCt.remove(column);
		          });
						}
				});
		}
});
