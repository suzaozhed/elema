<template>
  <div class="userContent">
	<div class="userBox">
	  <div class="userImg">
		<img src="../assets/1.jpg" alt="">
	  </div>
	  <div class="userInfo">
		<div class="nologin" v-if='flag'>
			<mt-button plain size = 'small' @click='gopage("/login")'>登录</mt-button>
			<mt-button plain size = 'small' @click='gopage("/register")'>注册</mt-button>
		</div>
		<div class="logining" v-else>
			<h1>欢迎您，{{username}}</h1>
            <mt-button type="danger" size = 'small' @click='logout'>退出</mt-button>
		</div>
	  </div>
	</div>	
  </div>
</template>
<script>
export default {
    data () {
        return {
            flag: true,
            username: ''
        }
    },
    mounted () {
        if(localStorage.getItem('username')){
            this.flag = false;
            this.username = localStorage.getItem('username')
        } else {
            this.flag = true;
        }
    },
    methods: {
        gopage (path) {
            this.$router.push(path)
        },
        logout () {
            localStorage.removeItem('username')
            this.flag = true;
        }
    }
}
</script>
<style lang="scss">
 @import '@/lib/reset.scss';
    .userContent {
        @include rect(100%, auto);
        .userBox {
            @include rect(100%, 1.1rem);
            @include flexbox();
            @include flex-direction();
            @include border(0 0 1px 0, #ccc, solid);
            @include background-color(#eee);
            .userImg {
                @include rect(1.1rem, 1.1rem);
                img {
                    @include rect(1rem, 1rem);
                    @include margin(0.05rem);
                    @include border-radius(50%);
                }
            }
            .userInfo {
                @include flex();
                @include rect(auto, 1.1rem);
                @include flexbox();
            	@include flex-direction(column);
            	@include justify-content();
            	@include align-items();
            }
        }
    }
</style>
