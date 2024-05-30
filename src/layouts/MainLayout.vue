<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title @click="this.$router.push({ name: 'products' })">
          {{$route.meta.title}}
        </q-toolbar-title>

        <q-btn @click="this.$router.push({ name: 'orders' })" dense round flat icon="star">
        </q-btn>

        <q-btn @click="this.$router.push({ name: 'cart' })" dense round flat icon="shopping_cart">
          <q-badge v-if="getCountCart !== 0" color="red" floating transparent>
            {{getCountCart}}
          </q-badge>
        </q-btn>

        <LogoutButton></LogoutButton>
      </q-toolbar>
    </q-header>

    <q-footer reveal
    >
        <div class="row">
          <!-- <div class="col-12 col-md-6">
            <div class="row content-center">
            </div>
          </div> -->
          <div class="col-12">
            <div class="q-pa-md row items-center justify-between">
              <div>MiningTech &copy;</div>
              <div class="">
                <q-btn size="sx" flat round  icon="telegram" />
                <q-btn size="sx" flat round  icon="phone" />
                <q-btn size="sx" flat round  icon="mail" />
              </div>
            </div>
          </div>
        </div>
    </q-footer>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
     <LeftDrawerItems  ></LeftDrawerItems>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
// import LeftDrawerItems from 'components/interface/LeftDrawerItems.vue'
import LogoutButton from 'components/interface/LogoutButton.vue'
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
// import useUserInfo from 'src/hooks/user/useUserInfo'

export default defineComponent({
  name: 'MainLayout',

  components: {
    // LeftDrawerItems,
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
    // const { userInfo } = useUserInfo()
    return {
      // userInfo,
      leftDrawerOpen
    }
  }
})
</script>
