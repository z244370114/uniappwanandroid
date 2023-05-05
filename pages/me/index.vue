<template>
	<view>
		<view class="bg-view">
			<u--image class="images" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle" :lazy-load="true"
				:fade="true" duration="450" width="80px" height="80px"></u--image>
			<u--text align="center" color="#fff" margin="10px" text="玩Android"></u--text>
			<u--text align="center" color="#fff" text="id"></u--text>
		</view>
		<u-cell-group border="false">
			<u-cell icon="setting-fill" size="mini" title="收藏" isLink url="/pages/componentsB/tag/tag"></u-cell>
			<u-cell icon="setting-fill" size="mini" title="关于我" isLink url="/pages/componentsB/tag/tag"></u-cell>
			<u-cell icon="setting-fill" size="mini" title="设置" isLink url="/pages/componentsB/tag/tag"></u-cell>
		</u-cell-group>
	</view>
</template>


<script lang="ts" setup>



</script>


<style lang="scss" scoped>
	.bg-view {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		background: $u-primary;
		padding: 30px 30px;

		.images {
			align-items: center;
		}
	}
</style>