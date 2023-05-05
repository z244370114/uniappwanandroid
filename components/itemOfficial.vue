<template>
	<view style="padding: 10px; background: #fff;">
		<u-row justify="space-between">
			<u-col span="8">
				<u--text :text="item.author" color="#cccccc" align="left" mode="name" size="12"></u--text>
			</u-col>
			<u-col span="3">
				<u--text :text="item.shareDate" color="#cccccc" mode="date" size="12"></u--text>
			</u-col>
		</u-row>
		<u-text class="title" :text="item.title" :lines="2" margin="5px"></u-text>
		<u-row justify="space-between">
			<u-col span="11" justify="start" textAlign="center">
				<u--text :text="item.superChapterName" color="#cccccc" size="12"></u--text>
			</u-col>
			<u-col span="1">
				<u-image width="28px" height="28px"></u-image>
			</u-col>
		</u-row>
		<u-line style="padding-top: 10px;"></u-line>
	</view>
</template>

<script setup>
	const pros = defineProps(['item'])
</script>

<style lang="scss" scoped>

</style>