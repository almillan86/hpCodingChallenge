<template>
  <div id="app">
    <img class="titleImg" src="./assets/hp_music.png" />
    <SearchTool />    
    <h4> Tool designed by Alberto Millán </h4>
  </div>
</template>



<script>
import SearchTool from './components/SearchTool.vue'

export default {
  name: 'App',
  created()
  {
    document.title = "HP Music";
  },
  components: {
    SearchTool
  }
}
</script>

<style>
@import './assets/css/common.css'
</style>
