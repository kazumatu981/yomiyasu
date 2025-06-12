import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import markdownItMdc from 'markdown-it-mdc'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url);

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
        // ナビゲーションバー
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
        // サイドバー
        sidebar: [
            {
                text: '「よみやすさ」とは',
                link: '/contents/'
            },
            {
                text: '感性的側面',
                prefix: '/contents/emotional/',
                link: '/contents/emotional/',
                children: [
                    {
                        text: 'いってはいけない言葉たち',
                        link: '/contents/emotional/anti-pattern.html'
                    },
                    {
                        text: 'コードは誰の持ち物か',
                        link: '/contents/emotional/public-property.html'
                    },
                    {
                        text: '読み手にやさしさを',
                        link: '/contents/emotional/kindness.html'
                    }

                ]
            },
            {
                text: '技術的側面',
                prefix: '/contents/technical/',
                link: '/contents/technical/',
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
        ],
        sidebarDepth: 1,
        // ロゴ
        logo:  '/assets/img/logo.drawio.svg',

        //プラグイン
        themePlugins: {
            prismjs: {
                theme: 'vs',
            }
        }
    }),

    extendsMarkdown: (md) => {
        md.use(markdownItMdc);
    },
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
    ],

    head: [
        ['script', {src: 'https://kit.fontawesome.com/df9e5b1dd2.js', crossorigin: 'anonymous'}],
        ['link', {rel: 'icon', href: './assets/img/icon.drawio.svg', type: 'image/svg+xml'}],
    ],

    lang: 'ja-JP',

    title: 'よみやすコード',
    description: 'よみやすいコードを書くために私たちは何をすべきか',

    dest: `./dist`,

    base: '/yomiyasu/',
})