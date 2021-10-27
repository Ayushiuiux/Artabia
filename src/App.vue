<template>
  <div id="app">
    <nav-bar/>

    <Spinner/>

    <div class=" md:px-16 xl:px-0">
      <router-view/>
    </div>
    <footer-bar/>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Spinner from '@/components/Spinner'
import FooterBar from '@/components/FooterBar'
import mixin from "./mixin/mixin";


export default {
  components: {
    NavBar, FooterBar, Spinner
  },
  data() {
    return {
      refreshTokenInterval: null
    }
  },
  methods: {},

  mixins: [ mixin ]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

html, body {
  font-family: 'Roboto', sans-serif;
}

</style>
