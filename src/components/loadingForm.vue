<!-- eslint-disable -->
<template>
  <div id="viewPort">
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="24px"
        height="30px"
        viewBox="0 0 14 30"
        style="enable-background:new 0 0 50 50;"
        xml:space="preserve"
      >
      <rect x="0" y="0" width="4" height="20" fill="#333">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="7" y="0" width="4" height="20" fill="#333">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="14" y="0" width="4" height="20" fill="#333">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>    
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingForm",
});
</script>

<style lang="scss">
#viewPort {
  margin: 10px 0;
}
</style>
