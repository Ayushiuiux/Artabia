<template>
  <div>
    <figure>
      <img v-if="isExt === 'img'" class="w-full object-scale-down" :src="src" alt="name">
    </figure>


    <figure v-if="isExt === 'audio'" class="bg-audio w-full bg-cover flex items-end justify-center  pb-3" style="padding-top: 280px">
      <audio controls>
        <source :src="src" type="audio/ogg">
      </audio>
    </figure>


    <figure v-if="isExt === 'model3d'" >
      <model-gltf  :src="src" ></model-gltf>
    </figure>

    <video v-if="isExt === 'video'" class="w-full " controls>
      <source :src="src" >
    </video>
  </div>
</template>

<script>

import {ModelGltf } from '/src/assets/plugin/vue-model';

export default {
  name: "Media",
  props: {
    src: String,
  },

  data() {
    return {
      extensions: {
        img: [ 'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp' ],
        audio: [ 'mp3', 'mpga'],
        video: [ 'mp4', 'web', 'wav', 'ogg' ],
        model3d: [ 'glb', 'gltf' ]
      }
    }
  },

  computed: {
    isExt() {

      let ext = this.src.split('.').pop()


      for (const property in this.extensions) {
        this.extensions[property].includes(ext) ? ext = property : ''
      }

      return ext;

    }
  },


  components: {
    ModelGltf,


  },


}
</script>

<style scoped>

</style>
