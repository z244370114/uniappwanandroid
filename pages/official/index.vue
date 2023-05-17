<template>
	<u-sticky bgColor="#3c9cff">
		<u-tabs :list="titleList" keyName="name" :current="titleIndex" @click="click" style="background: #3c9cff"
			lineColor="#fff" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle"></u-tabs>
	</u-sticky>
	<swiper :current="titleIndex" @animationfinish="animationfinish"
		style="position: absolute;top: 80rpx;bottom: 0rpx;left: 0;right: 0;height: auto;">
		<swiper-item v-for="(items, indexs) in titleList" style="flex: 1;" :key="indexs">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in articleLists[indexs]" :key="index">
					<itemOfficial :item="item"></itemOfficial>
				</u-list-item>
			</u-list>
		</swiper-item>
	</swiper>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import itemOfficial from '@/components/itemOfficial.vue'
	import { onLoad } from '@dcloudio/uni-app'

	const titleList = ref([])
	const articleLists = ref([])
	const page = ref([])
	const titleIndex = ref(0)
	const activeStyle = ref(
		{
			color: '#fff',
			fontWeight: 'bold',
			transform: 'scale(1.05)'
		}
	)
	const inactiveStyle = ref(
		{
			color: '#f0f0f0',
			transform: 'scale(1)',
		}
	)

	onLoad(() => {
		getTitleList()
	})

	function animationfinish(e) {
		let current = e.detail.current;
		titleIndex.value = current;
		if (articleLists.value[titleIndex.value].length == 0) {
			getWxArticleList()
		}
	}

	function scrolltolower() {
		getWxArticleList()
	}

	function click(item) {
		titleIndex.value = item.index
		if (articleLists.value[titleIndex.value].length == 0) {
			getWxArticleList()
		}
	}

	function getTitleList() {
		uni.request({
			url: 'https://wanandroid.com/wxarticle/chapters/json',
			success: (res => {
				titleList.value = res.data.data
				titleList.value.forEach((item, index) => {
					page.value.push(1)
					articleLists.value.push([])
				})
				getWxArticleList()
			})
		})
	}

	function getWxArticleList() {
		let item = titleList.value[titleIndex.value]
		let pages = page.value[titleIndex.value]
		let urls = "https://wanandroid.com/wxarticle/list/" + item.id + "/" + pages + "/json";
		uni.request({
			url: urls,
			success: (res => {
				if (res.data.errorCode == 0) {
					if (pages == 1) {
						articleLists.value[titleIndex.value] = []
						articleLists.value[titleIndex.value] = res.data.data.datas
					} else {
						let datas = articleLists.value[titleIndex.value].concat(res.data.data.datas)
						articleLists.value[titleIndex.value] = datas
					}
					page.value[titleIndex.value]++
				}
			})
		})

	}
</script>

<style>
</style>