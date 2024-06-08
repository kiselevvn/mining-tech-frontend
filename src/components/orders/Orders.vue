<template>
  <div class="row justify-center">
    <div v-for="o in orders" :key="o.id" class="col-12 col-md-7 q-px-sm q-py-md">
      <q-card class="my-card" flat bordered>
        <q-card-section class="text-center">
          <span>
            <span class="text-bold">{{o.price}}</span> руб.
            <q-badge v-if="getColorStatus(o.status)" outline :color="getColorStatus(o.status)" :label="o.statusName" />
          </span>
          <br>
          {{o.address}}

        </q-card-section>
        <q-card-section class="row">
          <div class="col-12 col-sm-6">
            <q-list>
              <q-item v-for="(i, index) in o.items" :key="i.id">
                <q-item-section>
                  <q-item-label>
                     {{++index}}. {{i.productName}} <span class="text-weight-thin">{{i.categoryName}}</span>
                    <q-badge class="q-ml-sm" color="primary" transparent>
                      {{i.count}}
                    </q-badge>
                  </q-item-label>
                  <q-item-label v-if="i.categoryName" ></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-sm-6">
            <div v-if="o.invoice" class="column justify-center items-center">
              <span v-if="o.status === 2" class="">К оплате:</span>
              <span class="text-h4 q-mb-md">{{o.invoice.result.amount}} {{o.invoice.result.currency.code}} </span>
              <q-btn link size="md" v-if="o.invoice" color="primary" :href="o.invoice.result.link">
                {{ o.status === 2 ? 'Оплатить' : 'Детали счета'}}
              </q-btn>
            </div>

            <!-- <span v-if="checkDate(o.invoice)" class="subtitle">Часов до окончания: {{checkDate(o.invoice)}} </span> -->

          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row justify-center">
  </div>
</template>

<script>
// import OrderPosition from 'components/orders/OrderPosition.vue'
import { defineComponent } from 'vue'
// import { mapGetters, mapActions } from 'vuex'
import { api } from 'boot/axios'
import { date } from 'quasar'

export default defineComponent({
  name: 'CreateOrder',
  components: {
    // OrderPosition
  },
  data () {
    return {
      orders: [],
      loading: false
    }
  },
  created () {
    api.get('api/v1/orders/list/')
      .then(response => {
        this.loading = true
        this.orders = response.data
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    // checkDate (invoice) {
    //   if (invoice === {}) {
    //     return false
    //   }
    //   const timeStamp = Date.now()
    //   const formattedString = date.formatDate(invoice.expiry_date, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    //   const diff = date.getDateDiff(formattedString, timeStamp, 'hours')
    //   if (diff > 0) {
    //     return false
    //   }
    //   return diff
    // }
  },
  computed: {
    checkDate () {
      return (invoice) => {
        if (invoice === {}) {
          return false
        }
        const timeStamp = Date.now()
        const formattedString = date.formatDate(invoice.result.expiryDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        const diff = date.getDateDiff(formattedString, timeStamp, 'hours')
        if (diff < 0) {
          return false
        }
        return diff
      }
    },
    getColorStatus () {
      return (id) => {
        if (id === 1) {
          return 'primary'
        } else if (id === 4) {
          return 'red-14'
        } else if (id === 10) {
          return 'green-7'
        } else {
          return false
        }
      }
    },
    getTextStatus () {
      return (id) => {
        if (id === 1) {
          return 'Новый'
        } else if (id === 10) {
          return 'Отменён'
        } else if (id === 10) {
          return 'Оплачен'
        } else {
          return false
        }
      }
    }
  }
})
</script>
