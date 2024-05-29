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
              label="Электронная почта"
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
                <div v-if="message !==''" class="text-weight-bolder text-center text-body1 text-negative">
                  {{message}}
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useDisableCompponent from 'src/hooks/useDisableCompponent'
export default defineComponent({
  name: 'Login',
  setup () {
    const {
      disable,
      enable,
      disableComponentStatus
    } = useDisableCompponent()

    return {
      disable,
      enable,
      disableComponentStatus
    }
  },
  data () {
    return {
      message: '',
      passwordShow: true,
      user: {
        username: '',
        password1: '',
        password2: ''
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
        password: this.user.password1
      }).then(() => {
        this.$router.push({ name: 'login' })
        this.enable()
      })
    }
  }
})
</script>
