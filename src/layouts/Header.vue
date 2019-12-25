
<template>
  <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="justify-center">
        <div class="row col-12 col-md-8 items-center">
          <q-toolbar-title side class="col-auto q-gutter-x-md">
            <div class="flex items-end">
              <q-avatar>
                <img src="~assets/unboxed-logo.png" />
              </q-avatar>
              <span class="text-weight-bold logo gt-sm">אנבוקס</span>
            </div>
          </q-toolbar-title>
          <q-tabs  align="center" class="col">
            <q-route-tab to="/packages" label="חבילות" />
            <q-route-tab to="/page2" label="אנשים" />
            <q-route-tab to="/page3" label="פעולות" />
          </q-tabs>
          <q-btn dense flat round icon="menu" side @click="right = !right" />
        </div>
      </q-toolbar>
      <q-drawer v-model="right" side="right" overlay bordered>test</q-drawer>
    </q-header>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'box-header',
  data() {
    return {
      leftDrawerOpen: false,
      right: false
    };
  }
});
</script>
