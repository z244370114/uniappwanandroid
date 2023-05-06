<template>
	<view>
		<u-sticky bgColor="#3c9cff">
			<u-tabs :list="titlesList" :current="swiperCurrent" @change="tabsChange" :is-scroll="true" lineColor="#fff"
				:activeStyle="{
		            color: '#fff',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#f0f0f0',
		            transform: 'scale(1)',
		        }"></u-tabs>
		</u-sticky>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			style="height: 800px;">
			<swiper-item v-for="(item, index) in titlesList" :key="index" style="flex: 1;">
				<scroll-view scroll-y style="width: 100%;" @scrolltolower="onreachBottom" :enable-flex="true">
					<view v-if="!!articleLists[index]" v-for="(items, indexs) in articleLists[index]" :key="indexs">
						<itemOfficial :item="items" @click="itemClick(indexs)"></itemOfficial>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import itemOfficial from '@/components/itemOfficial.vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const uTabs = ref(null)
	const titlesList = ref([])
	const articleLists = ref([])
	const page = ref([])
	const swiperCurrent = ref(0)

	onLoad((option) => {
		uni.setNavigationBarTitle({
			title: option.title
		});
		swiperCurrent.value = option.index
		let listTitle = JSON.parse(decodeURIComponent(option.data))
		titlesList.value = listTitle.children
		titlesList.value.forEach((item, index) => {
			page.value.push(0)
		})
		loadData()
	})


	function tabsChange(item) {
		swiperCurrent.value = item.index
		loadData()
	}

	function transition(e) {
		let dx = e.detail.dx;
		// uTabs.value.animation(dx);
	}

	function animationfinish(e) {
		let current = e.detail.current;
		swiperCurrent.value = current;
		loadData()
	}


	function onreachBottom() {
		loadData()
	}

	function loadData() {
		let urls = 'https://www.wanandroid.com/article/list/' + page.value[swiperCurrent.value] + '/json?cid=' + titlesList
			.value[swiperCurrent.value].id
		uni.request({
			url: urls,
			success: (res => {
				if (res.data.errorCode == 0) {
					if (page.value[swiperCurrent.value] == 0) {
						articleLists.value[swiperCurrent.value] = []
						articleLists.value[swiperCurrent.value] = res.data.data.datas
					} else {
						let datas = articleLists.value[swiperCurrent.value].concat(res.data.data.datas)
						articleLists.value[swiperCurrent.value] = datas
					}
					page.value[swiperCurrent.value]++
				}
			})
		})
	}
</script>

<style>

</style>