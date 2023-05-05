<template>
	<u-sticky>
		<u-tabs :list="titleList" keyName="name" @click="click" style="background: #3c9cff" lineColor="#fff"
			:activeStyle="{
	            color: '#fff',
	            fontWeight: 'bold',
	            transform: 'scale(1.05)'
	        }" :inactiveStyle="{
	            color: '#f0f0f0',
	            transform: 'scale(1)',
	        }"></u-tabs>
	</u-sticky>
	<u-list @scrolltolower="scrolltolower">
		<u-list-item v-for="(item, index) in articleLists[titleIndex]" :key="index">
			<itemProject :item="item" @click="itemClick(index)"></itemProject>
		</u-list-item>
	</u-list>
</template>

<script lang="ts" setup>
	import { ref } from "vue"
	import itemProject from '@/components/itemProject.vue'
	import { onLoad } from '@dcloudio/uni-app'

	const titleList = ref([])
	const articleLists = ref([])
	const page = ref([])
	const titleIndex = ref(0)

	onLoad(() => {
		getTitleList()
	})

	function scrolltolower() {
		getWxArticleList()
	}

	function click(item) {
		titleIndex.value = item.index
		if (articleLists.value[titleIndex.value].length == 0) {
			getWxArticleList()
		}
	}

	function itemClick(item) {

	}

	function getTitleList() {
		uni.request({
			url: 'https://www.wanandroid.com/project/tree/json',
			success: (res => {
				titleList.value = res.data.data
				titleList.value.forEach((item, index) => {
					page.value.push(0)
					articleLists.value.push([])
				})
				getWxArticleList()
			})
		})
	}

	function getWxArticleList() {
		let item = titleList.value[titleIndex.value]
		let pages = page.value[titleIndex.value]
		let urls = "https://wanandroid.com/project/list/" + pages + "/json?cid=" + item.id;
		uni.request({
			url: urls,
			success: (res => {
				if (res.data.errorCode == 0) {
					if (pages == 0) {
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