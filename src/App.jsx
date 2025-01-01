import React, { useState, useRef } from "react";
import EtoSelector from "./components/EtoSelector";
import OmikujiPopup from "./components/OmikujiPopup";
import "./styles.css";

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // ウェルカム画面の表示状態
  const [name, setName] = useState(null); // 名前を保存
  const [playResultMusic, setPlayResultMusic] = useState(false); // 結果音楽の再生トリガー
  const backgroundMusicRef = useRef(null); // 名前入力画面の音楽
  const effect1Ref = useRef(null); // 占うボタンの効果音
  const effect2Ref = useRef(null); // クリック時の効果音
  const resultMusicRef = useRef(null); // 結果画面の音楽

  // 音楽を再生する関数
  const playMusic = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 再生位置をリセット
      audioRef.current.play();
    }
  };

  // 音楽を停止する関数
  const stopMusic = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // ウェルカム画面クリックで名前入力画面に遷移
  const handleWelcomeClick = () => {
    setShowWelcomeScreen(false);
    playMusic(backgroundMusicRef); // 名前入力画面の音楽を再生
  };

  // 名前入力完了後、おみくじ画面に遷移
  const handleStartOmikuji = (inputName) => {
    stopMusic(backgroundMusicRef); // 名前入力画面の音楽を停止
    playMusic(effect1Ref); // 占うボタンの効果音を再生
    setName(inputName);
  };

  // タイトル画面に戻る
  const handleReset = () => {
    setName(null); // 名前をリセット
    setShowWelcomeScreen(true); // ウェルカム画面を表示
    stopMusic(resultMusicRef); // 結果画面の音楽を停止
    setPlayResultMusic(false); // 結果画面の音楽トリガーをリセット
  };

  return (
    <div>
      {/* ウェルカム画面 */}
      {showWelcomeScreen && (
        <div className="welcome-screen" onClick={handleWelcomeClick}>
          <div className="welcome-overlay">
            <img src="/hebi.png" alt="Welcome" className="welcome-image" />
            <p className="welcome-message">
              タップ
              <br /> or
              <br /> クリック！
            </p>
          </div>
        </div>
      )}

      {/* 名前入力画面 */}
      {!showWelcomeScreen && !name && (
        <EtoSelector onStartOmikuji={handleStartOmikuji} />
      )}

      {/* おみくじ画面 */}
      {name && (
        <OmikujiPopup
          name={name}
          onReset={handleReset} // リセット用の関数を渡す
          onTriggerClickSound={() => playMusic(effect2Ref)} // クリック時の効果音
          onResult={() => {
            setPlayResultMusic(true); // 結果音楽再生トリガーを設定
          }}
        />
      )}

      {/* 結果音楽再生 */}
      {playResultMusic && (
        <audio
          ref={resultMusicRef}
          src="/result.mp3"
          autoPlay
          loop
          volume={0.5}
        />
      )}

      {/* 音楽・効果音の埋め込み */}
      <audio ref={backgroundMusicRef} src="/title.mp3" loop volume={0.5} />
      <audio ref={effect1Ref} src="/ドラムロール.mp3" volume={0.5} />
      <audio ref={effect2Ref} src="/shara.mp3" volume={0.5} />
    </div>
  );
}

export default App;
