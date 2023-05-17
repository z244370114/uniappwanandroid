<template>
	<view>

	</view>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { onLoad } from '@dcloudio/uni-app'
	import apis from '@/service/api/index.js'

	const list = ref([])


	onLoad((options) => {
		loadData()
	})

	function loadData() {
		debugger
		apis.collectionList(1).then((res) => {
			console.log("res = " + res);
		})
	}
</script>

<style>

</style>