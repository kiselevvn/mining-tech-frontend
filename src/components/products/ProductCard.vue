<template>
  <div class="col-12 col-md-4 col-lg-3 q-px-sm q-py-md">
    <q-intersection transition="scale" once>
    <q-card class="product-card">
      <q-card-section v-if="entity.pictures.length > 0">
        <q-carousel
          animated
          v-model="activeSlide"
          arrows
          infinite
        >
          <q-carousel-slide v-for="(slide, i) in entity.pictures" :name="i" :img-src="slide.image" :key="i"/>
        </q-carousel>
      </q-card-section>

      <q-card-section>
        <div v-if="entity.name" class="text-h5">
            {{ entity.name }}
            <q-badge v-if="entity.category" align="top">{{ entity.category }}</q-badge>
        </div>
        <div v-if="entity.brand" class="">
          <span class="text-weight-light">Производилель:</span> {{ entity.brand }}
        </div>
        <div v-if="entity.algorithm" class="">
          <span class="text-weight-light">Алгоритм:</span> {{ entity.algorithm }}
        </div>
        <div v-if="entity.currencyMining" class="">
          <span class="text-weight-light">Валюта:</span> {{ entity.currencyMining }}
        </div>
        <div v-if="entity.power" class="">
          <span class="text-weight-light">Потребление:</span> {{ entity.power }}
        </div>

      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ entity.shortDescription }}
      </q-card-section>

      <q-space></q-space>

      <q-card-section v-if="!entity.isAvailable" class="text-h5 text-weight-thin q-pt-none text-center row items-center justify-around">
        Нет в наличии
      </q-card-section>

      <q-card-section  v-if="entity.isAvailable" class="q-pt-none row items-center justify-around">
        <div class="product-card__price">{{ entity.price }}</div>
        <div v-if="getCountProductCart(entity.id) > 0" class="">
          <q-btn round color="primary" icon="add" @click="addToCart(entity)" />
          <span class="product-card__count">{{getCountProductCart(entity.id)}}</span>
          <q-btn round color="red" icon="remove"  @click="removeFromCart(entity.id)"  />
        </div>
        <div v-else class="">
          <q-btn color="primary" label="Купить" @click="addToCart(entity)" />
        </div>
      </q-card-section>

    </q-card>
    </q-intersection>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'ProductCard',
  data () {
    return {
      activeSlide: 0
    }
  },
  props: {
    entity: {
      required: true
    }
  },
  methods: {
    ...mapActions('cart', [
      'addToCart',
      'removeFromCart'
    ])
  },
  computed: {
    ...mapGetters('cart', [
      'getCountProductCart'
    ])
  }
})
</script>

<style>
.product-card {
  height:100%;
  width:100%;
}
.product-card__price {
  font-size: 1.7em;

}
.product-card__count {
  font-size: 1.5em;
  margin: 0 1.2rem;
}
.product-card:hover {}
</style>
