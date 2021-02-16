<template>
  <div>
    <b-table
        hover v-if="members.length"
        sticky-header="800px"
        :items="members"
        :fields="fields"
        head-variant="light"
        @row-clicked="editMember">
      <template v-slot:cell(action)="row">
        <b-button variant="danger" @click="delete_member(row.item.id)">Delete</b-button>
      </template>
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
  },
  methods: {
    ...mapActions(['delete_member']),

    editMember: function (item) {
      router.push({path: `/member/${item.id}`})
    }
  }
}
</script>

<style>
tr:hover td{
  background: lightgreen;
}
</style>