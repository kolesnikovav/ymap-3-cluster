import * as Vue from 'vue';

const [ymaps3Vue] = await Promise.all([ymaps3.import('@yandex/ymaps3-vuefy'),ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
    '@yandex/ymaps3-default-ui-theme@0.0',
    '@yandex/ymaps3-clusterer@0.0',
    '@yandex/ymaps3-hint@0.0.1'
]) ,ymaps3.ready]);

export const vuefy = ymaps3Vue.vuefy.bindTo(Vue);
export const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls, YMapControl, YMapListener, YMapEntity,  YMapFeature} = vuefy.module(ymaps3);
//@ts-ignore
export const {YMapPopupMarker, YMapDefaultMarker} = vuefy.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));
//@ts-ignore
export const {YMapClusterer, clusterByGrid} = vuefy.module(await ymaps3.import('@yandex/ymaps3-clusterer'));
//@ts-ignore
export type {Feature} from '@yandex/ymaps3-clusterer';