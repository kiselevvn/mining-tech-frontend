<template>
<div class="column justify-between">
  <div class="">
      <div class="text-center q-py-lg">
        <span class="text-h4">MiningTech</span>
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
        <!-- <q-item
          exact
          click=""
        >
          <q-item-section avatar >
            <q-icon name="pc" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Выход
               <q-badge v-if="getCountCart !== 0" color="green-9" floating transparent>
                {{getCountCart}}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator /> -->
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
    ])
  }
})
</script>
