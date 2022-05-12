import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMap from '../../helpers/create-map';

module('Integration | Component | maplibre gl popup', function (hooks) {
  setupRenderingTest(hooks);
  setupMap(hooks);

  test('it renders', async function (assert) {
    assert.expect(0);

    await render(hbs`{{maplibre-gl-popup map=map MaplibreGl=MaplibreGl}}`);
  });

  test('popup events can be subscribed to from the template', async function (assert) {
    this.onClose = () => {
      assert.step('onClose');
    };

    await render(hbs`
      {{#maplibre-gl-popup map=map MaplibreGl=MaplibreGl as |popup|}}
        {{popup.on 'close' onClose}}
      {{/maplibre-gl-popup}}
    `);

    // popups close when the map is clicked
    this.map.fire('click');

    assert.verifySteps(['onClose']);
  });
});