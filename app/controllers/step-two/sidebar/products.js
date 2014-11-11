import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['step-two/sidebar', 'editor'],
    actions: {
        selectProduct: function(product){
            this.get('controllers.editor').send('loadProductSVGFromURL',product.get("svg.plan"));

        }
    }
});
