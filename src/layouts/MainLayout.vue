<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal :class="$q.dark.isActive ? 'bg-blue-grey-10': 'bg-blue-grey-7'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title @click="this.$router.push({ name: 'products' })">
          {{$route.meta.title}}
        </q-toolbar-title>

        <!-- <q-btn @click="this.$router.push({ name: 'orders' })" dense round flat icon="star">
        </q-btn> -->

        <q-btn @click="this.$router.push({ name: 'cart' })" dense round flat icon="shopping_cart">
          <q-badge v-if="getCountCart !== 0" color="green-7" floating transparent>
            {{getCountCart}}
          </q-badge>
        </q-btn>

        <LogoutButton></LogoutButton>
      </q-toolbar>
    </q-header>

    <q-footer reveal :class="$q.dark.isActive ? 'bg-blue-grey-10': 'bg-blue-grey-8'">
        <div class="row">
          <!-- <div class="col-12 col-md-6">
            <div class="row content-center">
            </div>
          </div> -->
          <div class="col-12">
            <div class="q-pa-md row items-center justify-between">
              <div>MiningTech &copy; <br> <router-link  class="text-white text-subtitle1 cursor-pointer" :to="{ name: 'privacy' }" >Политика в отношении обработки персональных данных</router-link></div>

              <div class="">
                <q-btn href="https://t.me/mining_tech" size="sx" flat label="Телеграм"  icon="telegram"  />

                <q-btn href="https://www.avito.ru/user/137eda9b6606b82a2532bdc6e7889548/profile/all?src=search_seller_info&sellerId=137eda9b6606b82a2532bdc6e7889548" size="sx" flat  label="Авито" icon="shop" />

                <q-btn href="https://t.me/andromain" size="sx" flat label="Менеджер продаж"  icon="telegram" />

              </div>
            </div>
          </div>
        </div>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
     <left-drawer-items></left-drawer-items>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import LeftDrawerItems from 'components/interface/LeftDrawerItems.vue'
import LogoutButton from 'components/interface/LogoutButton.vue'
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftDrawerItems,
    LogoutButton
  },
  computed: {
    ...mapGetters('cart', [
      'getCountCart'
    ])
  },
  mounted () {
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen
    }
  }
})
</script>
