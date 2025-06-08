# しくみ

## 三階建て入れ子構造

当たり前の話ですが、家を建てる場合、何階建てにするかを最初に決めます。
ソフトウェアも当たり前のようにそれを決めることからはじます。

まず、ソフトウェアとは何でしょうか？
数学とは違い言葉がちゃんと定義されていませんが、
「ハードウェアを動かすための命令の塊」
や
「人からの命令を受けてハードウェアを動作させる仮想機械」
ととらえるのが一番自然です。

つまり、「人」→「ソフトウェア」→「ハードウェア」という **三階建て構造** になっています。
さらに、ソフトウェアは

* **アプリケーション**: 人と対話しながら、機能を実現するソフトウェア群
* **ミドルウェア**: アプリケーションの機能のうち共通的に使われる機能をまとめたソフトウェア群
* **OS**: ハードウェアに依存せず、コンピュータとして扱えるようにするソフトウェア群

というように **三階建て構造** になっています。
さらに、アプリケーションソフトウェアの多くは `MVC` と呼ばれる **三階建て構造** で設計されています。

このように、ソフトウェアはまるでマトリョーシカのように、 **三階建ての入れ子構造** になっていると言われています。

![三階建て構造](../../assets/img/technical_3layer_structure.drawio.svg)

私たちプログラマの多くは、このアプリケーションソフトウェアの一部を記述することが大半です。
したがいまして、これらと統一感を出すために、ソースコードを記述するときも **三階建ての入れ子構造** にするとすんなりと頭に入ってきます。
ソースコードを記述するときは、この**三階建て入れ子構造**を意識していくと大変読みやすくなります。

## カプセル化

TODO カプセル化について書く
[設計の極意は「カプセル化」にありと言っても過言ではありません。]{.red-text}


## 「カプセル化された三階建て入れ子構造」の実践

以上により、「カプセル化された三階建て入れ子構造」で開発するとコードが読みやすくなるということを説明しました。
それでは、どのようにコードを書いていけば、この構造になるのかを示そうと思います。

まず第一に、
[クラス名、変数名、メソッド名(関数名)にとことんこだわる](./naming.md)
ことは重要です。
そのメソッド(関数)名等から機能を簡単に推測できるようになっている状態を目指しましょう。
こうすることで、コードの読者が読んで理解するときの、コード量が減り読みやすくなります。
これはカプセル化の第一歩です。

その上で、本書では、以下の方法を説明します。

* クラスの抽象化や継承を活用した構造化の考え方
* 中身(メソッドや関数)の実装方針の考え方

クラスの抽象化や継承は難しい概念ですので、まずは、中身の実装方針について見ていきましょう。

### メソッドの中身

```typescript
function runSomething(options: SomeOptions) {
    // ## initialize
    // ### validation
    // 引数, グローバル変数やプロパティなどの妥当性を検証する 
    // ### transformation
    // 処理しやすいように変換する 

    // ## execute
    // ### execution
    // 処理を実行する

    // ## finalize
    // ### transformation
    // 呼び出し元が取り出しやすいように変換する
    // ### return
    // 戻す
}
```

:::tabs

@tab step 0

```typescript{1}
function addMultiples(baseNumber: number, maxNumber: number): number {
    // ## initialize
    // ### validation
    // 引数, グローバル変数やプロパティなどの妥当性を検証する 
    // ### transformation
    // 処理しやすいように変換する 

    // ## execute
    // ### execution
    // 処理を実行する

    // ## finalize
    // ### transformation
    // 呼び出し元が取り出しやすいように変換する
    // ### return
    // 戻す
}
```

@tab step 1

```typescript{5-6,12,17-18,23,27}
function addMultiples(baseNumber: number, maxNumber: number): number {
    // ## initialize
    // ### validation
    // 引数が負の数でないことをチェック
    // 整数チェック
    // ### transformation
    // `{ 1, 2, 3, ..., maxNumber }` の配列を作る

    // ## execute
    // ### execution
    // baseNumberで割り切れるものを取り出す(フィルタ処理をする)
    // フィルタしたものをすべて足し合わせる

    // ## finalize
    // ### transformation
    // 変換の必要はない
    // ### return
    return result;
}
```

@tab step 2

```typescript{6,7,14,20,22,31}
function addMultiples(baseNumber: number, maxNumber: number): number {
    // ## initialize
    // ### validation
    // 引数が負の数でないことをチェック
    if(baseNumber <= 0 || maxNumber <= 0) throw new Error('負の数は使えません');
    // TODO 整数チェック
    // ### transformation
    // `{ 1, 2, 3, ..., maxNumber }` の配列を作る
    const baseArray = Array.from({length: maxNumber}, (_, i) => i + 1);

    // ## execute
    // ### execution
    // baseNumberで割り切れるものを取り出す(フィルタ処理をする)
    const filtered = baseArray.filter(i => i % baseNumber === 0);
    // フィルタしたものをすべて足し合わせる
    const result = filtered = filtered.reduce((acc, next) => acc + next);

    // ## finalize
    // ### transformation
    // 変換の必要はない
    // ### return
    return result;
}
```

@tab step 3

```typescript
function addMultiples(baseNumber: number, maxNumber: number): number {

    // 引数が負の数でないことをチェック
    if(baseNumber <= 0 || maxNumber <= 0) throw new Error('負の数は使えません');
    // TODO 整数チェック
    // `{ 1, 2, 3, ..., maxNumber }` の配列を作る
    const baseArray = Array.from({length: maxNumber}, (_, i) => i + 1);

    // baseNumberで割り切れるものを取り出す(フィルタ処理をする)
    const filtered = baseArray.filter(i => i % baseNumber === 0);
    // フィルタしたものをすべて足し合わせる
    const result = filtered = filtered.reduce((acc, next) => acc + next);

    return result;
}
```

:::

### 継承モデルの考え方
