<template>
    <div class="header">
      <div>
        <router-link to="/" class="logo">
          <img alt="logo" src="../assets/logo.png">
        </router-link>
      </div>

      <div class="featured">
        <router-link to="/featured" :active-class="'active'">
          <div class="featured-wrapper">
            <span>Избранные пёсели</span> <div class="heart-icon"></div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
  .featured-wrapper {
    display: flex;
    align-items: center;
  }

  .active .heart-icon{
    background: url(../assets/heart-small.svg) no-repeat;
  }

  .heart-icon {
    width: 16px;
    height: 14px;
    background-size: cover;
    background: url(../assets/heart-gray.svg) no-repeat;
  }

.header {
  display: flex;
  justify-content: space-between;
  background: #151419;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.55);
  height: 100px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 60px;
}

.featured {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px;

  span {
    color: #626262;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.01em;
    margin-right: 10px;
  }
}
</style>
