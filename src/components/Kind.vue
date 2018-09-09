<template>
  <div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <pro-list :list = 'prolist'></pro-list>
    </mt-loadmore>
  </div>
</template>
<script>
  import Vue from 'vue'
    import List from './List'
    import axios from 'axios'
    import { Loadmore  } from 'mint-ui'
  Vue.use(Loadmore)
export default {
    data () {
        return {
            start: 0,
            allLoaded: false,
            prolist: []
        }
    },
    components:{
        'pro-list': List
    },
    methods: {
        loadTop () {
            axios.get('http://www.daxunxun.com/douban')
                .then(res => {
                    this.prolist = res.data;  // 第一页数据
                    this.allLoaded = false;  //  让上啦加载状态开启
                    this.start = 0;           // 重置开始数据
                    this.$refs.loadmore.onTopLoaded(); //  下拉刷新完成
                })
                .catch(err => {
                    console.log(err)
                    this.$refs.loadmore.onTopLoaded();
                })
        },
        loadBottom () {
            this.start += 20;
            axios.get('http://www.daxunxun.com/douban?start='+this.start)
                .then(res => {
                    if (res.data.length == 0){
                        this.allLoaded = true;
                    } else {
                        this.prolist = [...this.prolist, ...res.data];
                    }
                    this.$refs.loadmore.onBottomLoaded(); //  上啦刷新完成
                })
                .catch(err => {
                    console.log(err)
                    this.$refs.loadmore.onBottomLoaded();
                })
        }
    }
}
</script>
<style lang="scss"></style>
