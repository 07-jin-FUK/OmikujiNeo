import React, { useState } from "react";
import "../styles.css";

const OmikujiPopup = ({ name, onTriggerClickSound, onResult, onReset }) => {
  const [showClickPopup, setShowClickPopup] = useState(true);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [result, setResult] = useState("");
  const [comment, setComment] = useState("");
  const [scores, setScores] = useState({}); // 各運のスコア
  const [totalScore, setTotalScore] = useState(0); // 総合点数
  const [luckyItem, setLuckyItem] = useState("");

  // 運勢の基準
  const fortuneRanges = [
    { result: "大吉", range: [23, 25] },
    { result: "吉", range: [21, 22.5] },
    { result: "中吉", range: [19, 20.5] },
    { result: "小吉", range: [16.5, 18.5] },
    { result: "末吉", range: [14, 16] },
  ];

  const maxMinComments = {
    job: {
      max: [
        "仕事運が高いです！最高のキャリアアップが期待できます！",
        "仕事の名案が次から次に！あなたの努力が報われるときです！",
        "仕事でめちゃくちゃいいことが素晴らしい成果を上げるでしょう！",
      ],
      min: [
        "しかしながら、仕事運が低めです。努力が必要ですが、チャンスは近くにあります。",
        "しかしながら、仕事運は低めです。思い通りにいかないこともありますが、頑張りましょう！",
        "しかしながら、仕事運は低めです。焦らず進めば良い結果が見えてきます。",
      ],
    },
    love: {
      max: [
        "恋愛運が高いです！現状円満、もしくは素敵な出会いが訪れるでしょう！",
        "恋愛運が高いですね！周りに恵まれ絶好調です！",
        "恋愛運が高いです！幸せな恋愛が期待できます！",
      ],
      min: [
        "しかしながら、恋愛運は低めです。少し慎重に進むと良い結果が得られます。",
        "しかしながら、恋愛運は低めです。言葉の端々に気を付けましょう。",
        "しかしながら、恋愛運は低めです。無理をせず自然体でいると良いでしょう。",
      ],
    },
    money: {
      max: [
        "金運絶好調！予想以上の収入が期待できます。",
        "金運がいいですね！素晴らしいチャンスが訪れます！",
        "金運が高いです！計画的に行動すれば大きな成果が得られます！",
      ],
      min: [
        "しかしながら、金運が低いです。計画的にお金を使うと吉。",
        "しかしながら、金運が低いです。支出を見直すと良い結果に繋がります。",
        "しかしながら、金運が低いです。無駄遣いに気をつけましょう。",
      ],
    },
    private: {
      max: [
        "プライベート運が高いです！充実したプライベートが過ごせます！",
        "プライベート運がいいですね！思わぬ楽しい時間が待っています！",
        "プライベート運が高いです！あなたの人生がさらに豊かになります！",
      ],
      min: [
        "しかしながら、プライベート運が低いです。少し休む時間を確保しましょう。",
        "しかしながら、プライベート運が低いです。自分自身を見つめ直す時間を大切に。",
        "しかしながら、プライベート運が低いです。心身をリフレッシュすることが必要です。",
      ],
    },
    wish: {
      max: [
        "願い叶う運が高いです！願い事が叶うチャンスが到来！",
        "願い叶う運が高いです！あなたの夢が実現する時が来ました！",
        "願い叶う運が高いです！欲望を開放しましょう！",
      ],
      min: [
        "しかしながら、願い叶う運が低いです。あきらめず根気強く続ければ必ず叶います。",
        "しかしながら、願い叶う運が低いです。小さくコツコツ進めば成果が得られます。",
        "しかしながら、願い叶う運が低いです。一歩ずつ自分を信じて努力を続けましょう。",
      ],
    },
  };

  const fortuneComments = {
    大吉: [
      "総じて最高の一年が待っています！何においても自信を持って進みましょう！",
      "すべてがうまくいく年になります！期待に満ちた一年を！",
      "この運気で運命の扉が開きます！積極的に行動していきましょう！",
    ],
    吉: [
      "全体的な運気はいいです！穏やかで幸せな年になるでしょう！",
      "全体的にはいい感じです！少しずつ目標に近づく一年です。",
      "全体運は〇。安定した運気で安心して進める年です。",
    ],
    中吉: [
      "目の前の小さな幸せを大事にしましょう。",
      "慎重に進めば大きな成果を得られる年です。",
      "何事も努力次第で好転する一年となるでしょう。",
    ],
    小吉: [
      "小さな成功を積み重ねていける年です。",
      "平穏な日常を楽しめる年になるでしょう。",
      "自分のペースを大事にすることがカギです。",
    ],
    末吉: [
      "末といえど吉は吉です！これから良い方向に向かう兆しがあります。",
      "焦らず着実に進むことで道が開けます。",
      "周囲のサポートを大切にして進みましょう。",
    ],
  };

  // スコアを星とスコアで表示
  const renderStarsWithScore = (score) => {
    const stars = [];
    for (let i = 0; i < Math.floor(score); i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }
    if (score % 1 !== 0) {
      stars.push(
        <span key="half" className="star half">
          ☆
        </span>
      );
    }
    return (
      <div className="star-container">
        {stars} <span className="score">({score})</span>
      </div>
    );
  };

  // ランダムに合計スコアを生成
  const generateRandomScore = () => {
    const score = Math.round((Math.random() * (25 - 14) + 14) * 2) / 2; // 14～25の範囲で0.5刻み
    return score;
  };

  // 運勢を決定
  const determineFortune = (totalScore) => {
    for (const fortune of fortuneRanges) {
      if (totalScore >= fortune.range[0] && totalScore <= fortune.range[1]) {
        return fortune.result;
      }
    }
    return "不明"; // 範囲外（基本的にはあり得ない）
  };

  // 合計スコアを各運にランダム分配
  const distributeScores = (totalScore) => {
    const categories = ["job", "love", "money", "private", "wish"];
    let remainingScore = totalScore;
    const scores = {};

    // 各カテゴリを初期化
    categories.forEach((category) => {
      scores[category] = 0;
    });

    // ランダム分配
    while (remainingScore > 0) {
      const availableCategories = categories.filter(
        (category) => scores[category] < 5 // スコアが5未満のカテゴリのみ対象
      );

      // 全てのカテゴリが5に達している場合、終了
      if (availableCategories.length === 0) {
        break;
      }

      // ランダムなカテゴリを選択
      const randomCategory =
        availableCategories[
          Math.floor(Math.random() * availableCategories.length)
        ];

      // ランダムにスコアを割り当てる（0.5刻みで、最大値は5未満）
      const maxAllocatable = Math.min(
        5 - scores[randomCategory], // 現在のカテゴリが持てる最大スコア
        remainingScore
      );
      const randomScore = Math.min(
        Math.round(Math.random() * maxAllocatable * 2) / 2, // 0.5刻みで割り当て
        maxAllocatable
      );

      scores[randomCategory] += randomScore; // スコアを加算
      remainingScore -= randomScore; // 残りスコアを減算
    }

    return scores;
  };

  // コメント生成
  const generateComments = (scores, fortune) => {
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]); // スコアを降順にソート
    const highestKey = sortedScores[0][0]; // 最大値のカテゴリ
    const secondHighestKey = sortedScores[1][0]; // 2番目に高いカテゴリ
    const lowestKey = sortedScores[sortedScores.length - 1][0]; // 最小値のカテゴリ

    // 最大値コメント、最小値コメントをランダムに選択
    const getRandomComment = (commentsArray) =>
      commentsArray[Math.floor(Math.random() * commentsArray.length)];

    let comments = [];

    if (fortune === "大吉" || fortune === "吉") {
      // 大吉、吉の場合
      comments.push(
        getRandomComment(maxMinComments[highestKey].max) // 最大値コメント
      );
      comments.push(
        getRandomComment(maxMinComments[secondHighestKey].max) // 2番目に高いコメント
      );
    } else {
      // 中吉以下の場合
      comments.push(
        getRandomComment(maxMinComments[highestKey].max) // 最大値コメント
      );
      comments.push(
        getRandomComment(maxMinComments[lowestKey].min) // 最小値コメント
      );
    }

    // 総合コメントをランダムで追加
    const fortuneGeneralComment = getRandomComment(fortuneComments[fortune]);
    comments.push(fortuneGeneralComment);

    return comments.join(" ");
  };

  const generateResult = () => {
    const randomScore = generateRandomScore();
    setTotalScore(randomScore * 4); // 総合点はランダムスコア×4
    const determinedFortune = determineFortune(randomScore);
    setResult(determinedFortune);

    const scoresDistribution = distributeScores(randomScore);
    setScores(scoresDistribution);

    const combinedComments = generateComments(
      scoresDistribution,
      determinedFortune
    );
    setComment(combinedComments);

    const item = generateLuckyItem(); // ラッキーアイテムを生成
    setLuckyItem(item); // 状態に設定
  };

  const luckyItems = [
    "赤い小物",
    "青いペン",
    "金のコイン",
    "左右違う色の靴下",
    "桜の花びら",
    "川の石",
    "テニスボール",
    "ランニングシューズ",
    "伊達メガネ",
    "竹の箸",
    "小さな鍵",
    "白い服",
    "黒いシャツ",
    "大宰府のお守り",
    "ティファール商品",
    "大容量の加湿器",
    "空気も読める空気清浄機",
    "新品の枕",
    "新しいパソコン",
    "新しいリュック",
  ];

  // ラッキーアイテムをランダムに選択
  const generateLuckyItem = () => {
    const randomIndex = Math.floor(Math.random() * luckyItems.length);
    return luckyItems[randomIndex];
  };

  // 投稿用URLを生成する関数
  const generateTweetUrl = () => {
    const siteUrl = "https://your-site-url.com"; // あなたのサイトのURL
    const tweetText = encodeURIComponent(`
    【おみくじ結果】
    ${name}さんの2025年の運勢: ${result} 🎉
    総合点: ${totalScore}点
    仕事運: ${scores.job}, 恋愛運: ${scores.love}, 金運: ${scores.money}, プライベート運: ${scores.private}, 願い叶う運: ${scores.wish}
  
    この占いはフィクションです。
    詳細はこちら: ${siteUrl}
    #手作りおみくじ
  `);

    return `https://twitter.com/intent/tweet?text=${tweetText}`;
  };

  // 「クリック！」のPOPUPをクリックした時の処理
  const handleClickPopup = () => {
    onTriggerClickSound(); // クリック時の効果音を再生
    setZoomImage(true); // ズームアニメーション開始
    setTimeout(() => {
      setZoomImage(false); // ズームアニメーション終了
      setShowClickPopup(false); // 「クリック！」POPUPを非表示
      generateResult(); // 結果生成
      setShowResultPopup(true); // 結果POPUPを表示
      onResult(); // 結果画面の音楽を再生
    }, 3000); // 3秒後に結果表示
  };

  return (
    <div>
      {/* 「クリック！」POPUP */}
      {showClickPopup && (
        <div className={`popup ${zoomImage ? "zoom-background" : ""}`}>
          <div className="popup-content2" onClick={handleClickPopup}>
            <h2 className="click-text">クリック！</h2>
          </div>
        </div>
      )}

      {/* 結果POPUP */}
      {showResultPopup && (
        <div className="popup result-background">
          <div className="popup-content">
            <h2 className="result-text">{name}さんの2025年の運勢</h2>
            <h2 className="result-text">結果: {result} 🎉</h2>

            {/* 各運のスコア */}
            <div className="score-section">
              <p>仕事運: {renderStarsWithScore(scores.job)}</p>
              <p>恋愛運: {renderStarsWithScore(scores.love)}</p>
              <p>金運: {renderStarsWithScore(scores.money)}</p>
              <p>プライベート運: {renderStarsWithScore(scores.private)}</p>
              <p>願い叶う運: {renderStarsWithScore(scores.wish)}</p>
            </div>

            {/* 総合点表示 */}
            <h2 className="total-score">総合点: {totalScore}点</h2>
            {/* ラッキーアイテム表示 */}
            <p className="lucky-item">ラッキーアイテム: {luckyItem}</p>

            {/* コメント */}
            <p className="result-comment">{comment}</p>
            {/* 投稿ボタン */}
            <a
              href={generateTweetUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="post-button"
            >
              Xに投稿する
            </a>
            <button
              className="reset-button"
              onClick={onReset} // タイトルに戻る処理を実行
            >
              タイトルに戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OmikujiPopup;
