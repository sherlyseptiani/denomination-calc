<template>
  <div id="app">
      <app-header/>
      <app-home/>
  </div>
</template>

<script>
import Header from './components/Header'
import Home from './components/Home'


export default {
  components: {
    appHeader: Header,
    appHome: Home
  }  
}
</script>

<style scoped>
  #app {
    background-image: url("./assets/bg.png");
    background-position: center;
    min-height:100%;
    background-size: cover;
  }

</style>



