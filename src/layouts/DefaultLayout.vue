<template>
  <div>
    <AppHeader />
    <BreedList />
    <div class="container">
      <slot/>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import BreedList from '@/components/BreedList'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    BreedList
  }
}
</script>
