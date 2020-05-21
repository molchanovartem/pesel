import axiosInstance from '../../api/axiosInstance'

import {
  SET_RANDOM_DOGS,
  SET_BREEDS,
  SET_SORTING,
  SET_CURRENT_BREED_DOGS,
  SET_DEFAULT_CURRENT_BREED_DOGS,
  SET_FEATURE_DOG,
  DELETE_FEATURE_DOG
} from '../types/mutations-types'

import {
  GET_RANDOM_DOGS,
  GET_BREEDS,
  CHANGE_SORTING,
  GET_CURRENT_BREED_DOGS,
  TOGGLE_FEATURE_DOG,
  LOAD_FEATURE_DOG
} from '../types/actions-types'

const state = () => ({
  dogs: [],
  currentBreedDogs: [],
  breeds: [],
  featured: [],
  sorting: false
})

const mutations = {
  [SET_FEATURE_DOG] (state, dogs) {
    state.featured = dogs
  },
  [DELETE_FEATURE_DOG] (state, dog) {
    state.featured = state.featured.concat(dog)
  },

  [SET_CURRENT_BREED_DOGS] (state, dogs) {
    state.currentBreedDogs = state.currentBreedDogs.concat(dogs)
  },
  [SET_RANDOM_DOGS] (state, dogs) {
    state.dogs = state.dogs.concat(dogs)
  },
  [SET_BREEDS] (state, breeds) {
    state.breeds = breeds
  },
  [SET_SORTING] (state, sorting) {
    state.sorting = sorting
  },
  [SET_DEFAULT_CURRENT_BREED_DOGS] (state, dogs) {
    state.currentBreedDogs = dogs
  }
}

const actions = {
  DEFAULT: ({ commit }) => {
    commit(SET_DEFAULT_CURRENT_BREED_DOGS, [])
  },
  [LOAD_FEATURE_DOG]: ({ commit, getters }, dog) => {
    const featuredDogs = JSON.parse(localStorage.getItem('featuredDogs') || '[]')

    commit(SET_FEATURE_DOG, featuredDogs)
  },
  [TOGGLE_FEATURE_DOG]: ({ commit, getters }, dog) => {
    let featuredDogs = JSON.parse(localStorage.getItem('featuredDogs') || '[]')

    if (getters.isFeatured(dog.img)) {
      featuredDogs = featuredDogs.filter((item) => {
        return item.img !== dog.img
      })
    } else {
      featuredDogs.push(dog)
    }

    localStorage.setItem('featuredDogs', JSON.stringify(featuredDogs))

    commit(SET_FEATURE_DOG, featuredDogs)
  },
  [GET_RANDOM_DOGS]: async ({ commit }) => {
    await axiosInstance({
      url: 'breeds/image/random/20'
    })
      .then(({ data }) => {
        const dogs = data.message.map((item) => {
          return {
            img: item,
            breed: item.split('/')[4]
          }
        })

        commit(SET_RANDOM_DOGS, dogs)
      })
  },
  [GET_CURRENT_BREED_DOGS]: async ({ commit }, breedName) => {
    await axiosInstance({
      url: `breed/${breedName}/images/random/20`
    })
      .then(({ data }) => {
        const dogs = data.message.map((item) => {
          return {
            img: item,
            breed: item.split('/')[4]
          }
        })

        commit(SET_CURRENT_BREED_DOGS, dogs)
      })
  },
  [GET_BREEDS]: async ({ commit }) => {
    await axiosInstance({
      url: 'breeds/list'
    })
      .then(({ data }) => {
        commit(SET_BREEDS, data.message)
      })
  },
  [CHANGE_SORTING]: async ({ state, commit }) => {
    commit(SET_SORTING, !state.sorting)
  }
}

const getters = {
  dogs: state => {
    if (state.sorting) {
      return state.dogs.sort((a, b) => {
        const bandA = a.breed.toUpperCase()
        const bandB = b.breed.toUpperCase()

        let comparison = 0
        if (bandA > bandB) {
          comparison = 1
        } else if (bandA < bandB) {
          comparison = -1
        }
        return comparison
      })
    } else {
      return state.dogs
    }
  },
  isFeatured: state => dogImg => {
    return state.featured.find(dog => dog.img === dogImg) !== undefined
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
