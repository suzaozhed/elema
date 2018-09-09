<template>
  <div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item, index) of bannerlist" :key="index">
        <img :src="item.imgsrc" alt="">
      </mt-swipe-item>
    </mt-swipe>

      <pro-list :list="prolist"></pro-list>
    </mt-loadmore>

  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Loadmore  } from 'mint-ui'
import axios from 'axios'
import List from './List'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Loadmore)

export default {
  data () {
    return {
        allLoaded: false,
        start: 0,
        bannerlist: [
            {imgsrc: require('../assets/1.jpg')},
            {imgsrc: require('../assets/2.jpg')},
            {imgsrc: require('../assets/3.jpg')},
            {imgsrc: require('../assets/4.jpg')},
            {imgsrc: require('../assets/5.jpg')},
            {imgsrc: require('../assets/6.jpg')}
        ],
        prolist: []
    }
  },
    components:{
      'pro-list': List
    },
    methods: {
      getData () {
        axios.get('http://www.daxunxun.com/douban')
            .then(res => {
                console.log(res.data)
              this.prolist = res.data;
              localStorage.setItem('prolist', JSON.stringify(res.data))
            })
            .catch(err => {
                console.log(err)
            })
      },
        loadTop () {
//          console.log('下拉刷新就是加载第一页数据')
            axios.get('http://www.daxunxun.com/douban')
                .then(res => {
                    this.prolist = res.data;
                    this.allLoaded = false;
                    this.start = 0;
                    this.$refs.loadmore.onTopLoaded();
                })
                .catch(err => {
                    console.log(err)
                    this.$refs.loadmore.onTopLoaded();
                })
        },
        loadBottom () {
//            console.log('加载一次，页码加一，数据变多')
            this.start += 20;
            console.log(this.start)
            axios.get('http://www.daxunxun.com/douban?start=' + this.start )
                .then(res => {
                    console.log(this.start, res.data)
                    if(res.data.length == 0) {
                      this.allLoaded = true; // 所有数据都已加载完毕
                    } else {
//                      this.prolist.concat(res.data)
                        this.prolist = [...this.prolist, ...res.data]
                    }
                    this.$refs.loadmore.onBottomLoaded();
                })
                .catch(err => {
                    console.log(err)
                    this.$refs.loadmore.onBottomLoaded();
                })

        }
    },
    mounted () {
//      this.getData()
        const prolistStr = localStorage.getItem('prolist')
        if(prolistStr){
          this.prolist = JSON.parse(prolistStr)
            console.log(this.prolist)
        } else {
            this.getData()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/lib/reset.scss';
.mint-swipe {
  @include rect(100%, 1.5rem);
}
.mint-swipe img{
  @include rect(100%, auto);
}

</style>
