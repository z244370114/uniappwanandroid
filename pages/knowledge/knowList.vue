<template>
	<view>
		<view>
			<u-tabs :list="list" :current="current" @change="tabsChange" :is-scroll="true"></u-tabs>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app'


	const list = ref([{
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, {
		"name": "测试",
	}, ])

	onLoad((option) => {
		uni.setNavigationBarTitle({
			title: option.title
		});
	})
	
	
	
</script>

<style>

</style>