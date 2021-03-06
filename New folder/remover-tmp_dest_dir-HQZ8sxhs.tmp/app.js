import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from
'./config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix : config.modulePrefix,
    podModulePrefix : config.podModulePrefix,
    Resolver : Resolver,
    initialize : function() {
        var that = this;
        app.deferReadiness();
        app.store.find("categories").then(function() {
            app.advanceReadiness();
        });
    }
});

loadInitializers(App, config.modulePrefix);
window.App = App;

export default App;
