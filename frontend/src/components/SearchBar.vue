<template>
  <div class="SearchBar">
    <h1> Look for a singer/band </h1>
    <form @submit="postData" method="post">
      <label for="artistName">Name of the artist/band: </label>
      <input type="text" id="artistName" size="50" v-model="posts.artistName" placeholder= "Artist or Band name" />
      <button type="submit">Search</button>
    </form>
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
      }
    }
  },
  methods:{
    postData(e)
    {
      axios.post("http://localhost:3000/request", this.posts)
        .then((result) => {
          console.log(result);
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
