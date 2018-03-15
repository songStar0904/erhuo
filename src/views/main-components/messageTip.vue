<style scoped>
    .message-con{
        display: inline;
        padding: 0 20px;
    }
</style>
<template>
    <router-link :to="{ name: 'comment' query: {status: 0}}" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </router-link>
</template>
<script>
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    }
};
</script>
