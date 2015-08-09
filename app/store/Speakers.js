Ext.define('Crud.store.Speakers', {
    extend: 'Ext.data.Store',

    model: 'Crud.model.Speaker',
    alias: 'store.speakers',

    pageSize: 100,

    remoteSort: true,

    sorters: [{
        property: 'id',
        direction: 'desc'
    }],

    remoteFilter: true,

    autoSync: true
});