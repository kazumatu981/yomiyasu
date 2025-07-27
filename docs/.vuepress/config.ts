import {viteBundler} from '@vuepress/bundler-vite'
import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import markdownItMdc from 'markdown-it-mdc'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url);

export default defineUserConfig({

    // ---------------------------------------
    // Site
    base: '/yomiyasu/',
    lang: 'ja-JP',
    title: 'よみやすコード',
    description: 'コードを書くために私たちは何をすべきか',
    head: [
        // font-awesome
        ['script', {src: 'https://kit.fontawesome.com/df9e5b1dd2.js', crossorigin: 'anonymous'}],
        // Google Analytics
        ['script', {async: true, src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}],
        ['script', {}, `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_ID}');
        `],
        // favicon
        ['link', {rel: 'icon', href: '/logo/icon.drawio.svg', type: 'image/svg+xml'}],
    ],

    // ---------------------------------------
    // Theme
    theme: defaultTheme({
        // ナビゲーションバー
        navbar:[
            {
                text: 'home',
                link: '/',
            },
            {
               text: 'let\'s start',
               link: '/contents/', 
            },
            {
                text: 'contents',
                children: [
                    {
                        text: '感性的側面',
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
                    {
                        text: 'お道具箱',
                        link: '/contents/tools/',
                        children: [
                            {
                                text: '「よみやすさ」を維持するツール',
                                link: '/contents/tools/tools.html'
                            },
                            {
                                text: '生成AIとのつきあい方',
                                link: '/contents/tools/gen-ai.html'
                            }
                        ]
                    }
                ]
            },
            {
                text: 'about',
                link: '/about.html',
            },
            {
                text: 'history',
                link: 'history.html',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/kazumatu981/yomiyasu',
                target: '_blank',
                rel: 'noopener noreferrer',
            }
        ],
        // サイドバー
        sidebar: [
            {
                text: 'Home',
                link: '/'
            },
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
            {
                text: 'お道具箱',
                prefix: '/contents/tools/',
                link: '/contents/tools/',
                children: [
                    {
                        text: '「よみやすさ」を維持するツール',
                        link: '/contents/tools/tools.html'
                    },
                    {
                        text: '生成AIとのつきあい方',
                        link: '/contents/tools/gen-ai.html'
                    }
                ]
            },
            {
                text: 'このドキュメントについて',
                link: '/about.html'
            },
            {
                text: '改訂履歴',
                link: '/history.html'
            }
        ],
        sidebarDepth: 1,
        // ロゴ
        logo:  '/logo/logo.drawio.svg',

        //プラグイン
        themePlugins: {
            prismjs: {
                theme: 'vs',
            }
        }
    }),

    // ---------------------------------------
    // Bundler
    bundler: viteBundler(),

    // ---------------------------------------
    // Common
    dest: `./dist`,

    // ---------------------------------------
    // Markdown
    extendsMarkdown: (md) => {
        md.use(markdownItMdc);
    },

    // ---------------------------------------
    // Plugin
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
    ],


})