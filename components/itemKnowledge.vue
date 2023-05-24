<template>
	<view style="padding: 10px; background: #fff;">
		<u-text :text="item.name"></u-text>
		<view class="flex-view">
			<view v-if="!!item.children" v-for="(items,index) in item.children" :key="index" style="padding: 5px;">
				<u-tag :text="items.name" plain shape="circle" @click="itemTagClick(index)"></u-tag>
			</view>
			<view v-else v-for="(items,index) in item.articles" :key="index"  style="padding: 5px;">
				<u-tag :text="items.title" plain shape="circle" @click="itemNaivClick(index)"></u-tag>
			</view>
		</view>
	</view>
</template>

<script setup>
	const pros = defineProps(['item'])

	function itemTagClick(index) {
		uni.navigateTo({
			url: "/pages/knowledge/knowList?title=" + pros.item.name + "&index=" + index +
				"&data=" + encodeURIComponent(JSON.stringify(pros.item))
		})
	}

	function itemNaivClick(index) {
		debugger
		uni.navigateTo({
			url: '/pages/webview/webview?link=' + pros.item.articles[index].link
		})
	}
</script>

<style lang="scss" scoped>
	.flex-view {
		display: flex;
		flex-flow: wrap;
	}
</style>