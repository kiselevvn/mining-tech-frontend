<template>
  <q-page>
    <div class="q-pa-md">

      <div class="row justify-center">

        <div class="col-12">
          <q-form @submit="submitForm">
            <h1 class="text-h4">{{$route.meta.title}}</h1>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="user.email"
                  disable
                  type="email"
                  :outlined="true"
                  mask="*@*"
                  label="Электронная почта"
                  class="q-ma-md"
                  />
                <q-input
                  v-model="user.phone"
                  type="tel"
                  :outlined="true"
                  label="Телефон"
                  class="q-ma-md"
                  mask="+7 (###) ###-##-##"
                  />
              </div>
              <div v-if="user.addresses" class="col-12 col-md-6">
                <q-input
                  v-for="(a,i) in user.addresses"
                  :key="i"
                  v-model="a.value"
                  :outlined="true"
                  label="Адрес доставки"
                  class="q-ma-md"
                  >
                <template v-slot:append>
                  <q-icon
                    name="remove"
                    class="cursor-pointer"
                    @click="user.addresses.splice(i, 1)"
                  />
              </template>
                </q-input>
              </div>
            </div>

            <!-- <q-input
              v-model="user.password1"
              :type="passwordShow ? 'password' : 'text'"
              :outlined="true"
              label="Пароль"
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon
                  :name="passwordShow ? 'manage_accounts' : 'manage_accounts'"
                  class="cursor-pointer"
                  @click="passwordShow = !passwordShow"
                />
              </template>
            </q-input >
            <q-input
              v-model="user.password2"
              :type="passwordShow ? 'password' : 'text'"
              :outlined="true"
              label="Пароль"
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon
                  :name="passwordShow ? 'manage_accounts' : 'manage_accounts'"
                  class="cursor-pointer"
                  @click="passwordShow = !passwordShow"
                />
              </template>
            </q-input > -->
            <div class="row justify-center">
              <div class="col-12 col-md-6 q-pa-xs row content-between">
                  <q-btn  color="green" class="q-ma-md" :disable="disableComponentStatus"  type="submit" label="Обновить учетную запись" />
                  <q-btn @click="addAddress()" color="green" class="q-ma-md" label="Добавить адрес" />
              </div>
            </div>
            <div class="row q-my-md">
              <div class="col-12">
              </div>
            </div>
          </q-form>
          <q-dialog v-model="dialogErrors" position="bottom" auto-close >
            <q-banner inline-actions class="text-white bg-red">
            <div v-if="messages">
            <span v-for="(m, i) in messages" :key="i">{{m}}</span><br>
          </div>
            <template v-slot:action>
              <q-btn flat color="white" label="Ок" />
            </template>
          </q-banner>
        </q-dialog>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useDisableCompponent from 'src/hooks/useDisableCompponent'
export default defineComponent({
  name: 'Login',
  setup () {
    const {
      disable,
      enable,
      disableComponentStatus
    } = useDisableCompponent()
    const dialogErrors = ref(false)
    return {
      disable,
      enable,
      disableComponentStatus,
      dialogErrors
    }
  },
  data () {
    return {
      messages: null,
      passwordShow: true,
      user: {
        email: 'adminadmin@aadmin.ru',
        phone: '',
        addresses: [],
        password1: 'admin',
        password2: 'admin'
      }
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    submitForm () {
      this.disable()
      const addresses = this.user.addresses.filter(o => o.value !== '')
      const data = {
        email: this.user.email,
        phone: this.user.phone !== '' ? this.user.phone : undefined
      }
      if (addresses !== []) {
        data.addresses = addresses
      }
      this.$api.put('api/v1/users/detail/', data).then(() => {
        this.messages = null
        this.loadProfile()
        this.enable()
      }).catch(error => {
        this.dialogErrors = true
        this.messages = error.response.data.nonFieldErrors
        this.enable()
      })
    },
    addAddress () {
      this.user.addresses.push({ value: '' })
    },
    loadProfile () {
      this.$api.get('api/v1/users/detail/').then(response => {
        this.user.email = response.data.email
        this.user.phone = response.data.phone
        this.user.addresses = response.data.addresses
      }).catch(error => {
        this.dialogErrors = true
        this.messages = error.response.data.nonFieldErrors
      })
    }
  }
})
</script>
