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

    <!-- LoadingBlock -->
    <div id = "loadingBlock" v-if="result.loading">
      <h3>Loading...</h3>
      <img src="./../assets/loading.gif" />
    </div>

    <!-- ErrorBlock -->
    <div id = "errorBlock" v-if="result.error">
      <h3>Error when requesting info from iTunes</h3>
      <img src="./../assets/error.png" />
    </div>

    <!-- filterBlock -->
    <div id = "filterBlock" v-if="result.searchDone">

      <input type="text" id="filterInput" v-model="filterSearch" placeholder="Keyword to filter" /> 
      <button v-on:click="onReturnToSearchClick()">Return to Search</button>

    </div>

    <!-- resultsBlock -->
    <div id = "resultsBlock" v-if="result.searchDone">

      <h3 v-if="filteredAlbums.length == result.numberResults">Number of results: {{ result.numberResults }}</h3>
      <h3 v-else>Number of results: {{ filteredAlbums.length }} / {{ result.numberResults }}</h3>

      <div class="grid-container" v-if="(result.numberResults > 0)">
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
        loading: false,
        error: false,
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
    onReturnToSearchClick()
    {
      this.result.searchDone=false; 
      this.filterSearch=''; 
      this.posts.artistName='';
    },
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
      const POST_ADDRESS = "http://localhost:3000/request";
      this.result.error = false;
      this.result.loading = true;
      
      axios.post(POST_ADDRESS, this.posts)
        .then((result) => {
          this.result.numberResults = result.data.resultCount;
          this.clearAlbumData();
          for (let i = 0; i < result.data.resultCount; i++) {
            const albumData = {albumTitle: result.data.results[i].collectionName,
                               albumCover: result.data.results[i].artworkUrl100};
            this.storeAlbumEntry(albumData);
          }
        })
      .catch(() => {
        this.result.loading = false;
        this.result.error = true;
      })
      .finally(() => {
        this.result.loading = false;
        this.result.searchDone = !this.result.error;
      });
      e.preventDefault();
    }
  }
}
</script>

<style scoped>
@import './../assets/css/searchTool.css'
</style>
