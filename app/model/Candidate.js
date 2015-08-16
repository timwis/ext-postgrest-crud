Ext.define('Crud.model.Candidate', {
    extend: 'Crud.model.Record',
    tableUrl: '/candidates',
    tableName: 'candidates',
    fetchRemoteFields: true
});
