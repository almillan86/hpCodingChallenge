<template>
  <div class="SearchTool">
    <form @submit="postData" method="post">
      <label for="artistName">Name of the artist/band: </label>
      <input type="text" id="artistName" size="50" v-model="posts.artistName" placeholder= "Artist or Band name" />
      <button type="submit">Search</button>
    </form>
    <h3 :style="{visibility: result.numberResults ? 'visible' : 'hidden'}">Number of results: {{ result.numberResults }}</h3>

    <div class="grid-container" :style="{visibility: result.numberResults ? 'visible' : 'hidden'}">
      <div class="grid-item" v-for="albumItem in result.albumData" :key="albumItem.id">
        <table class="table-center">
          <tbody>
            <tr><img  class="center" v-bind:src="albumItem.albumCover" v-bind:alt="albumItem.albumTitle" /></tr>
            <tr v-text="albumItem.albumTitle"></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchTool',
  props: {
    msg: String
  },
  data(){
    return {
      posts:{
        artistName: null
      },
      result:{
        numberResults: 0,
        albumData: []
      }
    }
  },
  methods:{
    storeAlbumEntry(albumItem)
    {
      this.result.albumData.push(albumItem);
    },
    clearAlbumData()
    {
      this.result.albumData = [];
    },
    postData(e)
    {
      axios.post("http://localhost:3000/request", this.posts)
        .then((result) => {
          console.log(result);
          this.result.numberResults = result.data.resultCount;
          this.clearAlbumData();
          for (var i = 0; i < result.data.resultCount; i++) {
            var albumData = {albumTitle: result.data.results[i].collectionName,
                             albumCover: result.data.results[i].artworkUrl100};
            this.storeAlbumEntry(albumData);
          }

        });
      e.preventDefault();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  align: center;
}

img{
  align: center;
}

.SearchTool{
  margin: 10px 10px 10px 10px;
}

.table-center {
  margin-left: auto;
  margin-right: auto;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 1);
  border: 0px solid rgb(0, 0, 0, 1);
  padding: 10px;
  font-size: 12px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  margin: 5px 5px 5px 5px;
  width: 1fr;
}
</style>
