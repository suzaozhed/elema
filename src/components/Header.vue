

<template>
	<header class="header">
		<div class="iconfont tubiao">&#xe63b;<span class="fanwei">所在地</span></div>
	</header>
</template>
<script>
import axios from 'axios'
export default {
	created() {
		axios.get('/restapi/bgs/poi/reverse_geo_coding', {
			params: {
				latitude: '22.625428',
				longitude: '113.837942'
			}
		}).then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.header{
	@include rect(100%, 0.48rem);
		display: flex;
		align-items: center;
		
	.tubiao{
		margin-left:0.1rem;
	}
	.fanwei{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}
</style>
