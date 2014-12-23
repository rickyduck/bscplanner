import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('category', 'Category', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject({
    parent_id: "1",
    name: "Floor Cupboards",
    is_active: true,
    position: "2",
    level: "1",
    id: "3",
    categories: [ ]
  });


  // var store = this.store();
  ok(!!model);
  ok(model instanceof DS.Model);
});
