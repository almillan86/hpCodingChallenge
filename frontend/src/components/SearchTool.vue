<template>
  <div class="SearchTool">

    <!-- searchBlock -->
    <div id = "searchBlock" v-if="!result.searchDone" >

      <form @submit="postData" method="post">
        <input type="text" id="artistNameInput" v-model="posts.artistName" placeholder= "Artist or Band name to search" />
        <button type="submit">Search</button>
        <br/>
      </form>

    </div>

    <!-- filterBlock -->
    <div id = "filterBlock" v-if="result.searchDone">

      <input type="text" id="filterInput" v-model="filterSearch" placeholder="Keyword to filter" /> 
      <button v-on:click="result.searchDone=false; filterSearch=''; posts.artistName=''">Return to Search</button>

    </div>

    <!-- resultsBlock -->
    <div id = "resultsBlock" v-if="result.searchDone">

      <h3 v-if="filteredAlbums.length == result.numberResults">Number of results: {{ result.numberResults }}</h3>
      <h3 v-else>Number of results: {{ filteredAlbums.length }} / {{ result.numberResults }}</h3>

      <div class="grid-container" :style="{visibility: result.numberResults ? 'visible' : 'hidden'}">
        <div class="grid-item" v-for="albumItem in filteredAlbums" :key="albumItem.id">
          <table class="table-center">
            <tbody>
              <tr><img class="center" v-bind:src="albumItem.albumCover" v-bind:alt="albumItem.albumTitle" /></tr>
              <tr v-text="albumItem.albumTitle"></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchTool',
  data(){
    return {
      posts:{
        artistName: null
      },
      result:{
        searchDone: false,
        numberResults: 0,
        albumData: []
      },
      filterSearch: ''
    }
  },
  computed:
    {
      filteredAlbums: function(){
        return this.result.albumData.filter((albumItem) => {
          return albumItem.albumTitle.toLowerCase().match(this.filterSearch)
        });
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
      const POST_ADDRESS = "http://localhost:3000/request"
      axios.post(POST_ADDRESS, this.posts)
        .then((result) => {
          this.result.searchDone = true;
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

input[type=text] {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 8px;
  box-sizing: border-box;
  border: none;
  background-color: lightsteelblue;
  color: black;
  font-size: 14px;
}

button {
  width:10%;
  background-color: royalblue;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
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
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-variant: small-caps;
  font-size: 12px;
  text-align: center;
  margin: 5px 5px 5px 5px;
  width: 1fr;
}
</style>
