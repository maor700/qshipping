<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container style="padding-top:1em" class="row justify-center q-pa-lg">
      <q-page class="col-12 col-md-7 q-pt-xs">
        <div class="row justify-between">
          <div class="text-h4 q-pt-lg q-pb-lg">פרטי חבילה</div>
          <q-toggle
            v-model="packageData.status"
            label="נמסר"
            left-label
            icon="check"
            color="green"
          />
        </div>
        <q-form class="q-col-gutter-lg">
          <div class="row justify-between q-gutter-lg">
            <q-input
              :filled="!edit"
              v-model="packageData.package_id"
              stack-label
              class="col-12 col-md text-h5"
              label="מזהה חבילה"
              :readonly="!edit"
            />
            <q-input
              :filled="!edit"
              v-model="packageData.employee_name_he"
              stack-label
              class="col-12 col-md text-h5"
              label="נמען"
              :readonly="!edit"
            />
          </div>
          <div class="row justify-between q-gutter-lg">
            <q-input
              :filled="!edit"
              v-model="packageData.store_location"
              stack-label
              class="col-12 col-md text-h5"
              label="מיקום אחסנה"
              :readonly="!edit"
            />
            <q-input
              :filled="!edit"
              v-model="packageData.picked_at"
              stack-label
              class="col-12 col-md text-h5"
              label="תאריך מסירה"
              :readonly="!edit"
            />
          </div>
          <div class="row justify-between q-gutter-lg">
            <q-input
              :filled="!edit"
              v-model="packageData.enter_date"
              stack-label
              class="col-12 col-md text-h5"
              label="תאריך קבלה"
              :readonly="!edit"
            />
          </div>
          <div class="row text-h1">
            <!-- <q-icon
              style="opacity:0.8"
              :title="packageData.picked_at?'נאסף':'ממתין לאיסוף'"
              :name="packageData.picked_at?'fas fa-box-open':'fas fa-box'"
            />-->
          </div>
          <div class="row justify-end items-center">
            <div class v-if="edit">
              <q-btn class="text-h6" label="שמור" type="submit" color="primary" />
              <q-btn class="q-ml-sm text-h6" label="אפס" type="reset" color="primary" flat />
            </div>
            <div v-else class="float left text-h6">
              <q-icon @click="edit=!edit" name="edit" color="primary cursor-pointer" />
              <q-icon @click="deleteHandler" name="delete" color="primary cursor-pointer" />
            </div>
          </div>
        </q-form>
        <div class="actions-panel">
          <q-btn color="primary" label="בצע מסירה" @click="showSignatureDialog=true" />
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="arrow_back" color="blue" @click="()=>this.$router.go(-1)" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
    <q-dialog v-model="showConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center text-h6">
          <!-- <q-avatar icon="fas fa-box-open" square /> -->
          <span class="q-ml-sm">אתה בטוח שברצונך למחוק את החבילה?</span>
        </q-card-section>

        <!-- delete dialog -->
        <q-card-actions align="right">
          <q-btn
            flat
            label=" מחק את החבילה"
            @click="deleteHandler(true)"
            color="negative"
            v-close-popup
          />
          <q-btn flat label="ביטול" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showSignatureDialog" @show="initSingPad" @hide="signaturePad.clear();" persistent>
      <q-card>
        <q-card-section class="row items-center text-h6">
          <!-- <q-avatar icon="fas fa-box-open" square /> -->
          <span class="q-ml-sm">חתום כאן</span>
          <canvas ref="sigpad" id="signature" width="500" height="300" style="border:1px solid red"></canvas>
        </q-card-section>
        <!-- signature dialog -->
        <q-card-actions align="right">
          <q-btn color="primary" label="אישור" @click="signHandler()" v-close-popup />
          <q-btn flat label="ביטול" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import SignaturePad from 'signature_pad';
const dataSource = require('../statics/packages.json');
let signaturePad: SignaturePad;
export default Vue.extend({
  name: 'package-id',
  data: function() {
    return {
      edit: false,
      showConfirm: false,
      showSignatureDialog: false,
      packageData: {}
    };
  },
  methods: {
    deleteHandler(deleteForShure?: Boolean) {
      if (typeof deleteForShure === 'boolean') {
        //todo delete
        alert('impliment delete');
      } else {
        this.showConfirm = true;
      }
    },
    initSingPad() {
      var canvas = this.$refs['sigpad'];
      signaturePad = new SignaturePad(canvas as any);
    },
    signHandler() {
      const signImg = signaturePad.toDataURL('image/jpeg');
      console.log(signImg);
    }
  },
  created: async function() {
    const { packages } = dataSource;
    this.packageData = packages.find(
      (_: any) => _.package_id === this.$route.params.id
    );
  }
});
</script>
