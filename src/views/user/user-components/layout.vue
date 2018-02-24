<template>
	<Card :padding="30" style="width:800px;height:500px;margin:50px auto;">
        <Row>
	        <Col span="16" style="padding:0 80px">
		        <Menu mode="horizontal" theme="light">
			        <MenuItem name="email">
			            <Icon type="ios-eamil"></Icon>
			            {{title}}
			        </MenuItem>
			    </Menu>
			    <slot name="form"></slot>
	        </Col>
	        <Col span="8" style="margin-top:50px;padding:150px 30px; border-left:1px solid #dddee1;">
            <slot name="right"></slot>
            </Col>
	    </Row>
    </Card>
</template>
<script>
	export default {
		props: ['title']
	}
</script>