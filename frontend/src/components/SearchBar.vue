<template>
  <div class="SearchBar">
    <h1> Look for a singer/band </h1>
    <form @submit="postData" method="post">
      <label for="artistName">Name of the artist/band: </label>
      <input type="text" id="artistName" size="50" v-model="posts.artistName" placeholder= "Artist or Band name" />
      <button type="submit">Search</button>
    </form>
    <h3>Number of results: {{ result.numberResults }}</h3>


    <table class="table text-center" align="center">
      <thead>
        <tr>
          <th>Album</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="albumItem in result.albumData" :key="albumItem.id">
          <td v-text="albumItem.albumTitle"></td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchBar',
  props: {
    msg: String
  },
  data(){
    return {
      posts:{
        artistName: null
      },
      result:{
        numberResults: null,
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
            var albumData = {albumTitle: result.data.results[i].collectionName};
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
