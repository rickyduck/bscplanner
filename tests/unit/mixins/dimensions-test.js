import Ember from 'ember';
import DimensionsMixin from 'editor-ember/mixins/dimensions';

module('DimensionsMixin');

// Replace this with your real tests.
test('it works', function() {
  var DimensionsObject = Ember.Object.extend(DimensionsMixin);
  var subject = DimensionsObject.create();
  ok(subject);
});
