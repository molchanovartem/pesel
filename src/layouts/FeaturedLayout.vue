<template>
  <div>
    <AppHeader />
    <div class="container">
      <slot/>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'FeaturedLayout',
  components: {
    AppHeader
  }
}
</script>
