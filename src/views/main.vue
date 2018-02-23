<style lang="less" scoped>
  @import "./main.less";
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <meau-header></meau-header>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div style="min-height: 200px;">
                        Content
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
import {meauHeader} from './main-components';
    export default {
        components: {
            meauHeader: meauHeader
        }
    }
</script>