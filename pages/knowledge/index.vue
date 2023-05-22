<template>
	<u-sticky>
		<u-subsection :list="titleList" :current="titleIndex" @change="sectionChange"></u-subsection>
	</u-sticky>
	<swiper :current="titleIndex" style="height: 100vh;">
		<swiper-item v-for="(itemList, indexs) in itemLists" :key="indexs">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in itemList" :key="index">
					<itemKnowledge :item="item" @click="itemClick(index)"></itemKnowledge>
				</u-list-item>
			</u-list>
		</swiper-item>
	</swiper>

</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import itemKnowledge from '@/components/itemKnowledge.vue'

	import { onLoad } from '@dcloudio/uni-app'

	const titleList = ref(['体系', '导航'])
	const titleIndex = ref(0)

	const itemLists = ref([])

	onLoad(() => {
		loadData()
	})

	function scrolltolower() {

	}

	function sectionChange(index) {
		titleIndex.value = index
	}


	function itemClick(index) {
		titleIndex.value = index
	}

	function loadData() {
		uni.request({
			url: 'https://www.wanandroid.com/tree/json',
			success: (res => {
				itemLists.value[titleIndex.value] = res.data.data
			})
		})
	}
</script>

<style>
</style>