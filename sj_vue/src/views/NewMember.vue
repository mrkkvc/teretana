<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <EditMember/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EditMember from "@/components/EditMember";
import Header from "@/components/Header";

export default {
  name: "NewMember",
  components: {
    Header,
    EditMember
  }
}
</script>

<style scoped>

</style>