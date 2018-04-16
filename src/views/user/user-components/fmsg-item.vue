<template>
	<my-card :info="item.user" :time="item.fmsg_time">
		<div slot="content">
			{{item.fmsg_content}}
		</div>
		<Dropdown trigger="click" class="more fr" @on-click="onClick" slot="more">
	        <a href="javascript:void(0)">
	            <Icon type="ios-more" style="font-size:20px;"></Icon>
	        </a>
	        <DropdownMenu slot="list">
	            <DropdownItem name="0">删除</DropdownItem>
	        </DropdownMenu>
	    </Dropdown>
	</my-card>
</template>
<script>
    import {myCard} from '../../components'
	export default {
		components: {
			myCard
		},
		props: ['item', 'index'],
		methods: {
			onClick (val) {
				if (val == 0) {
					this.$emit('openDelModal', this.item.fmsg_id, this.index)
				}
			}
		}
	}
</script>