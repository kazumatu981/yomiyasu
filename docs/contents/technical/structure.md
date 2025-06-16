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

[設計の極意は「カプセル化」にありと言っても過言ではありません。]{.red-text}

::labeled-container-with-fa-icon{type="info" label="定義: カプセル化とは"}

ソフトウェア設計において重要な概念のひとつです。
オブジェクト指向設計において、データ（属性）や、データを操作するメソッド（関数）をひとつのオブジェクトにまとます。
外部から直接アクセスできないようにすることで、ソフトウェアの保守性や安全性を向上させることが目的です。

::

カプセル化の目的には、次の3つの目的があります。

* **データの保護:** 外部から直接変更できないようにし、不正な操作や予期しない変更を防ぐ。
* **コードの柔軟性:** 内部実装を変更しても、外部のコードに影響を与えずに済む。
* **結合度の低減:** モジュール間の依存関係を減らし、変更の影響範囲を小さくする。

なにやら難しい単語が多くてわかりにくくなっています。
身近なもので、よく似た概念を紹介します。
よく似た概念として、**ブラックボックス化** が挙げられます。
例えば、小学校の工作で使ったモータを思い浮かべてください。
小学生の段階では、モータがどのような原理で動いるかは知らないですし、内部構造がどのようなになっているかを知りません。
でも、モータを使うと回転動力を得られることは習いました。
モータの構造を知らなくとも、回転動力が得られるわけです。
この状態がカプセル化された状態と考えればわかりやすいでしょう。

つまり、機能の一部を呼び出し側から隠ぺい化することが呼び出し側の構造を理解しやすくしようということです。
処理の大まかな流れを理解できて、すんなりと処理全体を把握できるようになります。

![処理フロー](../../assets/img/technical_cupsul.drawio.svg)

ここでは、オブジェクト指向設計の言葉で解説しました。
この考え方は、手続き型言語で設計できないというわけではありません。
例えば、C言語で機能を実装することを想像してください。
`*.h` に記述する関数や変数を、外部に公開したメソッドやプロパティとしてとらえると、
「設計としては、オブジェクト指向」のように扱えます。

ここで重要なことは、
[一部の処理構造を、呼び出し側から隠して]{.blue-text}、
[内部の実装を知らずとも、機能を実現できる手段を提供できる]{.blue-text}
ということです。

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

### メソッド(関数)の中身

#### フローチャートはどう書けばいい？

プログラミングを始めたてのころ、
[関数を実装するときは、フローチャートを描こう]{.green-text}
と習います。
ただし、[フローチャートをどのように書けばよいか]{.red-text} はなかなか習う機会がありません。
文法は習いますが、どう使うかを習いません。
なので、うまく設計できないのです。
今回は、うまく設計するひとつのヒントとして「三階建て構造」のパターンを例を示しながら説明します。

#### 三階建てのパターン

現在一般的に使われているプログラミング言語の多くは、チューリング型と呼ばれる、設計します。
つまり、やることを順々に書いていくスタイルが最小単位の設計になります。
それでは、一番小さい単位である関数は、どのような順で書いていけばいいでしょうか？

筆者は次の構造で書くことを推奨します。

* [initialize: ]{.blue-text}準備
  * validation
    * 引数や状態変数などの妥当性を検証する
  * initialization
    * 各種状態を初期化する
* [execute: ]{.blue-text}実行
  * 実装したい処理の本体を記述する
* [finalize: ]{.blue-text}後片付け
  * 出力処理や後処理を記述する

#### 三階建てパターンの実装例

それでは、三階建てパターンの実装例を示します。
引数で指定する数(`baseNumber`) の倍数をある数(`maxNumber`)まで足し合わせる関数の実装を考えます。

step0 から順に最初はコメント文を多めに記述して順に実装していって最後に余計なコメント文を削除します。

:::tabs

@tab step 0

```typescript{1}
function addMultiples(baseNumber: number, maxNumber: number): number {
// * [initialize: ]{.blue-text}準備
//   * validation
//     * 引数や状態変数などの妥当性を検証する
//   * initialization
//     * 各種状態を初期化する
// * [execute: ]{.blue-text}実行
//   * 実装したい処理の本体を記述する
// * [finalize: ]{.blue-text}後片付け
//   * 出力処理や後処理を記述する
}
```

まずは関数のインタフェースを定めて、三階建てパターンの「下敷き」を作ります。
Visual Studio Codeなどでは、コードスニペットなどを使うとパターンを忘れないので、便利です。

@tab step 1

```typescript{5-6,12,17-18,23,27}
function addMultiples(baseNumber: number, maxNumber: number): number {
// * [initialize: ]{.blue-text}準備
//   * validation
//     * 引数や状態変数などの妥当性を検証する
//   * initialization
//     * 各種状態を初期化する

// * [execute: ]{.blue-text}実行
//   * 実装したい処理の本体を記述する

// * [finalize: ]{.blue-text}後片付け
//   * 出力処理や後処理を記述する
    return result;
}
```

コメントに空行を入れたり、最後の出力は `return` 文で決まっているので、あらかじめ準備します。

@tab step 2

```typescript{6,7,14,20,22,31}
function addMultiples(baseNumber: number, maxNumber: number): number {
    // * [initialize: ]{.blue-text}準備
    //   * validation
    // 引数が負の数でないことをチェック
    if(baseNumber <= 0 || maxNumber <= 0) throw new Error('負の数は使えません');
    // ToDo 整数チェック
    //   * initialization
    //     * 各種状態を初期化する
    // `{ 1, 2, 3, ..., maxNumber }` の配列を作る
    const baseArray = Array.from({length: maxNumber}, (_, i) => i + 1);

    // * [execute: ]{.blue-text}実行
    //   * 実装したい処理の本体を記述する
    // baseNumberで割り切れるものを取り出す(フィルタ処理をする)
    const filtered = baseArray.filter(i => i % baseNumber === 0);
    // フィルタしたものをすべて足し合わせる
    const result = filtered = filtered.reduce((acc, next) => acc + next);

    // * [finalize: ]{.blue-text}後片付け
    //   * 出力処理や後処理を記述する
    return result;

}
```

そろそろ概形が見えてきました。
これだと、コメントが余計ですね

@tab step 3

```typescript
function addMultiples(baseNumber: number, maxNumber: number): number {

    // 引数が負の数でないことをチェック
    if(baseNumber <= 0 || maxNumber <= 0) throw new Error('負の数は使えません');
    // ToDo 整数チェック
    // `{ 1, 2, 3, ..., maxNumber }` の配列を作る
    const baseArray = Array.from({length: maxNumber}, (_, i) => i + 1);

    // baseNumberで割り切れるものを取り出す(フィルタ処理をする)
    const filtered = baseArray.filter(i => i % baseNumber === 0);
    // フィルタしたものをすべて足し合わせる
    const result = filtered = filtered.reduce((acc, next) => acc + next);

    return result;
}
```

余計なコメントを削除して完成です。
どうですか読みやすいコードが実装できましたね。

:::

このように、最初はコメントを多い目に記述してそれを整理しながら、コードを完成していきます。

### 継承モデルの考え方

多くの高級開発言語は、オブジェクト指向のパラダイムを持っています。
この機構は、コード設計を抽象化し、処理メインフローを直感的にとらえやすくするのに、大きな役割を果たしています。
その中でも、実装と継承という考え方があります。
実はこの考え方は、「カプセル化」を実現するための重要な役割を果たしています。

特に、実装と継承がカプセル化に大きく貢献します。

例えば下記のような、何らかの結果を出力するクラスを設計したと仮定します。

```typescript
interface ResultWriter {
  writeResult(result: Result): Promise<void>
}

abstract class ResultWriterBase implements ResultWriter {
  abstract protected writeLine(line: string): Promise<void>;
  public writeResult(result: Result): Promise<void> {
    // result ---> line
    return this.writeLine(line);
  }
}

class FileResultWriter extends ResultWriterBase {
  protected witeLine(line: string): Promise<void> {
    // write into file....
  }
}

class ConsoleResultWriter extends ResultWriterBase {
  protected witeLine(line: string): Promise<void> {
    // write into console....
  }
}
```

クラス図で書くと、以下のようになります。

![クラス図](../../assets/img/thecnical_extends_model.drawio.svg)

このようなクラス設計の場合、これらのクラスを使って、結果を取りまとめるメソッドを以下のように実装できます。

```typescript
function printResult(args: SomeArgs, writer: ResultWriter) {
  // 引数チェック
  // 結果の取得
  const results = getResult(/* 何らかの処理を実装 */);

  // 結果の出力
  for(const result of results) {
    writer.writeResult(result);
  }
}
```

このように、より抽象度が高い `interface` を使うことで、それを使う `printResult()` はどこに出力するかを意識せずとも実装ができるようになる。

さらに、`class` -> `abstract class` -> `interface` の順に抽象度が上がります。
以上のように、「カプセル化された三階建て入れ子構造」を実現できました。
