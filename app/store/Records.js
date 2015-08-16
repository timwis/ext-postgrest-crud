Ext.define('Crud.store.Records', {
    extend: 'Ext.data.Store',

    //model: 'Crud.model.Candidate',
    alias: 'store.records',

    pageSize: 100,

    remoteSort: true,

    sorters: [{
        property: 'id',
        direction: 'desc'
    }],

    remoteFilter: true,

    autoSync: true
});
