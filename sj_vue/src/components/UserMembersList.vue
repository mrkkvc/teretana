<template>
  <div>
    <b-table
        hover v-if="members.length"
        sticky-header="800px"
        :items="members"
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
  name: "MembersList",
  computed: {
    ...mapState(['members'])
  },
  data() {
    return {
      fields: [
        { key: 'ime' },
        { key: 'prezime' },
        { key: 'action' }
      ]
    }
  }
}
</script>

<style>
tr:hover td{
  background: lightgreen;
}
</style>yle>