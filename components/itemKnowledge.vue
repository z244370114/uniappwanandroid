<template>
	<view style="padding: 10px; background: #fff;">
		<u-text :text="item.name"></u-text>
		<view class="flex-view">
			<view v-for="(items,index) in item.children" :key="index" style="padding: 5px;">
				<u-tag :text="items.name" plain shape="circle" @click="itemTagClick(index)"></u-tag>
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
</script>

<style lang="scss" scoped>
	.flex-view {
		display: flex;
		flex-flow: wrap;
	}
</style>