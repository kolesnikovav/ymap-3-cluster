import { createApp } from 'vue';

import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, YMapPopupMarker, YMapDefaultMarker,  YMapFeature} from '../src/lib/ymaps';

import App from './App.vue';
import Marker  from './components/Marker.vue';
import Cluster  from './components/Cluster.vue';

(async () => {
    const app = createApp(App);
    app.component('YMap', YMap);
    app.component('YMapDefaultSchemeLayer', YMapDefaultSchemeLayer);
    app.component('YMapDefaultFeaturesLayer', YMapDefaultFeaturesLayer);
    app.component('YMapControls', YMapControls);
    app.component('YMapMarker', YMapMarker);
    app.component('YMapPopupMarker', YMapPopupMarker);
    app.component('YMapDefaultMarker', YMapDefaultMarker);
    app.component('YMapFeature', YMapFeature);
    app.component('Marker', Marker);
    app.component('Cluster', Cluster);
    app.mount('#app');    
})();

