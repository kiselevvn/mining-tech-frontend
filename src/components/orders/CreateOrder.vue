<template>
  <div v-if="getProducts.length > 0">
    <div class="row justify-center">
      <order-position v-for="p in getProducts" :key="p.id" :entity="p"></order-position>
    </div>
    <div class="row justify-center">
      <div v-if="getLoggedIn" class="row">
        <q-btn  :disabled="address == null" @click="createOrder()" color="primary" class="q-ma-md">Оформить заказ</q-btn>
        <q-select style="min-width:250px;" v-model="address" :options="addresses" option-value="id" option-label="value" label="Адрес доставки" class="q-ma-md" />
      </div>
      <div v-else class="column items-center">
        <span class="q-my-md">Для оформления заказа необходимо пройти авторизацию</span>

        <q-btn  @click="this.$router.push({ name: 'login' })" color="primary">Войти</q-btn>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row justify-center">
      <div class="col-12 col-md-8 text-center">
        <h3 class="text-h3">Корзина пуста</h3>
        <q-btn @click="this.$router.push({ name: 'products' })" color="primary">Вернуться к покупкам</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import OrderPosition from 'components/orders/OrderPosition.vue'
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'CreateOrder',
  components: {
    OrderPosition
  },
  data () {
    return {
      loading: false,
      addresses: [],
      address: null
    }
  },
  methods: {
    createOrder () {
      const data = {
        address: this.address ? this.address.id : undefined,
        items: []
      }
      this.getProducts.forEach(e => {
        data.items.push({ productId: e.id, count: e.count })
      })
      api.post('api/v1/orders/create/', data)
        .then(response => {
          this.loading = true
          this.cleanCart()
          this.loading = false
          this.$router.push({ name: 'orders' })
        })
        .catch(() => {
          this.loading = false
        })
    },
    ...mapActions('cart', [
      'cleanCart'
    ])
  },
  created () {
    this.$api.get('api/v1/users/detail/').then(response => {
      this.addresses = response.data.addresses
    })
  },
  computed: {
    ...mapGetters('cart', [
      'getProducts'
    ]),
    ...mapGetters('user', [
      'getLoggedIn'
    ])
  }
})
</script>
