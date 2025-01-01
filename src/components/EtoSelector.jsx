import React, { useState } from "react";
import "../styles.css";

const EtoSelector = ({ onStartOmikuji }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onStartOmikuji(name); // 入力された名前を親コンポーネントに渡す
    } else {
      alert("名前を入力してください！");
    }
  };

  return (
    <div className="eto-container">
      <h1>謹賀新年</h1>
      <h1>2025 巳年</h1>
      <div className="input-container">
        <img src="/金蛇.png" alt="デコレーション画像" className="decor-image" />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="名前を入力"
          className="name-input"
        />
      </div>
      <button onClick={handleSubmit} className="eto-submit-button">
        今年の運勢を占う
      </button>
    </div>
  );
};

export default EtoSelector;
