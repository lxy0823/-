<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改 -->
    <!-- 更新头像 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.pdf.jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 更新头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像
// -手动的触发input:fi1e的点击事件
// 2.获取用户选择的图片
// -给input:file绑定change
// -选择的图片被保存在了input:file.value属性上
// input:file
// hidden:等于display:none
// accept：规定file选择文件的类型

import UpdateAvator from './componets/UpdateAvator.vue'
import { resolveToBase64 } from '@/utlis'
export default {
  components: { UpdateAvator },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background: #3296fa;
  .van-nav-bar__title,
  .van-icon {
    color: #fff;
  }
}
</style>
