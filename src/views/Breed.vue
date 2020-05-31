<template>
  <div v-scroll="onScroll">
    <DogList :dogs="dogs" />

    <Loader :show="show"/>
  </div>
</template>

<script>
import DogList from '../components/DogList'
import Loader from '../components/UI/Loader'

export default {
  name: 'Breed',
  components: {
    Loader,
    DogList
  },
  data () {
    return {
      show: true
    }
  },
  beforeDestroy () {
    this.$store.dispatch('dog/DEFAULT')
  },
  computed: {
    dogs () {
      return this.$store.state.dog.currentBreedDogs
    }
  },
  async created () {
    await this.loadDogs()

    if (this.$store.state.dog.breeds.length) {
      await this.$store.dispatch('dog/GET_BREEDS')
    }
  },
  methods: {
    onScroll (event) {
      const wrapper = event.target.firstElementChild
      const scrollTop = wrapper.scrollTop
      const wrapperHeight = wrapper.offsetHeight
      const windowHeight = document.documentElement.clientHeight

      if (wrapperHeight <= windowHeight + scrollTop + 5) {
        this.loadDogs()
      }
    },
    async loadDogs () {
      this.show = true
      await this.$store.dispatch(
        'dog/GET_CURRENT_BREED_DOGS', this.$route.params.breed
      ).finally(() => {
        this.show = false
      })
    }
  }
}
</script>
