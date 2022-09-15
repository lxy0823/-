<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      class="search"
      v-model.trim="keywords"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @focus="isShowSearchResult = false"
      @cancel="$router.push('/')"
    />
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/componets/SearchHistory.vue'
import SearchSuggestion from '@/views/Search/componets/SearchSuggestion.vue'
import SearchResult from '@/views/Search/componets/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      //   搜索历史：搜素框的值空
      //   搜索建议：搜索框有值，并且不這染搜索结果
      //   搜索结果：触发搜索时显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      //   this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      //   及不渲染搜索结果也不這染搜索历史
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 去重  1.获取没有去重的数组  2.放在new Set(arr) 3. [...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
