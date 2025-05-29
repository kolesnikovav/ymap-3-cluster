<template>
      <YMapMarker
        :coordinates="feature?.geometry?.coordinates"
      >
        <div class="circle-red">
        </div>
      </YMapMarker>        
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Marker',
    props: {
        feature: Object,
    },    
});

</script>

<style lang="css" scoped>
.circle-red {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
</style>
