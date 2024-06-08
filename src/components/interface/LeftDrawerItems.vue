<template>
<div class="column justify-between">
  <div class="">
      <div class="text-center q-py-lg">
        <div class="">
          <h2 class="q-ma-none text-h4 text-bold">MiningTech</h2>

          <span class="text-subtitle">
            Магазин оборудования и акссесураов <br>
            для майнинга криптовалют
          </span>
        </div>
      </div>
      <q-list bordered padding >
        <q-item
          exact
          :to="{name:'products'}"
        >
          <q-item-section avatar >
            <q-icon name="awd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Товары</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          exact
          :to="{name:'cart'}"
        >
          <q-item-section avatar >
            <q-icon name="pc" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Корзина
              <q-badge v-if="getCountCart !== 0" color="green-7" transparent>
                {{getCountCart}}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="!getLoggedIn"
          exact
          :to="{name:'create-profile'}"
        >
          <q-item-section avatar >
            <q-icon name="awd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Регистрация</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="!getLoggedIn"
          exact
          :to="{name:'login'}"
        >
          <q-item-section avatar >
            <q-icon name="awd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Авторизация</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="getLoggedIn"
          exact
          :to="{name:'profile'}"
        >
          <q-item-section avatar >
            <q-icon name="profile" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Профиль</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="getLoggedIn"
          exact
          :to="{name:'orders'}"
        >
          <q-item-section avatar >
            <q-icon name="pc" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Заказы</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-item
          v-if="getLoggedIn"
          exact
          @click="logout()"
        >
        <q-item-section>
          <q-btn
            color="red"
            label="Выход"
            push
            size="md"
            v-close-popup
            @click="logout()"
          />
          </q-item-section>

        </q-item> -->
      </q-list>
  </div>
  <!-- <div class="">
    <q-btn flat color="green-6" label="Flat" />
    <q-btn flat color="red-9" label="Flat" />
  </div> -->
</div>
<!--  -->
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'LeftDrawerItems',
  setup (props) {
    const leftDrawerItems = [
      {
        title: 'Основное меню',
        items: [
          {
            title: 'Профиль',
            to: 'profile',
            icon: 'account_circle'
          },
          {
            title: 'Настройки',
            to: 'settings',
            icon: 'settings'
          },
          {
            title: 'Песочница',
            to: 'sandbox',
            icon: 'sandbox'
          }
        ]
      },
      {
        title: 'Основное меню',
        items: [
          {
            title: 'Профиль',
            to: 'profile',
            icon: 'account_circle'
          },
          {
            title: 'Настройки',
            to: 'settings',
            icon: 'settings'
          },
          {
            title: 'Песочница',
            to: 'sandbox',
            icon: 'sandbox'
          }
        ]
      }
    ]
    // const { userInfo } = useUserInfo()
    return {
      // userInfo,
      leftDrawerItems
    }
  },
  computed: {
    ...mapGetters('cart', [
      'getCountCart'
    ]),
    ...mapGetters('user', [
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
