<template>
  <div
    class="breed-container"
    :class="{ 'active-breed': isActiveBreed(breed) }"
  >
    <div class="breed" @click="selectBreed(breed)">{{ breed }}</div>
    <div class="sub-breed" v-if="subBreeds.length">
      <ul>
        <li class="breed" @click="selectBreed(breed)">{{ breed }}</li>
        <li
          v-for="(subBreed, index) in subBreeds"
          @click.prevent=""
          :key="index"
          @click="selectSubBreed(breed, subBreed)"
        >
          {{ subBreed }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedListItem',
  props: ['breed', 'subBreeds'],
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
    }
  }
}
</script>

<style scoped>
  .breed-letter {
    font-size: 20px;
    line-height: 28px;
    width: max-content;
    text-transform: capitalize;
    letter-spacing: 0.01em;
    color: #626262;
  }
  .sub-breed li.breed {
    font-size: 17px;
  }
  .breed-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  .sub-breed {
    position: absolute;
    bottom: 0;
    display: none;
    background-color: #ffffff;
    border-radius: 20px;
    z-index: 999;
    padding: 0 15px;
    text-transform: capitalize;
  }

  .sub-breed li {
    margin-top: 5px;
  }

  .sub-breed li:hover {
    color: #3c59f0;
    cursor: pointer;
  }

  .breed-container:hover .sub-breed {
    display: block;
  }
  .active-breed .breed {
    border-color: #3c59f0;
    color: #3c59f0;
  }
  .active-breed .breed:after {
    content: url("../assets/cross.svg");
    padding-left: 10px;
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

</style>
