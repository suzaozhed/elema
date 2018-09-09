<template>
  <footer class="footer">
        <ul>
      <li v-for="(item, index) of list" :key = "index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '分类',
          path: '/kind'
        },
        {
          name: '购物车',
          path: '/cart'
        },
        {
          name: '我的',
          path: '/user'
        }
      ]
    }
  }
}
</script>

