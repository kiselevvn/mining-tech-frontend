<template>
  <q-page>
    <div class="q-pa-md">

      <div class="row justify-center">

        <div class="col-10 col-md-6">
          <q-form @submit="submitForm">
            <h1 class="text-h4">{{$route.meta.title}}</h1>
            <q-input
              v-model="user.username"
              type="email"
              :outlined="true"
              mask="*@*"
              label="Электронная почта"
              class="q-mb-md"
              />
            <q-input
              v-model="user.phone"
              type="tel"
              :outlined="true"
              label="Телефон"
              class="q-mb-md"
              mask="+7 (###) ###-##-##"
              />
            <q-input
              v-model="user.address"
              :outlined="true"
              label="Адрес доставки"
              class="q-mb-md"
              />

            <q-input
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
            </q-input >
            <div class="row justify-center">
              <div class="col-12 col-md-6 q-pa-xs">
                  <q-btn color="green" class="full-width" :disable="user.password2 === '' || user.password1 !== user.password2 || disableComponentStatus"  type="submit" label="Создать учетную запись" />
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
        username: 'adminadmin@aadmin.ru',
        phone: '',
        address: 'ddddd',
        password1: 'admin',
        password2: 'admin'
      }

    }
  },
  created () {
  },
  methods: {
    submitForm () {
      this.disable()
      this.$api.post('api/v1/users/create/', {
        username: this.user.username,
        password: this.user.password1,
        address: this.user.address !== '' ? this.user.address : undefined,
        phone: this.user.phone !== '' ? this.user.phone : undefined
      }).then(() => {
        this.messages = null
        this.$router.push({ name: 'login' })
        this.enable()
      }).catch(error => {
        this.dialogErrors = true
        console.log(error)

        this.messages = error.response.data.nonFieldErrors
        this.enable()
      })
    }
  }
})
</script>
