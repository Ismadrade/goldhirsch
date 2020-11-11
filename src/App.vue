<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { api } from '../src/services/config'
export default{
  methods: {
    async setarTokenHeader(){
      const token = this.$store.getters.getToken;
      api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}` 
    }
  },
  created() {
    this.setarTokenHeader()
  }
}
</script>

<style>
</style>
