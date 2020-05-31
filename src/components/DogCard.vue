<template>
  <div class="dog-card">
    <img :src="img" class="image" alt="img">
    <div @click.prevent="toFeature()" class="shape-icon" :class="{'full-heart': isFeatured}">
    </div>
    <div class="breed-name">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'DogCard',
  props: {
    img: {
      type: String,
      require: true
    },
    label: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      backgroundImg: {
        backgroundImage: `url(${this.img})`
      }
    }
  },
  computed: {
    isFeatured () {
      return this.$store.getters['dog/isFeatured'](this.img)
    }
  },
  methods: {
    toFeature () {
      this.$store.dispatch('dog/TOGGLE_FEATURE_DOG', { img: this.img, breed: this.label })
    }
  }
}
</script>

<style scoped>
  .image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 8px;
  }
.dog-item:first-child .dog-card {
  width: 100%;
  height: 513px;
  background-position: center center;
}

.dog-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  height: 290px;
  cursor: pointer;
  margin-bottom: 30px;
}

path {
  fill: #1a191d !important;
}

.full-heart {
  background: url(../assets/heart-full.svg) no-repeat center center !important;
}

.shape-icon:hover {
  background: url(../assets/heart-full.svg) no-repeat center center;
}

.shape-icon {
  position: absolute;
  background: url(../assets/shape-white.svg) no-repeat center center;
  width: max-content;
  height: max-content;
  padding: 25px;
}

.breed-name {
  position: absolute;
  right: 0;
  font-family: IBM Plex Sans, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  text-align: right;
  letter-spacing: 0.01em;
  color: #ffffff;
  align-self: flex-end;
  order: 1;
  padding: 25px;
  text-transform: capitalize;
}
</style>
