<template>
  <div class="wrapper">
    <div class="bar-container">
      <div class="breed-label-container" @click="showBreedList">
        <div class="breed-label">Породы</div>
        <div class="arrow" :class="{'rotate': !showBreed}">
          <img alt="arrow" src="../assets/arrow.png">
        </div>
      </div>

      <div class="breed-sort-container" v-if="!nosort">
        <div class="breed-sort-label" :class="{'active': sorting}">
          <span>Сортировка по алфавиту</span>
        </div>
        <div class="breed-switch" @click.prevent="sort">
          <AppSwitch :checked="sorting"/>
        </div>
      </div>
    </div>

    <div class="breed-list" v-if="showBreed">
      <div v-for="(breed, index) in breeds" :key="index">
        <div @click="selectBreed(breed)" :class="{'active-breed': isActiveBreed(breed)}">
          <div class="breed">{{breed}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSwitch from './UI/AppSwitch'

export default {
  name: 'BreedList',
  props: {
    nosort: {
      type: Boolean
    }
  },
  data () {
    return {
      showBreed: false
    }
  },
  components: {
    AppSwitch
  },
  methods: {
    selectBreed (breed) {
      this.$store.dispatch('dog/DEFAULT')
      this.$store.dispatch('dog/GET_CURRENT_BREED_DOGS', breed)

      if (this.isActiveBreed(breed)) {
        return this.$router.push('/')
      }

      this.$router.push(breed)
    },
    isActiveBreed (breed) {
      return this.$route.params.breed === breed
    },
    sort () {
      this.$store.dispatch('dog/CHANGE_SORTING')
    },
    showBreedList () {
      this.showBreed = !this.showBreed
    }
  },
  computed: {
    breeds () {
      return this.$store.state.dog.breeds
    },
    sorting () {
      return this.$store.state.dog.sorting
    }
  }
}
</script>

<style scoped>
  .active-breed .breed{
    border-color: #3C59F0;
    color: #3C59F0;
  }
  .active-breed .breed:after{
    content: url('../assets/cross.svg');
    padding-left: 10px;
  }
  .wrapper {
    margin-bottom: 60px;
  }
  .breed-switch {
    padding: 10px 0 0 15px;
  }
  .breed-sort-container {
    display: flex;
    align-items: center;
  }

  .breed-sort-label {
    font-size: 16px;
    line-height: 28px;
    color: #626262;
    text-align: right;
    letter-spacing: 0.01em;
  }

  .bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .arrow {
    padding: 5px;
    display: flex;
    align-items: center;
  }
  .breed-label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .breed-label-container {
    border-bottom: 0.5px dashed #FFFFFF;
    width: max-content;
    display: flex;
    cursor: pointer;
    align-items: center;
  }

  .breed {
    border: 1px solid #626262;
    font-size: 12px;
    line-height: 16px;
    text-transform: capitalize;
    letter-spacing: 0.01em;
    color: #626262;
    padding: 4px 12px;
    border-radius: 20px;
    width: max-content;
    cursor: pointer;
    margin: 5px;
  }

  .active-breed:not() .breed:hover {
    cursor: pointer;
    color: #ffffff;
    border-color: #ffffff;
  }

  .breed-list {
    display: flex;
    flex-wrap:  wrap;
  }
</style>
