<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      value="内容"
      :label="label"
    >
      <van-image
        windth="60"
        height="60"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          windth="60"
          height="60"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /*eslint-disable */
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count} ${pubdate}`
    }
  }
}
</script>

<style></style>
