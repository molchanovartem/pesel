<template>
  <div class="wrapper">
    <div class="bar-container">
      <div class="breed-label-container" @click="showBreedList">
        <div class="breed-label">Породы</div>
        <div class="arrow" :class="{ rotate: !showBreed }">
          <img alt="arrow" src="../assets/arrow.png" />
        </div>
      </div>

      <div class="breed-sort-container" v-if="!nosort">
        <div class="breed-sort-label" :class="{ active: sorting }">
          <span>Сортировка по алфавиту</span>
        </div>
        <div class="breed-switch" @click.prevent="sort">
          <AppSwitch :checked="sorting" />
        </div>
      </div>
    </div>

    <div class="breed-list" v-show="showBreed">
      <div v-for="(breeds, letter) in breedList" :key="letter" class="breed-row" >
          <div class="breed-letter">
            {{letter}}
          </div>

          <BreedListItem v-for="breed in breeds" :key="breed.name"  :breed="breed.name" :subBreeds="breed.children" />
      </div>
    </div>
  </div>
</template>

<script>
import AppSwitch from './UI/AppSwitch'
import BreedListItem from './BreedListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'BreedList',
  props: {
    nosort: {
      type: Boolean
    }
  },
  data () {
    return {
      showBreed: false,
      letters: []
    }
  },
  components: {
    AppSwitch,
    BreedListItem
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
    selectSubBreed (breed, subBreed) {
      this.$store.dispatch('dog/DEFAULT')
      this.$store.dispatch('dog/GET_CURRENT_BREED_DOGS', breed, subBreed)

      if (this.isActiveBreed(breed)) {
        return this.$router.push('/')
      }

      this.$router.push(`${breed}/${subBreed}`)
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
    ...mapGetters({
      breedList: 'dog/breeds'
    }),
    sorting () {
      return this.$store.state.dog.sorting
    }
  }
}
</script>

<style scoped>
  .breed-row {
    display: flex;
    align-items: center;
  }
  .breed-letter {
    font-size: 20px;
    line-height: 28px;
    width: max-content;
    text-transform: capitalize;
    letter-spacing: 0.01em;
    color: #626262;
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
  padding: 50px 60px 0 60px;
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
  color: #ffffff;
}

.rotate {
  transform: rotate(180deg);
}

.breed-label-container {
  border-bottom: 0.5px dashed #ffffff;
  width: max-content;
  display: flex;
  cursor: pointer;
  align-items: center;
}

.breed-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 60px;
}
</style>
