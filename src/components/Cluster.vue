<template>
      <YMapMarker
        :coordinates="coordinates"
        :onClick="onClick"
      >
        <div class="circle">
          <div class="circle-content">
            <span class="circle-text">{{ features?.length }}</span>
          </div>
        </div>
      </YMapMarker>        
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Cluster',
    props: {
        coordinates: Array,
        features: Array,
        onClick: Function
    },    
});

</script>

<style lang="css" scoped>
.circle {
    position: absolute;

    width: 40px;
    height: 40px;

    color: var(--interact-action);
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
}

.circle:hover {
    color: #2e4ce5;
    cursor: pointer;
}

.circle-content {
    position: absolute;
    top: 50%;
    left: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 90%;
    height: 90%;

    border-radius: 50%;
    background-color: currentColor;

    transform: translate3d(-50%, -50%, 0);
}

.circle-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #fff;
}

</style>