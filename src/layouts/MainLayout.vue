
<template>
  <q-layout view="hHh LpR fFf">
    <box-header/>
    <q-page-container>
      <transition name="slide-fade">
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import boxHeader from './Header.vue';

export default Vue.extend({
  name: 'MyLayout',
  components: { 'box-header':boxHeader },
  data() {
    return {
      leftDrawerOpen: false,
      right: false
    };
  }
});
</script>
