<template>
	<view>
		<z-paging ref="paging" v-model="articleLists" loading-more-no-more-text="我也是有底线的！"
			:show-refresher-when-reload="true" @query="queryList">
			<u-swiper :list="bannerList" keyName="imagePath" height="180px" showTitle previousMargin="30"
				nextMargin="30" radius="5" :autoplay="false" circular @click="swiperClick"></u-swiper>
			<view v-for="(item, index) in articleLists" :key="index">
				<itemHome :item="item"></itemHome>
			</view>
		</z-paging>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import itemHome from '@/components/itemHome.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import apis from '../../service/api/index.js'
	// import { homeBanner } from '@/service/api/index.js'

	const bannerList = ref([])
	const articleLists = ref([])
	const paging = ref(null)
	const page = ref(0)
	const refresher = ref(true)

	onLoad((options) => {
		banner()
		queryList()
	})

	function swiperClick(index) {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + bannerList.value[index].url
		})
	}

	function banner() {
		uni.request({
			url: 'https://www.wanandroid.com/banner/json',
			success: (res => {
				bannerList.value = res.data.data
			})
		})
	}
	const queryList = async () => {
		const res = await apis.homeList(page.value)
		if (page.value == 0) {
			paging.value.complete(res.datas)
		} else {
			let datas = articleLists.value.concat(res.datas)
			articleLists.value = datas
		}
		page.value++
		paging.value.endRefresh()
	}


	function itemClick(index) {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + articleLists[index].link
		})
	}
</script>

<style lang="scss" scoped>
	.list-view {}
</style>