<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from "vue";

	const url = ref()

	const webviewStyles = {
		progress: {
			color: `$u-primary`
		}
	}

	onLoad((option) => {
		url.value = option.link
	})
</script>

<style>

</style>