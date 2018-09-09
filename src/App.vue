<template>
  <div id="app" class="container">
    <router-view name="header"></router-view>
    <div class="content">
      <router-view name="content"></router-view>
    </div>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import MainFooter from '@/components/MainFooter'
export default {}
</script>

<style lang="scss">
@import 'lib/reset.scss';
  html, body, .container {
    /* 调用函数rect(width,height)，表明元素的宽高，如果不确定，可以设置为auto */
    @include rect(100%, 100%);
  }
  .container {
    /*  display: flex | display: box | display: flexbox */
    @include flexbox();
    /* 指明盒模型方向 flex-direction(row/column) 默认为row，可以不写 */
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.44rem);
      /* 背景颜色 */
      @include background-color(#f66);
    }
    .content {
      /* 指明弹性范围 flex() 内部可以填写值，默认为1，即有多大的空间，他就有多大  */
      @include flex();
      @include rect(100%, auto);
      @include overflow(auto);
    }
    .footer{
      @include rect(100%, 0.5rem);
      @include background-color(#0f0);
      ul {
        @include rect(100%, 100%);
        @include flexbox();
        li {
          @include flex();
          @include rect(auto, 100%);
          @include flexbox();
          @include flex-direction(column);
          @include justify-content();
          @include align-items();
          a {
            @include text-color(#333);
            &.router-link-active {
              @include text-color(#fff);
            }
          }
        }
      }
    }
  }
</style>
