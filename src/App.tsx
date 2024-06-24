import { useState } from "react";
import axios from "axios";
import "./App.css";
import { usePrefetchedText } from "./hooks/use-prefetched-text";

function App() {
  const [text, setText] = useState("");
  const [audioSource, setAudioSource] = useState("");

  const { prefetchedText } = usePrefetchedText();

  const handleTextArea = (event: any) => {
    setText(event.target.value);
  };

  const handleSynthesize = async () => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/synthesize` ?? "";
    const payload = {
      text: text,
    };
    try {
      const response = await axios.post(endpoint, payload);
      const audioSrc = `data:audio/mp3;base64, ${response.data.audioContent}`;
      setAudioSource(audioSrc);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    if (text && audioSource) {
      setText("");
      setAudioSource("");
    }
  };

  const handlePrefetchedText = () => {
    setText(prefetchedText);
  };

  return (
    <div className="App">
      <h1> Text to Speech</h1>
      <div className="app-body">
        <textarea
          value={text}
          onChange={handleTextArea}
          placeholder="Enter your text here"
        ></textarea>
        <button onClick={handleSynthesize}>Synthesize</button>
        <button
          onClick={handlePrefetchedText}
          disabled={audioSource && text ? true : false}
        >
          Use Prefetched text
        </button>
        {audioSource && <audio controls src={audioSource} />}
        {text && audioSource && <button onClick={handleClear}>Clear</button>}
      </div>
      <div>
        <h2>SSML</h2>
      </div>
    </div>
  );
}

export default App;
