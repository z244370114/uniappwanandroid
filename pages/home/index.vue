<template>
	<view>
		<z-paging ref="paging" v-model="articleLists" @query="loadData" default-page-no="0" default-page-size="20"
			:show-refresher-when-reload="true" :to-bottom-loading-more-enabled="true" 
			loading-more-no-more-text="我也是有底线的！">
			<u-swiper :list="bannerLists" keyName="imagePath" height="180px" showTitle previousMargin="30"
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

	const bannerLists = ref([])
	const articleLists = ref([])
	const paging = ref(null)
	const page = ref(0)
	const refresher = ref(true)

	onLoad((options) => {

	})

	function swiperClick(index) {
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + bannerList.value[index].url
		})
	}

	function loadData(pageNo, pageSize) {
		if (pageNo == 0) {
			bannerList()
		}
		queryList(pageNo, pageSize)
	}

	const bannerList = async () => {
		const data = await apis.bannerList()
		bannerLists.value = data
	}
	const queryList = async (pageNo, pageSize) => {
		const res = await apis.homeList(pageNo)
		paging.value.complete(res.datas)
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