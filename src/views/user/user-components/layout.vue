<template>
	<Card :padding="30" style="width:800px;height:500px;margin:50px auto;">
        <Row>
	        <Col span="16" style="padding:0 80px">
		        <Menu mode="horizontal" theme="light" active-name="1">
			        <MenuItem name="1">
			            <Icon type="ios-eamil"></Icon>
			            {{title}}
			        </MenuItem>
			    </Menu>
			    <slot name="form"></slot>
	        </Col>
	        <Col span="8" style="margin-top:50px;padding:150px 30px; border-left:1px solid #dddee1;">
            <p>{{h1}}</p>
            <Button type="text" @click="change_router">{{btn_text}}</Button>
            </Col>
	    </Row>
    </Card>
</template>
<script>
	export default {
		props: ['title', 'router', 'h1', 'btn_text'],
		methods: {
			change_router () {
				this.$router.push({
                    name: this.router
                });
			}
		}
	}
</script>