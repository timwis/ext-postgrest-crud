/*Ext.define('Crud.overrides.PostgrestConnection', {
	override: 'Jarvus.connection.Postgrest'
}, function(PostgrestConnection) {
    var pageParams = Ext.Object.fromQueryString(location.search);

	// Configure connection while it's being required so that it's ready to go for any classes that require it
    if (pageParams.postgrestHost) {
        PostgrestConnection.setHost(pageParams.postgrestHost);
    } else {
        PostgrestConnection.setConfig('useSSL', true);
        PostgrestConnection.setHost('postgrest.herokuapp.com');
        //PostgrestConnection.setPathPrefix('/spark2/postgrest');
    }
});*/