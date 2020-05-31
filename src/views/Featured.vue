<template>
  <div>
    <DogList :dogs="featuredDogs" />
  </div>
</template>

<script>
import DogList from '../components/DogList'

export default {
  name: 'Featured',
  components: {
    DogList
  },
  computed: {
    featuredDogs () {
      return this.$store.state.dog.featured
    }
  },
  created () {
    this.$store.dispatch('dog/LOAD_FEATURE_DOG')
  }
}
</script>
