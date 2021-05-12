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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.titleImg {
  max-width: 100%;
  height: auto;
}

h3 {
  margin: 5px 5px 5px 5px;
  font-family: Arial, Helvetica, sans-serif;
}

h4 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
</style>
