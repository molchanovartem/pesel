<template>
  <div class="dog-list">
    <div class="dog-item" v-for="(dog, index) in dogs" :key="index">
      <DogCard :img="dog.img" :label="dog.breed" />
    </div>
  </div>
</template>

<script>
import DogCard from '../components/DogCard'

export default {
  name: 'DogList',
  props: {
    dogs: {
      type: Array
    }
  },
  components: {
    DogCard
  }
}
</script>

<style scoped>
  .dog-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .dog-item:first-child {
    width: 100%;
  }

  .dog-item {
    width: 31%;
  }
</style>
