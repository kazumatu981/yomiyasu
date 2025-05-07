import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar:[
            {
                text: 'about',
                link: '/about.html',
            }
        ],
        sidebar: [
            {
                text: '目標をきめる',
                prefix: '/contents/',
                link: '/contents/'
            },
            {
                text: '名前にこだわる',
                prefix: '/contents/naming/',
                link: '/contents/naming/',
                children: [
                    {
                        text: '名は体を表す',
                        link: '/contents/naming/name-means-function.html'
                    },
                    {
                        text: '動詞 vs 名詞',
                        link: '/contents/naming/verb-vs-noun.html'
                    },
                    {
                        text: '大文字と小文字',
                        link: '/contents/naming/capitalization.html'
                    },
                ]
            },
            {
                text: 'メトリクスにこだわる',
                prefix: '/contents/metrics/',
                link: '/contents/metrics/'
            } ,
            {
                text: '仕組みにこだわる',
                prefix: '/contents/functionblock/',
                link: '/contents/functionblock/'
            },           
            {
                text: 'このドキュメントについて',
                link: '/about.html'
            },
        ]
    }),

    lang: 'ja-JP',
    title: 'よみやすいコード',
    description: 'よみやすいコードを書くために私たちは何をすべきか',
    dest: `./dist`,

    base: '/yomiyasu/',
})