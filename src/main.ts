import { createApp } from 'vue';

import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, YMapPopupMarker} from '../src/lib/ymaps';

import App from './App.vue';

(async () => {
    const app = createApp(App);
    app.component('YMap', YMap);
    app.component('YMapDefaultSchemeLayer', YMapDefaultSchemeLayer);
    app.component('YMapDefaultFeaturesLayer', YMapDefaultFeaturesLayer);
    app.component('YMapControls', YMapControls);
    app.component('YMapMarker', YMapMarker);
    app.component('YMapPopupMarker', YMapPopupMarker);
    app.mount('#app');    
})();

