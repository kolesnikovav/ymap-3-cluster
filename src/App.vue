<template>
  <div style="width: 100vw; height: 100vh">
    <YMap :location="LOCATION" showScaleInCopyrights ref="ymapInstance">
      <YMapControls position="top right">
        <MapControlBtn></MapControlBtn>
      </YMapControls>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <!-- @vue-ignore -->
      <YMapClusterer :method="gridSizedMethod" :features="competitorsGeopoints">
        <!-- <template #marker="{ feature }">
          <Marker :feature="feature" />
        </template>
        <template #cluster="{ coordinates, features }">
          <Cluster :onClick="() => onClusterClick(features)" :coordinates="coordinates" :features="features" />
        </template> -->
      </YMapClusterer>

      <!-- <YMapMarker v-for="competitor in competitorsGeopoints" :key="competitor.id" :coordinates="competitor.coordinates"
        :draggable="true" @click="handleMarkerClick">
        <div class="cursor-pointer" style="margin-top: -33px; margin-left: -12px;">
          <img src="../assets/map-marker-red.svg" width=25 height=33>
        </div>
      </YMapMarker> -->
      <YMapPopupMarker v-if="popup" :coordinates="popupCoordinates" position="top left">
        <template #content>
          <MapPopup v-model="editedCompetitor" @popup-close="closePopup" @popup-save="saveGeopoint"></MapPopup>
        </template>
      </YMapPopupMarker>
    </YMap>
  </div>
</template>

<script lang="ts" setup>

import type { DomEvent } from '@yandex/ymaps3-types';

import { type Feature, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, YMapListener, YMapPopupMarker, YMapClusterer, clusterByGrid } from '../src/lib/ymaps';
import MarkerPoint from '../components/MarkerPoint.vue';

import type { YMapLocationRequest } from 'ymaps3';
import { onMounted, ref, useTemplateRef } from 'vue';
import type { Competitor } from '../types';
import { competitorStatusToNumber} from '../utils';

const mapEl = useTemplateRef('ymapInstance');

const gridSizedMethod = clusterByGrid({gridSize: 64});



const currentBounds = ref({
  sw_lat: 0,
  sw_lng: 0,
  ne_lat: 0,
  ne_lng: 0
})

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9
};

type CompetitorData = {
  id: number;
  name: string;
  address: string;
  city: string;
  coordinates: [number, number];
}

const editedCompetitor = ref({} as Competitor);

const competitorsGeopoints = ref([] as Feature[]);

const popup = ref(false);
const popupCoordinates = ref([0, 0]);

const handleMarkerClick = async (object: unknown, event: DomEvent) => {
  event.stopPropagation();
  console.log({ object, event });
};

const closePopup = () => {
  popup.value = false;
}


const getGeopoints = async () => {
}

onMounted(async () => {
  await ymaps3.ready;
  //@ts-ignore
  const b = mapEl.value?.entity?.bounds;
  console.log(b);
  if (b) {
    const lngAdd = (b[1][0] - b[0][0]) / 2;
    const latAdd = (b[0][1] - b[1][1]) / 2;
    currentBounds.value.sw_lat = b[1][1] - latAdd;
    currentBounds.value.sw_lng = b[0][0] - lngAdd;
    currentBounds.value.ne_lat = b[0][1] + latAdd;
    currentBounds.value.ne_lng = b[1][0] + lngAdd;
    await getGeopoints();
  }
})
</script>
