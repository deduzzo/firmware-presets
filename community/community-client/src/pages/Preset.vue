<template>
  <q-page>
      <div class="q-pa-md">
        <q-form>
          <div class="q-gutter-md">
            <q-input :v-model="title" label="Title" lazy-rules
                                      :rules="[ val => val && val.length > 0 || 'Please type something']"/>
            <div class="row q-col-gutter-x-md">
              <q-card class="col-6">
                <q-card-section>
                  <q-input label="Betaflight Versions"></q-input>
                    <q-chip v-for="version in versions" v-bind:key="version" removable color="primary" text-color="white" @remove="removeVersion(version)" >
                      {{ version }}
                    </q-chip>
                </q-card-section>
              </q-card>
              <div class="col-6 q-col-gutter-y-md">
                <q-select filled v-model="category" :options="categories" label="Category:" stack-label lazy-rules
                          :rules="[ val => val !== null || 'Please type something']" />
                <q-select filled v-model="status" :options="statuses" label="Status:" stack-label lazy-rules
                          :rules="[ val => val !== null || 'Please type something']" />
              </div>
            </div>


            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>

  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
const settings = require('../../../../indexer/Settings');
export default {
  name: 'Preset',
  setup() {
    const $q = useQuasar()
    const _default_versions = ["4.3","4.2"]


    let category = ref(null);
    let title = ref("Titolo di prova");
    let versions = ref(_default_versions)
    let status = ref (null)

    return {
      title,
      versions,
      categories: settings.PresetCategories,
      statuses: settings.PresetStatusEnum,
      status,
      category,
      onSubmit () {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
      },
      onReset () {
        title.value = null
        versions.value = [..._default_versions];
      },
      removeVersion (version)
      {
        versions.value =  [...versions.value.filter(f=> f != version)]
      }
    }
  }
}
</script>
