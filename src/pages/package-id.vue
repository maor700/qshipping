<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container style="padding-top:1em" class="row justify-center q-pa-lg">
      <q-page class="col-12 col-md-7 q-pt-xs">
        <h1>TEST</h1>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="arrow_back" color="blue" @click="()=>this.$router.go(-1)" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
export default Vue.extend({
  name: 'package-id',
  data: function() {
    return {
      packageData: {},
      showModal: false
    };
  },
  computed: {
    filterdList: function() {
      return this.packages.filter(item =>
        JSON.stringify(item)
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    }
  },
  created: async function() {
    const response = await axios.get('statics/packages.json');
    const { packages } = response.data;
    this.packages = packages;
  }
});
</script>
