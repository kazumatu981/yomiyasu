import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import markdownItMdc from 'markdown-it-mdc'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar:[
            {
                text: 'home',
                link: '/',
            },
            {
                text: 'about',
                link: '/about.html',
            }
        ],
        sidebar: [
            {
                text: '「よみやすさ」とは',
                prefix: '/contents/',
                link: '/contents/'
            },
            {
                text: '感性',
                prefix: '/contents/emotion/',
                children: [
                    {
                        text: '物語',
                        link: '/contents/emotion/story.html'
                    },
                    {
                        text: 'やさしさ',
                        link: '/contents/emotion/kindness.html'
                    }

                ]
            },
            {
                text: '技術',
                prefix: '/contents/technical/',
                children: [
                    {
                        text: '名付け',
                        link: '/contents/technical/naming.html'
                    },
                    {
                        text: '空白とコメント',
                        link: '/contents/technical/spacing-and-comment.html'
                    },
                    {
                        text: 'メトリクス',
                        link: '/contents/technical/metrics.html'
                    },
                    {
                        text: 'しくみ',
                        link: '/contents/technical/structure.html'
                    },
                ]
            },
        ]
    }),

    extendsMarkdown: (md) => {
        md.use(markdownItMdc);
    },

    head: [
        ['script', {src: 'https://kit.fontawesome.com/df9e5b1dd2.js', crossorigin: 'anonymous'}],
    ],

    lang: 'ja-JP',
    title: 'よみやすいコード',
    description: 'よみやすいコードを書くために私たちは何をすべきか',
    dest: `./dist`,

    base: '/yomiyasu/',
})