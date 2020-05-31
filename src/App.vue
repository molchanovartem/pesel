<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      return this.$route.meta.layout || 'default-layout'
    }
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
  padding: 40px 60px 60px 60px;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
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
