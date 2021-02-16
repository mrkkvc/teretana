<template>
  <div>
    <b-table
        hover v-if="cards.length"
        sticky-header="800px"
        :items="cards"
        :fields="fields"
        head-variant="light">
    </b-table>
    <h1 v-else>No members</h1>
  </div>
</template>

<script>
import router from "@/router";
import { mapState, mapActions } from 'vuex';

export default {
  name: "CardList",
  computed: {
    ...mapState(['cards'])
  },
  data() {
    return {
      fields: [
        { key: 'tip' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
tr:hover td{
  background: lightgreen;
}
</style>