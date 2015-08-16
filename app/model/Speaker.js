Ext.define('Crud.model.Speaker', {
    extend: 'Crud.model.Record',
    tableUrl: '/speakers',
    tableName: 'speakers',
    fetchRemoteFields: true
});
