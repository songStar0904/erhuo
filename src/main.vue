<style lang="less" scoped>
  @import "./main.less";
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <meau-header></meau-header>
            </Header>
            <router-view></router-view>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
import {meauHeader} from './views/main-components';
    export default {
        components: {
            meauHeader
        }
    }
</script>