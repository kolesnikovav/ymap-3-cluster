<template>
  <div style="width: 100vw; height: 100vh">
    <YMap :location="LOCATION" showScaleInCopyrights ref="ymapInstance">
      <YMapControls position="top right">
        <button @click="getIsolines">Toggle report</button>
      </YMapControls>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <!-- <YMapClusterer :method="gridSizedMethod" :features="competitorsGeopoints" :marker = "makeMarker" :cluster = "makeCluster">
            <template #marker="{feature}">
              <Marker :feature="feature" />
            </template>        
            <template #cluster="{coordinates, features}">
              <Cluster :coordinates="coordinates" :features="features" />
            </template>        
      </YMapClusterer> -->
      <YMapFeature
          :geometry="pcoords"
          :style="POLYGON_STYLE"
      />
      <Marker :feature="featurePolygonCenter" />     
    </YMap>
  </div>
</template>

<script lang="ts" setup>

import {getRandomPoints} from './common';

import { type Feature, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapClusterer, clusterByGrid, YMapEntity } from '../src/lib/ymaps';

import type { LngLat, YMapLocationRequest } from 'ymaps3';

import { onMounted, ref, useTemplateRef, computed} from 'vue';

const mapEl = useTemplateRef('ymapInstance');

const gridSizedMethod = clusterByGrid({gridSize: 64});

const LOCATION: YMapLocationRequest = {
  center: [37.32191, 55.695342],
  zoom: 9
};

const POLYGON_STYLE = {
    stroke: [
        {
            color: '#196DFF99',
            width: 3
        }
    ],
    fill: '#196DFF14'
};

const POLYGONS_COORDINATES = ref({"hull":{"geometry":{"type":"MultiPolygon","coordinates":[[[[37.475077,55.78792],[37.475333,55.788014],[37.475663,55.788129999999995],[37.476234,55.788352999999994],[37.477422,55.788211],[37.477453,55.788205999999995],[37.478527,55.788079999999994],[37.481305,55.78842399999999],[37.481846,55.78852499999999],[37.482023,55.788554999999995],[37.482200999999996,55.788588],[37.485454999999995,55.788934999999995],[37.485685999999994,55.788577999999994],[37.485724,55.78849199999999],[37.486014,55.78805199999999],[37.486211999999995,55.78656099999999],[37.486135,55.78641399999999],[37.485977999999996,55.78553399999999],[37.48582999999999,55.78542499999999],[37.485701999999996,55.78535899999999],[37.485569,55.78532099999999],[37.48274,55.784156999999986],[37.480806,55.782989999999984],[37.480797,55.78298199999998],[37.480784,55.78297999999998],[37.480766,55.78297999999998],[37.480739,55.78298199999998],[37.477909,55.78388799999998],[37.477689,55.784123999999984],[37.477436999999995,55.784356999999986],[37.477022,55.78463999999999],[37.476718999999996,55.78489599999999],[37.47628099999999,55.78526999999999],[37.47561399999999,55.78590599999999]]]]}}});


const pcoords = computed(() => POLYGONS_COORDINATES.value.hull.geometry);

const centerCoords = ref<LngLat>([37.32191, 55.695342]);

const featurePolygonCenter = ref({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: centerCoords.value
    },
    properties: {
        name: 'center'
    }
} as Feature);

const getIsolines = async () => {
  const url = `https://isoline.api.maps.yandex.ru/v1/walking?ll=${centerCoords.value[0]},${centerCoords.value[1]}&duration=300&apikey=${import.meta.env.VITE_API_KEY}&lang=ru_RU`;
  const response = await fetch(url);
  POLYGONS_COORDINATES.value = await response.json();
}

const competitorsGeopoints = ref([] as Feature[]);

 type YMapSomeEntityProps = {
  name?: string;
 };
 const defaultProps = {
  name: 'entity'
 };
 class YMapSomeEntity extends YMapEntity<YMapSomeEntityProps, typeof defaultProps> {
  static defaultProps = defaultProps;
  public isAttached: boolean;
  constructor(props: YMapSomeEntityProps) {
      super(props);
      this.isAttached = false
      // Additional actions can be taken in the constructor of a class.
  }
  protected _onAttach(): void {
      this.isAttached = true;
      // Additional actions can be taken when an Entity is attached.
  }
  // ...
 }

const makeMarker = (feature: Feature) => {
  return new YMapSomeEntity({
    name: feature.properties.name
  });
}

const makeCluster = (_coordinates: LngLat, feature: Feature) => {
  return new YMapSomeEntity({
    name: feature.properties.name
  });
}


onMounted(async () => {
  await ymaps3.ready;
  //@ts-ignore
  const b = mapEl.value?.entity?.bounds;
  const points = getRandomPoints(1000, b);
  competitorsGeopoints.value = points;
})
</script>
