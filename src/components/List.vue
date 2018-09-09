<template>
    <ul class="proList">
        <li class="proItem" v-for="movieItem of list" :key="movieItem.id">
            <div class="proImg">
                <img :src="movieItem.images.small" alt="">
            </div>
            <div class="proInfo">
                <h3>{{movieItem.title}}</h3>
                <p class="rating">
                    <span>{{movieItem.rating.average}}</span>分
                    &nbsp;&nbsp;
                    /
                    &nbsp;&nbsp;
                    <span>{{movieItem.year}}</span>
                </p>
                <p class="directors">
                    导演：<span v-for="directorItem of movieItem.directors">{{directorItem.name}}</span>
                </p>
                <p class="casts">
                    演员：<span v-for="castItem of movieItem.casts">{{castItem.name}}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                </p>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
//        props: ['list'],
        props: {
            list: {
                type: Array,
                default: () => {
                    return [1,1,1]
                }
            }
        }
    }
</script>
<style lang="scss">
    @import '@/lib/reset.scss';
    .proList {
        @include rect(100%, auto);
        .proItem {
            @include rect(100%, 1.1rem);
            @include flexbox();
            @include flex-direction();
            @include border(0 0 1px 0, #ccc, solid);
            .proImg {
                @include rect(1.1rem, 1.1rem);
                img {
                    @include rect(1rem, 1rem);
                    @include margin(0.05rem);
                }
            }
            .proInfo {
                @include flex();
                @include rect(auto, 1.1rem);
                @include margin(0 0 0 0.05rem);
                @include padding(0.06rem 0 0 0);
                p {
                    @include font-size(0.12rem);
                    &.rating{
                        span {
                            @include text-color(#f66);
                            @include font-size(0.16rem);
                        }
                    }
                    &.directors {
                        @include ellipsis(100%, 1);
                    }
                    &.casts {
                        @include ellipsis(100%, 2);
                    }

                }
            }
        }
    }
</style>