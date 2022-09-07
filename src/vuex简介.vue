<template>
  <div>
    <router-view></router-view>
    {{ count }}
    <button @click="SET_COUNT(10)">count++</button>
    <h1>10倍count {{ bigNum }}</h1>
  </div>
</template>

<script>
// mapState->将/uex里面statel映射到computed
// 使用
// 引入mapState:函数，返回一个对象
// 参数：['映射的属性']

// mapGetters-->将vuex里面getters映射到computed
// mapMutations->将vuex的mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
