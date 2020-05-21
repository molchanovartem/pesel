<template>
  <div id="app">
    <AppHeader />
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  background: #1a191d;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: local('IBM Plex Sans'), local('IBM Plex Sans'),
  url('~@/assets/fonts/IBMPlexSans-Regular.ttf') ;
}

.container {
  padding: 60px;
}

div {
  font-family: IBM Plex Sans, serif;
  font-style: normal;
  font-weight: normal;
}

a {
  text-decoration: none;
}

.active span{
  color: #ffffff !important;
}
</style>
