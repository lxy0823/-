<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 导航区 -->
    <van-tabbar v-model="active" route class="tabbar" active-color="#3296fa">
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="text">{{ isLogin ? '我的' : '未登录' }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
:deep(.tabbar) {
  .van-tabbar-item__icon {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .toutiao {
    font-size: 40px;
  }

  .text {
    font-size: 30px;
  }
}
</style>
