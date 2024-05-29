<template>
  <q-btn-dropdown
    flat
    round
    dense
  >
    <div class="row no-wrap q-pa-md">
       <div class="column">
        <div class="text-h6 q-mb-md">Настройки</div>
        <q-toggle class="q-mb-md" label="Ночной режим" color="primary" :model-value="$q.dark.isActive" @click="$q.dark.toggle()"/>
        <q-btn
          v-if="getLoggedIn"
          color="red"
          label="Выход"
          push
          size="md"
          v-close-popup
          @click="logout()"
        />
        <div v-else class="column">
          <q-btn
            class="q-mb-md"
            @click="this.$router.push({ name: 'create-profile' })"
            color="green"
            label="Регистрация"
            push
            size="md"
            v-close-popup
          />

          <q-btn
            @click="this.$router.push({ name: 'login' })"
            color="primary"
            label="Войти"
            push
            size="md"
            v-close-popup
          />
        </div>

      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
// import EventBus from './../../service/user/EventBus'

export default defineComponent({
  name: 'LogoutButton',
  computed: {
    ...mapGetters('user', [
      'userInfo',
      'getLoggedIn'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }

})
</script>
