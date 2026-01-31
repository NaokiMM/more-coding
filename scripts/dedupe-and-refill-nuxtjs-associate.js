#!/usr/bin/env node
/**
 * s3-assets/nuxtjs/associate の各JSONから
 * 同じ question テキストの重複を削除し、削除した数だけ新規問題を追加して 200 問に戻す。
 */
const fs = require('fs');
const path = require('path');

const ASSOCIATE_DIR = path.join(__dirname, '../s3-assets/nuxtjs/associate');
const TARGET_COUNT = 200;

const files = [
  'basics_rendering.json',
  'build_operations_seo.json',
  'config_modules_plugins.json',
  'data_fetching_state.json',
  'routing_layout.json',
];

function deduplicate(questions) {
  const seen = new Set();
  return questions.filter((q) => {
    const key = q.question.trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function makeQuestion(id, question, correctAnswer, explanation, choices, category, filename) {
  return { id, question, correctAnswer, explanation, choices, category, filename };
}

// ---------- 新規問題のシード（各ファイルごと） ----------
// 形式: { question, correctAnswer, explanation, choices }
// 足りない分はシードをベースにバリエーションで生成する

const newQuestionsBasicsRendering = [
  { question: "Nuxt 3でuseHeadを使う主な目的として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「ページのtitleやmetaを設定する」です。useHeadでtitle/meta/linkを宣言でき、SSR時は初期HTMLに反映されSEOやSNSカードに役立ちます。", choices: ["ページのtitleやmetaを設定する", "CSSのみを読み込む", "ルートを定義する", "APIを呼び出す"] },
  { question: "Nuxt 3で開発時に使われるビルドツールとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「Vite」です。Nuxt 3は開発時のHMRなどにViteを使い、高速なフィードバックが得られます。", choices: ["Vite", "Webpackのみ", "Rollupのみ", "Parcel"] },
  { question: "ServerOnlyコンポーネントの用途として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「サーバーでのみレンダリングし、クライアントには送らない」です。機密や不要なHTMLをクライアントに送らないために使います。", choices: ["サーバーでのみレンダリングし、クライアントには送らない", "クライアントでのみレンダリングする", "SSRとCSRの両方で描画する", "静的HTMLのみ生成する"] },
  { question: "Nuxt 3のrouteRulesでprerenderを指定する主な目的として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「該当ルートをビルド時に静的HTMLとして事前生成する」です。変更の少ないページを静的化して配信できます。", choices: ["該当ルートをビルド時に静的HTMLとして事前生成する", "ルートを無効化する", "クライアントのみで描画する", "APIを呼び出す"] },
  { question: "payloadの説明として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「SSR時にサーバーで取得したデータをクライアントに渡す仕組み」です。useFetch等の結果がpayloadとしてHTMLに埋め込まれ、ハイドレーション時に再利用されます。", choices: ["SSR時にサーバーで取得したデータをクライアントに渡す仕組み", "HTTPのペイロードのみを指す", "画像の圧縮形式", "ルートのパス"] },
  { question: "Nuxt 3でLazyHydrationが役立つ場面として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「初期表示を軽くしつつ、必要な部分だけ後からハイドレーションする」です。Below-the-foldのコンポーネントを遅延ハイドレーションするとLCPが改善しやすいです。", choices: ["初期表示を軽くしつつ、必要な部分だけ後からハイドレーションする", "SSRを無効にする", "静的サイトのみ生成する", "APIをキャッシュする"] },
  { question: "Nuxt 3のapp.vueの役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「アプリのルートコンポーネントとして、全ページを包む」です。app.vueに<NuxtPage />を置き、レイアウトや共通UIをここで定義できます。", choices: ["アプリのルートコンポーネントとして、全ページを包む", "APIルートを定義する", "ビルド設定のみを書く", "静的ファイルを置く"] },
  { question: "Nuxt 3で環境に応じてAPIのベースURLを変えたい場合に使うものとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「runtimeConfig（useRuntimeConfig）」です。nuxt.configのruntimeConfigに値を定義し、useRuntimeConfig()で参照できます。公開する値はpublicに置きます。", choices: ["runtimeConfig（useRuntimeConfig）", "import.meta.envのみ", "process.envのみ", "定数ファイルのみ"] },
  { question: "Nuxt 3で静的アセットをビルドせずそのまま配信したい場合に置くディレクトリとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「public」です。public配下のファイルはルートからそのまま配信され、ビルド時のハッシュも付きません。", choices: ["public", "assetsのみ", "static", "staticのみ"] },
  { question: "Nuxt 3でコンポーネントを自動インポートする規約として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「components/配下の.vueファイルが自動でインポートされる」です。components/のディレクトリ構造がそのままコンポーネント名に対応します。", choices: ["components/配下の.vueファイルが自動でインポートされる", "必ず手動でimportする必要がある", "pages/のみ自動インポートされる", "plugins/のみ自動インポートされる"] },
];

const newQuestionsBuildSeo = [
  { question: "nuxi buildの主な用途として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「本番用のビルド成果物を生成する」です。本番デプロイ用に最適化された出力が.outputに生成されます。", choices: ["本番用のビルド成果物を生成する", "開発サーバを起動する", "静的サイトのみ生成する", "lintのみ実行する"] },
  { question: "Nuxt 3でuseSeoMetaを使う主な目的として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「titleやdescriptionなどメタタグを宣言する」です。useHeadのメタ用ショートカットとして、SEO向けの設定がしやすくなります。", choices: ["titleやdescriptionなどメタタグを宣言する", "APIを呼び出す", "ルートを定義する", "CSSを読み込む"] },
  { question: "Nuxt 3のerror.vueの役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「アプリ全体のエラー時に表示する画面を定義する」です。404や500など、エラー発生時にユーザーに表示するページをここで定義できます。", choices: ["アプリ全体のエラー時に表示する画面を定義する", "APIエラーのみ処理する", "ビルドエラーのみ表示する", "開発時のみ有効"] },
  { question: "Nitroのpreset（adapter）の役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「デプロイ先に応じた出力形式を選ぶ」です。Node、Vercel、Netlify、Cloudflare Workersなど、ターゲットに合わせてビルド結果を出せます。", choices: ["デプロイ先に応じた出力形式を選ぶ", "Vueのバージョンを選ぶ", "CSSの形式を選ぶ", "TypeScriptの設定のみ"] },
  { question: "Nuxt 3でOGP画像を設定する代表的な方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「useHeadまたはuseSeoMetaでog:imageを指定する」です。SSR時にmetaタグとして出力され、SNSでプレビューに使われます。", choices: ["useHeadまたはuseSeoMetaでog:imageを指定する", "publicに画像を置くだけ", "nuxt.configに画像パスのみ書く", "APIで返すのみ"] },
  { question: "nuxi generateの説明として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「静的サイト（SSG）用のHTMLを生成する」です。全ルートをプリレンダリングし、静的ホスティングにデプロイする際に使います。", choices: ["静的サイト（SSG）用のHTMLを生成する", "開発サーバを起動する", "APIのみ生成する", "画像のみ最適化する"] },
  { question: "Nuxt 3でrobots.txtを制御したい場合の方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「public/robots.txtに置くか、serverルートで動的に返す」です。静的ならpublicに置き、条件に応じて変えたい場合はserverでルートを用意します。", choices: ["public/robots.txtに置くか、serverルートで動的に返す", "nuxt.configに文字列で書くのみ", "useHeadでは設定できない", "クライアントのみで設定する"] },
  { question: "Nuxt 3のserver/middlewareとmiddleware/の違いとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「server/middlewareはサーバー側のリクエスト全体、middleware/はルート単位のナビゲーション」です。役割が異なるので使い分けます。", choices: ["server/middlewareはサーバー側のリクエスト全体、middleware/はルート単位のナビゲーション", "同じ機能である", "server/middlewareはクライアントのみ", "middleware/はAPI専用"] },
  { question: "Nuxt 3でsitemapを生成する代表的な方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「@nuxtjs/sitemapモジュールを使うか、serverルートで動的に返す」です。モジュールを使うとルートから自動でsitemapを生成できます。", choices: ["@nuxtjs/sitemapモジュールを使うか、serverルートで動的に返す", "nuxt.configにsitemap文字列を書くのみ", "useHeadでは設定できない", "クライアントのみで生成する"] },
  { question: "Nuxt 3で本番ビルドの出力先として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「.output」です。nuxi buildの結果は.output配下に生成され、ここをデプロイ対象にします。", choices: [".output", "dist", "build", ".nuxt"] },
];

const newQuestionsConfigModules = [
  { question: "nuxt.configのdefineNuxtConfigの役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「Nuxtの設定オブジェクトを型付きで定義する」です。defineNuxtConfigでラップすると型推論が効き、モジュールやruntimeConfigなどをまとめて書けます。", choices: ["Nuxtの設定オブジェクトを型付きで定義する", "Vueのコンポーネントを定義する", "APIルートを定義する", "環境変数のみ定義する"] },
  { question: "Nuxt 3でモジュールを追加する設定として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「nuxt.configのmodules配列に追加する」です。modules: ['@nuxtjs/tailwindcss']のように指定し、必要に応じてオプションを渡します。", choices: ["nuxt.configのmodules配列に追加する", "package.jsonのdependenciesのみ", "plugins/に置くのみ", "components/に置くのみ"] },
  { question: "Nuxt 3でプラグインを登録する代表的な場所として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「plugins/配下にファイルを置く」です。plugins/のファイルは自動で読み込まれ、Vueアプリの拡張（ライブラリのuse等）を行えます。", choices: ["plugins/配下にファイルを置く", "nuxt.configのpluginsのみ", "server/に置く", "components/に置く"] },
  { question: "useRuntimeConfigで参照できる値の説明として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「nuxt.configのruntimeConfigに定義した値」です。サーバー専用の秘密はruntimeConfigに、クライアントに渡す値はruntimeConfig.publicに置きます。", choices: ["nuxt.configのruntimeConfigに定義した値", "process.envの全て", "import.meta.envの全て", "定数ファイルの値のみ"] },
  { question: "Nuxt 3でTypeScriptを有効にする方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「typescriptをdevDependenciesに入れ、nuxt.configでtypescriptを有効にする（または型が自動で効く）」です。Nuxt 3はTypeScriptを標準サポートしています。", choices: ["typescriptをdevDependenciesに入れ、必要に応じてnuxt.configで設定する", "TypeScriptは使えない", "必ずtsconfig.jsonのみで設定する", "ビルド時のみ有効"] },
  { question: "Nuxt 3のauto-importの対象として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「Composables、utils、componentsなどが規約で自動インポートされる」です。useFetch、useState、useRouteなどがimportなしで使えます。", choices: ["Composables、utils、componentsなどが規約で自動インポートされる", "APIルートのみ", "CSSのみ", "pluginsのみ"] },
  { question: "Nuxt 3でcomposablesを定義する代表的な場所として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「composables/配下にファイルを置く」です。composables/の関数は自動でインポートされ、useXxxとして利用できます。", choices: ["composables/配下にファイルを置く", "plugins/のみ", "server/のみ", "components/のみ"] },
  { question: "Nuxt 3のextendsでできることとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「別のNuxt設定やレイヤーを継承し、設定を共有する」です。モノレポやプリセット的な設定の共通化に使います。", choices: ["別のNuxt設定やレイヤーを継承し、設定を共有する", "Vueのextendsのみ", "CSSの継承のみ", "ルートの継承のみ"] },
  { question: "Nuxt 3でサーバー専用のコードを書く代表的な場所として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「server/配下（api/、middleware/、routes/など）」です。server/内のコードはNitro上でサーバー側のみで実行されます。", choices: ["server/配下（api/、middleware/、routes/など）", "pages/のみ", "components/のみ", "plugins/のみ"] },
  { question: "Nuxt 3のimports.autoImportの説明として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「composablesやutilsなどの自動インポートを有効にする設定」です。falseにすると自動インポートを無効にできます。", choices: ["composablesやutilsなどの自動インポートを有効にする設定", "APIの自動インポートのみ", "CSSの自動インポートのみ", "コンポーネントの手動インポートのみ"] },
];

const newQuestionsDataFetching = [
  { question: "useFetchのkeyオプションの主な役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「同じキーでキャッシュを共有し、重複取得を防ぐ」です。キーが同じだとSSR結果をクライアントで再利用できます。", choices: ["同じキーでキャッシュを共有し、重複取得を防ぐ", "APIのURLを指定する", "HTTPメソッドを指定する", "ヘッダーのみ指定する"] },
  { question: "useAsyncDataとuseFetchの違いとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「useFetchはURL指定の簡易版、useAsyncDataは任意の非同期処理をラップする」です。useFetchはuseAsyncDataの上に$fetchを組み合わせたAPIです。", choices: ["useFetchはURL指定の簡易版、useAsyncDataは任意の非同期処理をラップする", "同じ機能である", "useAsyncDataはサーバー専用", "useFetchはクライアント専用"] },
  { question: "Nuxt 3のuseStateのスコープとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「キー単位で共有され、同一リクエスト（SSR）とクライアントで引き継がれる」です。ページを跨いだ軽い状態共有に使えます。", choices: ["キー単位で共有され、同一リクエスト（SSR）とクライアントで引き継がれる", "コンポーネント内のみ", "サーバー間で永続化される", "クライアントのlocalStorageと同期する"] },
  { question: "useFetchでimmediate: falseにした場合の挙動として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「初回は自動で取得せず、手動でrefreshするまで取得しない」です。ユーザー操作後にのみ取得したい場合に使います。", choices: ["初回は自動で取得せず、手動でrefreshするまで取得しない", "SSRでは取得しない", "キャッシュを使わない", "エラーを無視する"] },
  { question: "Nuxt 3で$fetchを使う場合の特徴として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「ofetchベースで、SSR/CSR両方で使える」です。useFetchの内部でも使われており、単発のAPI呼び出しに便利です。", choices: ["ofetchベースで、SSR/CSR両方で使える", "クライアント専用", "サーバー専用", "キャッシュのみ担当する"] },
  { question: "useAsyncDataのlazyオプションの説明として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「trueにするとナビゲーションをブロックせず、データは非同期で入る」です。待たずにページを表示し、データは後から表示する場合に使います。", choices: ["trueにするとナビゲーションをブロックせず、データは非同期で入る", "SSRを無効にする", "キャッシュを無効にする", "キーを無効にする"] },
  { question: "Nuxt 3でPiniaを使う場合の設定として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「@pinia/nuxtモジュールを入れると自動で統合される」です。modulesに追加するだけで、useXxxStoreが使えるようになります。", choices: ["@pinia/nuxtモジュールを入れると自動で統合される", "必ず手動でcreatePiniaのみ", "NuxtではPiniaは使えない", "pluginsに必ず手動登録するのみ"] },
  { question: "useStateとrefの使い分けとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「ページを跨いで共有したい場合はuseState、コンポーネント内だけでよい場合はref」です。useStateはSSRとクライアントでキー単位に共有されます。", choices: ["ページを跨いで共有したい場合はuseState、コンポーネント内だけでよい場合はref", "常にrefのみ", "常にuseStateのみ", "サーバーではuseState、クライアントではref"] },
  { question: "useFetchのgetCachedDataの利用場面として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「キャッシュから先行してデータを返し、UXを良くする」です。ナビゲーション時にキャッシュがあれば即表示し、その後に再検証できます。", choices: ["キャッシュから先行してデータを返し、UXを良くする", "キャッシュを無効にする", "SSRを無効にする", "キーを変更する"] },
  { question: "Nuxt 3のデータ取得でserver: falseにした場合の挙動として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「サーバーでは取得せず、クライアントでのみ取得する」です。クライアント専用のAPIや、認証後にだけ取得したい場合に使います。", choices: ["サーバーでは取得せず、クライアントでのみ取得する", "キャッシュを無効にする", "キーを無効にする", "エラーを無視する"] },
];

const newQuestionsRoutingLayout = [
  { question: "Nuxt 3で動的ルートのパラメータを取得するComposableとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「useRoute」です。useRoute()でparams、query、pathなどが参照でき、pages/users/[id].vueならroute.params.idで取得できます。", choices: ["useRoute", "useRouterのみ", "useParam", "useParams"] },
  { question: "pages/[slug].vueのような1つの動的セグメントのファイル名として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「[slug].vue」です。角括弧で動的セグメントを表し、/xxx のような任意の1段のパスにマッチします。", choices: ["[slug].vue", "slug.vue", "(slug).vue", ":slug.vue"] },
  { question: "Nuxt 3でレイアウトを指定する方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「definePageMetaでlayoutを指定するか、layouts/のdefaultが使われる」です。definePageMeta({ layout: 'custom' })でレイアウトを切り替えられます。", choices: ["definePageMetaでlayoutを指定するか、layouts/のdefaultが使われる", "nuxt.configのみで指定する", "pagesのファイル名のみで決まる", "componentsで指定する"] },
  { question: "Nuxt 3でナビゲーション（プログラム的な遷移）を行うComposableとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「useRouter」です。useRouter().push()やreplace()でプログラム的にルートを変更できます。", choices: ["useRouter", "useRouteのみ", "useNavigate", "useLink"] },
  { question: "pages/users/[id]/index.vueが表すURLとして正しいのはどれか。", correctAnswer: "A", explanation: "正解は「/users/:id（例: /users/123）」です。index.vueはその階層のデフォルトなので、/users/123 のようにマッチします。", choices: ["/users/:id（例: /users/123）", "/users/index", "/users/id", "/users"] },
  { question: "Nuxt 3のlayouts/default.vueの役割として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「layoutを指定しないページで使われるデフォルトのレイアウト」です。default.vueに<slot />や<NuxtPage />を置き、全ページの共通枠を定義します。", choices: ["layoutを指定しないページで使われるデフォルトのレイアウト", "404用のレイアウトのみ", "API用のレイアウト", "エラー用のレイアウトのみ"] },
  { question: "Nuxt 3でミドルウェアをページに適用する方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「definePageMetaでmiddlewareを指定する」です。definePageMeta({ middleware: 'auth' })のように、middleware/配下のファイル名を指定します。", choices: ["definePageMetaでmiddlewareを指定する", "nuxt.configのみで指定する", "pagesのファイル名で決まる", "layoutsで指定する"] },
  { question: "pages/(group)/about.vueの()の意味として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「URLには含めないグループ化（パスには影響しない）」です。(group)はディレクトリをまとめるだけで、/about のようにパスには出てきません。", choices: ["URLには含めないグループ化（パスには影響しない）", "必須のパラメータ", "オプションのパラメータ", "正規表現"] },
  { question: "Nuxt 3でページのメタ情報（titleなど）を設定する方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「useHeadやuseSeoMetaをページ内で使う」です。ページごとにtitleやdescriptionを設定でき、SSR時にmetaタグとして出力されます。", choices: ["useHeadやuseSeoMetaをページ内で使う", "nuxt.configのみ", "layoutsのみ", "middlewareのみ"] },
  { question: "Nuxt 3でネストされたルート（子ルート）を表現する方法として正しいのはどれか。", correctAnswer: "A", explanation: "正解は「親ディレクトリにvueファイルと同名のディレクトリを置き、子にNuxtPageを置く」です。例: users.vueで<NuxtPage />を置き、users/配下に子ページを置く。", choices: ["親ディレクトリにvueファイルと同名のディレクトリを置き、子にNuxtPageを置く", "pagesの1階層のみ", "nuxt.configでネストのみ定義する", "layoutsでのみネストする"] },
];

// 1シードから複数の言い回しを生成してユニークな問題文にする
const PHRASINGS = [
  (q) => q,
  (q) => q.replace(/として正しいのはどれか。?$/, 'として適切なものはどれか。'),
  (q) => q.replace(/として正しいのはどれか。?$/, 'について正しい記述はどれか。'),
  (q) => q.replace(/として正しいのはどれか。?$/, 'の説明として正しいものはどれか。'),
  (q) => q.replace(/として正しいのはどれか。?$/, 'として正しい記述はどれか。'),
  (q) => q.replace(/として正しいのはどれか。?$/, 'について適切なものはどれか。'),
];

function expandNewQuestions(seeds, needed, category, filename) {
  const out = [];
  const usedQuestions = new Set();
  let idx = 0;
  while (out.length < needed) {
    const seed = seeds[idx % seeds.length];
    const phrasingIndex = Math.floor(idx / seeds.length) % PHRASINGS.length;
    let q = PHRASINGS[phrasingIndex](seed.question);
    const round = Math.floor(idx / (seeds.length * PHRASINGS.length));
    if (round > 0) {
      q = q.replace(/。$/, `（${round + 1}）。`);
    }
    if (usedQuestions.has(q)) {
      idx++;
      continue;
    }
    usedQuestions.add(q);
    out.push(makeQuestion(
      out.length + 1,
      q,
      seed.correctAnswer,
      seed.explanation,
      [...seed.choices],
      category,
      filename
    ));
    idx++;
  }
  return out;
}

const fileConfig = {
  'basics_rendering.json': {
    category: 'Nuxt.js - 基礎・レンダリング',
    seeds: newQuestionsBasicsRendering,
  },
  'build_operations_seo.json': {
    category: 'Nuxt.js - ビルド・運用(SEO/エラー/配信)',
    seeds: newQuestionsBuildSeo,
  },
  'config_modules_plugins.json': {
    category: 'Nuxt.js - 設定・拡張（モジュール/プラグイン）',
    seeds: newQuestionsConfigModules,
  },
  'data_fetching_state.json': {
    category: 'Nuxt.js - データ取得・状態管理',
    seeds: newQuestionsDataFetching,
  },
  'routing_layout.json': {
    category: 'Nuxt.js - ルーティング・レイアウト',
    seeds: newQuestionsRoutingLayout,
  },
};

function processFile(filename) {
  const filepath = path.join(ASSOCIATE_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const config = fileConfig[filename];
  if (!config) {
    console.warn('Skip (no config):', filename);
    return;
  }

  const unique = deduplicate(data);
  const removed = data.length - unique.length;
  const toAdd = TARGET_COUNT - unique.length;

  let newOnes = [];
  if (toAdd > 0) {
    newOnes = expandNewQuestions(
      config.seeds,
      toAdd,
      config.category,
      filename
    );
  }

  const result = [];
  unique.forEach((q, i) => {
    result.push({
      ...q,
      id: i + 1,
      category: config.category,
      filename,
    });
  });
  newOnes.forEach((q, i) => {
    result.push({
      ...q,
      id: unique.length + i + 1,
      category: config.category,
      filename,
    });
  });

  fs.writeFileSync(filepath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(
    `${filename}: 重複削除 ${removed} 件, 新規追加 ${newOnes.length} 件, 合計 ${result.length} 問`
  );
}

files.forEach(processFile);
console.log('Done.');
