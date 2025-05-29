<template>
  <div style="width: 100vw; height: 100vh">
    <YMap :location="LOCATION" showScaleInCopyrights ref="ymapInstance">
      <YMapControls position="top right">
        <MapControlBtn></MapControlBtn>
      </YMapControls>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapClusterer :method="gridSizedMethod" :features="competitorsGeopoints" :marker = "makeMarker" :cluster = "makeCluster">
            <template #marker="{feature}">
              <Marker :feature="feature" />
            </template>        
            <template #cluster="{coordinates, features}">
              <Cluster :coordinates="coordinates" :features="features" />
            </template>        
      </YMapClusterer>
    </YMap>
  </div>
</template>

<script lang="ts" setup>

import {getRandomPoints} from './common';

import { type Feature, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapClusterer, clusterByGrid, YMapEntity } from '../src/lib/ymaps';

import type { LngLat, YMapLocationRequest } from 'ymaps3';

import { onMounted, ref, useTemplateRef} from 'vue';

const mapEl = useTemplateRef('ymapInstance');

const gridSizedMethod = clusterByGrid({gridSize: 64});

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9
};

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
