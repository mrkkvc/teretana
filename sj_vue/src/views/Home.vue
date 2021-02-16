<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <MembersList/>
          <CardList/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import MembersList from "@/components/MemebrsList";
import CardList from "@/components/CardList";

export default {
  name: "Home",
  components: {
    Header,
    MembersList,
    CardList
  }
}
</script>