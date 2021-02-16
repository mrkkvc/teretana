<template>
  <div>
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <div v-if="edit">
            <EditMember :user="member" :message="member.message"/>
          </div>
          <div v-else>
            <ShowMember v-if="members.length" :member="member"/>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cm="2" style="margin-top: 10px">
          <b-button variant="primary" size="lg" @click="toggleEdit" v-html="edit ? 'Cancel' : 'Edit'"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapState, mapActions } from 'vuex';
import ShowMember from "@/components/ShowMember";
import EditMember from "@/components/EditMember";

export default {
  name: "Members",
  components: {
    EditMember,
    ShowMember,
    Header,
  },
  data() {
    return {
      edit: false
    }
  },
  computed: {
    ...mapState(['members']),

    member: function () {
      for (let i = 0; i < this.members.length; i++)
        if (this.members[i].id === parseInt(this.$route.params.id))
          return this.members[i];
    }
  },
  methods: {
    ...mapActions(['load_members']),

    toggleEdit: function () {
      this.edit = !this.edit
    }
  }
}
</script>

<style scoped>

</style>