<template>
  <div class="container" v-scroll="onScroll">
    <BreedList />

    <DogList :dogs="dogs" />

    <Loader :show="show"/>
  </div>
</template>

<script>
import DogList from '../components/DogList'
import Loader from '../components/UI/Loader'
import BreedList from '../components/BreedList'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    Loader,
    DogList,
    BreedList
  },
  data () {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters({
      dogs: 'dog/dogs'
    })
  },
  async created () {
    await this.loadDogs()
    await this.$store.dispatch('dog/GET_BREEDS')
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
        'dog/GET_RANDOM_DOGS'
      ).finally(() => {
        this.show = false
      })
    }
  }
}
</script>

<style scoped>

</style>
