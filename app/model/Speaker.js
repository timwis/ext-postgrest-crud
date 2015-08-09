Ext.define('Crud.model.Speaker', {
    extend: 'Jarvus.model.Postgrest',

    // the path will be used to load fields from the Postgrest server
    tableUrl: '/speakers',
    path: '/speakers',
    fetchRemoteFields: true
});