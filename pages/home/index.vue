<template>
	<view>
		<u-swiper :list="bannerList" keyName="imagePath" height="180px" showTitle previousMargin="30" nextMargin="30"
			radius="5" :autoplay="false" circular @click="swiperClick"></u-swiper>
		<u-list @scrolltolower="scrolltolower">
			<u-list-item v-for="(item, index) in articleLists" :key="index">
				<itemHome :item="item"></itemHome>
			</u-list-item>
		</u-list>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import itemHome from '@/components/itemHome.vue'
	import { onLoad } from '@dcloudio/uni-app'
	// import { homeBanner } from '@/service/api/index.js'

	const bannerList = ref([])
	const articleLists = ref([])
	const page = ref(0)

	onLoad((options) => {
		banner()
		articleList()
	})

	function scrolltolower() {
		articleList()
	}

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

	function articleList() {
		let urls = 'https://www.wanandroid.com/article/list/' + page.value + '/json'
		uni.request({
			url: urls,
			success: (res => {
				if (res.data.errorCode == 0) {
					if (page.value == 0) {
						articleLists.value = []
						articleLists.value = res.data.data.datas
					} else {
						let datas = articleLists.value.concat(res.data.data.datas)
						articleLists.value = datas
					}
					page.value++
				}
				console.log(articleLists.value.length);
			})
		})
	}

	function itemClick(index) {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + articleLists[index].link
		})
	}
</script>

<style lang="scss" scoped>

</style>