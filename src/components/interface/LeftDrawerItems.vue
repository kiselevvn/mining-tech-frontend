<template>
  <q-list bordered padding>
    <!-- <template v-for="sidebarItem in leftDrawerItems" :key="sidebarItem.key">
      <q-item-label header >
        {{sidebarItem.title}}
      </q-item-label>
      <q-item
        exact
        v-for="menuItem in sidebarItem.items"
        :key="menuItem.key"
        :to="{name:menuItem.to}"
      >
        <q-item-section
          v-if="menuItem.icon"
          avatar
        >
          <q-icon :name="menuItem.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ menuItem.title }}</q-item-label>
          <q-item-label v-if="menuItem.caption" caption>
            {{ menuItem.caption }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced  />

    </template> -->
    <q-item
      exact
      :to="{name:'products'}"
    >
      <q-item-section avatar >
        <q-icon name="awd" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Главная</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      exact
      :to="{name:'products'}"
    >
      <q-item-section avatar >
        <q-icon name="awd" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Корзина</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'

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
  mounted () {
  }

})
</script>
