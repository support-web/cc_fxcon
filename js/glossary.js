// FX学習コンテンツ - 用語辞典データ（30語）

const glossaryTerms = [
  // === 基礎 ===
  {
    id: 1,
    slug: "fx",
    term: "FX（外国為替証拠金取引）",
    category: "基礎",
    definition: "外国の通貨を売買して、為替レートの変動から利益を狙う取引のこと。",
    analogy: "海外旅行で円をドルに両替するのと同じ仕組み。安く買って高く売れば利益になります。",
    misconceptions: "「FX＝ギャンブル」ではありません。正しい知識とリスク管理があれば、資産運用の手段の一つです。ただし、元本保証はありません。",
    relatedLessons: ["what-is-fx"]
  },
  {
    id: 2,
    slug: "kawase",
    term: "為替（かわせ）",
    category: "基礎",
    definition: "異なる通貨を交換すること、またはその交換比率のこと。",
    analogy: "「1ドル=150円」という表示は、1ドルと150円が同じ価値という意味。この比率が為替レートです。",
    misconceptions: "為替レートは固定ではなく、24時間常に変動しています。",
    relatedLessons: ["what-is-fx", "yen-rate-life"]
  },
  {
    id: 3,
    slug: "tsuka-pair",
    term: "通貨ペア",
    category: "基礎",
    definition: "FX取引で売買する2つの通貨の組み合わせ。「米ドル/円」「ユーロ/円」など。",
    analogy: "「米ドル/円」は「ドルを円で買う（または売る）」という意味。スラッシュの左が取引対象、右が決済通貨です。",
    misconceptions: "通貨ペアによって値動きの特徴やスプレッドが異なります。初心者は米ドル/円から始めるのがおすすめ。",
    relatedLessons: ["what-is-fx"]
  },
  {
    id: 4,
    slug: "enyasu",
    term: "円安（えんやす）",
    category: "基礎",
    definition: "円の価値が下がること。同じ外貨を買うのに、より多くの円が必要になる状態。",
    analogy: "1ドル=100円が1ドル=150円になると円安。同じハンバーガー（ドル）を買うのに、より多くのお小遣い（円）が必要に。",
    misconceptions: "円安＝日本経済が悪いとは限りません。輸出企業にとっては有利な面もあります。",
    relatedLessons: ["yen-rate-life"]
  },
  {
    id: 5,
    slug: "endaka",
    term: "円高（えんだか）",
    category: "基礎",
    definition: "円の価値が上がること。少ない円で外貨が買える状態。",
    analogy: "1ドル=150円が1ドル=100円になると円高。同じハンバーガー（ドル）が、少ないお小遣い（円）で買える。",
    misconceptions: "円高＝良いことばかりではありません。輸出企業の業績には悪影響を与えることも。",
    relatedLessons: ["yen-rate-life"]
  },
  {
    id: 6,
    slug: "pips",
    term: "pips（ピップス）",
    category: "基礎",
    definition: "為替レートの変動を表す最小単位。米ドル/円なら0.01円（1銭）が1pips。",
    analogy: "定規の目盛りのようなもの。「10pips動いた」は「0.1円（10銭）動いた」という意味。",
    misconceptions: "通貨ペアによってpipsの単位が異なります。米ドル/円は0.01円=1pips、ユーロ/ドルは0.0001ドル=1pips。",
    relatedLessons: ["pips-basics"]
  },
  {
    id: 7,
    slug: "lot",
    term: "ロット（Lot）",
    category: "基礎",
    definition: "FX取引の数量を表す単位。1ロット=1万通貨が一般的だが、会社により異なる。",
    analogy: "卵の「1パック（10個入り）」のようなもの。1ロットが何通貨かは会社ごとに確認が必要。",
    misconceptions: "「1ロット=10万通貨」の会社もあります。取引前に必ず確認しましょう。",
    relatedLessons: ["pips-basics"]
  },
  {
    id: 8,
    slug: "position",
    term: "ポジション",
    category: "基礎",
    definition: "未決済の取引（持ち高）のこと。「買いポジション」「売りポジション」がある。",
    analogy: "「ドルを持っている状態」がポジション。決済するまでは含み益/含み損が変動し続けます。",
    misconceptions: "ポジションを持ち続けると、スワップポイントが発生します（プラスもマイナスもあり）。",
    relatedLessons: ["swap-point"]
  },

  // === 取引 ===
  {
    id: 9,
    slug: "leverage",
    term: "レバレッジ",
    category: "取引",
    definition: "少ない資金で大きな取引ができる仕組み。「テコの原理」の意味。",
    analogy: "10万円で25倍のレバレッジをかけると、250万円分の取引が可能。ただし損失も25倍になりうる。",
    misconceptions: "レバレッジが高い＝危険ではなく、「使い方」が重要。初心者は低レバレッジから始めましょう。",
    relatedLessons: ["leverage-risk"]
  },
  {
    id: 10,
    slug: "shokokin",
    term: "証拠金（しょうこきん）",
    category: "取引",
    definition: "FX取引を行うために口座に預け入れる担保金のこと。",
    analogy: "賃貸の敷金のようなもの。取引するための「預かり金」で、損失が出るとここから差し引かれます。",
    misconceptions: "証拠金＝取引に使える全額ではありません。証拠金維持率にも注意が必要です。",
    relatedLessons: ["leverage-risk", "losscut"]
  },
  {
    id: 11,
    slug: "losscut",
    term: "ロスカット",
    category: "取引",
    definition: "含み損が一定水準を超えたとき、FX会社が強制的にポジションを決済する仕組み。",
    analogy: "車のエアバッグのような安全装置。大事故（大損失）を防ぐために自動で作動します。",
    misconceptions: "ロスカットは「守ってくれた」と捉えるべき。ただし急変動時は設定より損が膨らむこともあります。",
    relatedLessons: ["losscut"]
  },
  {
    id: 12,
    slug: "songiri",
    term: "損切り（そんぎり）",
    category: "取引",
    definition: "損失が拡大する前に、自分の判断でポジションを決済すること。",
    analogy: "傷が浅いうちに撤退すること。「損切りは技術」と言われるほど、FXでは重要なスキルです。",
    misconceptions: "「いつか戻るかも」と損切りしないと、大損につながることが多いです。",
    relatedLessons: ["losscut", "before-starting"]
  },
  {
    id: 13,
    slug: "rikaku",
    term: "利確（りかく）",
    category: "取引",
    definition: "利益が出ている状態でポジションを決済し、利益を確定すること。利益確定の略。",
    analogy: "ゲームでセーブするようなもの。決済するまでは「含み益」であり、確定した利益ではありません。",
    misconceptions: "「もっと上がるかも」と利確を遅らせて、結局マイナスになることも。ルールを決めておくことが大切。",
    relatedLessons: ["before-starting"]
  },
  {
    id: 14,
    slug: "order",
    term: "注文（オーダー）",
    category: "取引",
    definition: "通貨を売買する指示のこと。成行注文、指値注文、逆指値注文などがある。",
    analogy: "レストランでの「注文」と同じ。「今すぐ買う」（成行）か「この値段になったら買う」（指値）か選べます。",
    misconceptions: "注文の種類を理解せずに取引すると、意図しない約定（取引成立）になることも。",
    relatedLessons: ["before-starting"]
  },
  {
    id: 15,
    slug: "nariyuki",
    term: "成行注文（なりゆきちゅうもん）",
    category: "取引",
    definition: "現在の価格で即座に売買を成立させる注文方法。",
    analogy: "「今すぐこの値段で買います！」という注文。すぐに約定するが、表示価格と若干ずれることも。",
    misconceptions: "相場が急変動しているときは、想定外の価格で約定する可能性があります（スリッページ）。",
    relatedLessons: ["before-starting"]
  },
  {
    id: 16,
    slug: "sashine",
    term: "指値注文（さしねちゅうもん）",
    category: "取引",
    definition: "希望する価格を指定して出す注文。その価格に達したら自動で売買が成立する。",
    analogy: "「この値段になったら買って」という予約注文。価格に達しなければ約定しません。",
    misconceptions: "指値注文は約定しない可能性もあります。チャンスを逃すこともあるので、状況に応じて使い分けを。",
    relatedLessons: ["before-starting"]
  },

  // === コスト ===
  {
    id: 17,
    slug: "spread",
    term: "スプレッド",
    category: "コスト",
    definition: "買値（Ask）と売値（Bid）の差。実質的な取引コストとなる。",
    analogy: "両替所で「買う価格」と「売る価格」が違うのと同じ。この差がFX会社の収益源の一つです。",
    misconceptions: "「手数料無料」でもスプレッドはかかります。取引開始時点でスプレッド分マイナスからスタート。",
    relatedLessons: ["spread"]
  },
  {
    id: 18,
    slug: "tesuryo",
    term: "取引手数料",
    category: "コスト",
    definition: "取引ごとにFX会社に支払う手数料。現在は無料の会社が多い。",
    analogy: "銀行の振込手数料のようなもの。FXでは手数料無料が主流だが、代わりにスプレッドがコストになります。",
    misconceptions: "手数料無料＝コストゼロではありません。スプレッドという見えないコストがあります。",
    relatedLessons: ["spread"]
  },
  {
    id: 19,
    slug: "swap",
    term: "スワップポイント",
    category: "コスト",
    definition: "2国間の金利差から生じる損益。ポジションを翌日に持ち越すと発生する。",
    analogy: "通貨を持ち越すと「金利の差額」がもらえる（または払う）。貯金の利息のようなものだが、マイナスになることも。",
    misconceptions: "スワップ狙いで高金利通貨を買っても、為替変動で損する可能性があります。",
    relatedLessons: ["swap-point"]
  },
  {
    id: 20,
    slug: "kinri",
    term: "政策金利",
    category: "コスト",
    definition: "各国の中央銀行が設定する基準金利。スワップポイントや為替レートに影響する。",
    analogy: "銀行の預金金利の「大元」となる金利。この金利が上がると、その国の通貨が買われやすくなる傾向。",
    misconceptions: "金利が高い国の通貨が必ず強いわけではありません。経済状況など他の要因も影響します。",
    relatedLessons: ["swap-point", "news-to-watch"]
  },

  // === リスク ===
  {
    id: 21,
    slug: "risk-reward",
    term: "リスクリワード",
    category: "リスク",
    definition: "1回の取引で許容する損失（リスク）と期待する利益（リワード）の比率。",
    analogy: "「100円損するリスクで300円の利益を狙う」なら、リスクリワードは1:3。この比率を意識した取引が重要。",
    misconceptions: "勝率が低くても、リスクリワードが良ければトータルでプラスになることがあります。",
    relatedLessons: ["before-starting"]
  },
  {
    id: 22,
    slug: "shokokin-iji",
    term: "証拠金維持率",
    category: "リスク",
    definition: "必要証拠金に対する有効証拠金の割合。ロスカットの基準となる。",
    analogy: "「残りの体力ゲージ」のようなもの。この割合が一定以下になると、ロスカットが発動します。",
    misconceptions: "証拠金維持率が100%を切っても即ロスカットとは限りません。会社ごとに基準が異なります。",
    relatedLessons: ["losscut"]
  },
  {
    id: 23,
    slug: "fukumi-son",
    term: "含み損（ふくみそん）",
    category: "リスク",
    definition: "未決済のポジションで発生している損失のこと。決済するまでは確定しない。",
    analogy: "株を安く買って、今は値下がりしている状態。売らなければ「損」は確定しないが、さらに下がる可能性も。",
    misconceptions: "「含み損だから大丈夫」と放置すると、ロスカットされるまで膨らむこともあります。",
    relatedLessons: ["losscut"]
  },
  {
    id: 24,
    slug: "slippage",
    term: "スリッページ",
    category: "リスク",
    definition: "注文した価格と実際に約定した価格のズレのこと。",
    analogy: "「150円で買いたい」と注文したのに、150.05円で約定してしまうこと。相場急変時に起きやすい。",
    misconceptions: "スリッページは必ずしもマイナスではなく、有利な方向にずれることもあります。",
    relatedLessons: ["spread"]
  },

  // === 指標 ===
  {
    id: 25,
    slug: "keizai-shihyo",
    term: "経済指標",
    category: "指標",
    definition: "各国の経済状況を示す統計データ。雇用統計、GDP、CPIなど。",
    analogy: "国の「健康診断の結果」のようなもの。結果が良ければ通貨高、悪ければ通貨安になりやすい。",
    misconceptions: "指標の「結果」だけでなく「予想との差」が重要。予想より良くても、既に織り込み済みなら反応しないことも。",
    relatedLessons: ["news-to-watch"]
  },
  {
    id: 26,
    slug: "fomc",
    term: "FOMC",
    category: "指標",
    definition: "米国の金融政策を決定する会合。年8回開催され、政策金利が発表される。",
    analogy: "アメリカの「金利を決める重要会議」。世界中の投資家が注目し、為替が大きく動くことが多い。",
    misconceptions: "FOMCの結果発表時は相場が急変動するため、初心者は様子見が無難です。",
    relatedLessons: ["news-to-watch"]
  },
  {
    id: 27,
    slug: "koyou-toukei",
    term: "米国雇用統計",
    category: "指標",
    definition: "毎月第1金曜に発表される米国の雇用に関する統計。為替市場最大のイベント。",
    analogy: "アメリカの「仕事に関する成績表」。失業率や雇用者数が発表され、結果次第で為替が大きく動く。",
    misconceptions: "雇用統計発表後の数分間は値動きが荒れるため、初心者はポジションを持たない方が安全。",
    relatedLessons: ["news-to-watch"]
  },
  {
    id: 28,
    slug: "cpi",
    term: "CPI（消費者物価指数）",
    category: "指標",
    definition: "消費者が購入する商品・サービスの価格変動を測定する指標。インフレの目安。",
    analogy: "「物価の上がり具合」を測る体温計。CPIが高い＝インフレ＝金利が上がりやすい＝通貨高になりやすい。",
    misconceptions: "CPIが高すぎると経済に悪影響を及ぼすこともあり、必ずしも良いニュースではありません。",
    relatedLessons: ["news-to-watch"]
  },

  // === その他 ===
  {
    id: 29,
    slug: "demo-trade",
    term: "デモトレード",
    category: "その他",
    definition: "仮想のお金を使って行う練習用の取引。実際の損益は発生しない。",
    analogy: "ゲームの「チュートリアルモード」。本番と同じ環境で練習でき、失敗しても損失ゼロ。",
    misconceptions: "デモでうまくいっても本番で同じ結果とは限りません。実際のお金が絡むと心理面が変わります。",
    relatedLessons: ["before-starting", "account-checklist"]
  },
  {
    id: 30,
    slug: "kouza-kaisetsu",
    term: "口座開設",
    category: "その他",
    definition: "FX取引を始めるために、FX会社で取引口座を開設すること。",
    analogy: "銀行口座を作るのと同じ流れ。本人確認書類を提出し、審査を経て口座が開設されます。",
    misconceptions: "口座開設は無料ですが、取引には自己資金が必要です。開設＝すぐに取引ではありません。",
    relatedLessons: ["account-checklist"]
  }
];

// カテゴリ一覧
const glossaryCategories = [
  { id: "all", name: "すべて" },
  { id: "基礎", name: "基礎" },
  { id: "取引", name: "取引" },
  { id: "コスト", name: "コスト" },
  { id: "リスク", name: "リスク" },
  { id: "指標", name: "指標" },
  { id: "その他", name: "その他" }
];

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { glossaryTerms, glossaryCategories };
}
