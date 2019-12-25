<template>
  <q-page class="row justify-center q-pa-lg">
    <q-page-container style="padding-top:1em" class="col-12 col-md-7 q-pt-xs">
      <div class="q-gutter-md">
        <div class="row text-h4 items-center q-mb-lg">
          <!-- <div class="col-4 q-gutter-x-sm">
            <q-icon name="fas fa-box-open" />
            <span>חבילות</span>
          </div>-->
          <div class="col-12 col-md-6 flex justify-center">
            <q-input
              style="font-size:1em"
              class="full-width font-size-lg"
              color="white"
              v-model="search"
              debounce="500"
              filled
              placeholder="חפש חבילה"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        <q-list bordered separator v-if="filterdList.length">
          <q-item
            v-for="item in filterdList"
            :key="item.package_id"
            tag="label"
            @click="()=>clickHandler(item.package_id)"
            v-ripple
          >
            <q-item-section side right>
              <q-icon
                style="opacity:0.4"
                :title="item.picked_at?'נאסף':'ממתין לאיסוף'"
                :name="item.picked_at?'fas fa-box-open':'fas fa-box'"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.package_id}}</q-item-label>
            </q-item-section>
            <q-item-section class="text-md-center">{{item.employee_name_he}}</q-item-section>
            <q-item-section side left top>
              <!-- <q-icon name="far fa-calendar-alt" /> -->
              {{item.enter_date}}
            </q-item-section>
          </q-item>
        </q-list>
        <div v-if="!filterdList.length" class="text-h5 text-center">אין תוצאות</div>
      </div>
    </q-page-container>
    <q-dialog
      v-model="showModal"
      persistent
      full-height
      full-width
      :maximized="showModal"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="column full-height" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Full Height</div>
        </q-card-section>

        <q-card-section class="col">Click/Tap on the backdrop.</q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="blue" @click="showModal=true" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

const dataSource = require('../statics/packages.json');

export default Vue.extend({
  name: 'PageIndex',
  data: function() {
    return {
      search: '',
      packages: dataSource.packages,
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
  methods: {
    clickHandler(package_id:string) {
      this.$router.push("/packages/"+package_id)
    }
  },
  // created: async function() {
  //   const response = await axios.get('statics/packages.json');
  //   const { packages } = response.data;
  //   this.packages = packages;
  // }
});
</script>
