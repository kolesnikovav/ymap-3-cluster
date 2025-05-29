<template>
    <YMapDefaultMarker iconName="landmark" :coordinates="props.feature.geometry?.coordinates" />
</template>

<script setup lang="ts">
import type { Feature } from "ymaps3";
import { YMapDefaultMarker } from "../lib/ymaps";

const props = defineProps<{
    feature: Feature
}>();


</script>