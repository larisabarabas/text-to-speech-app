import { useEffect, useState } from "react";

export function usePrefetchedText() {
  const [prefetchedText, setPrefetchedText] = useState("");
  useEffect(() => {
    console.log("I am running this hook");
    setPrefetchedText(
      "When Steve Jobs unveiled the Macintosh in 1984, it said “Hello” to us from the stage. Even at that point, speech synthesis wasn’t really a new technology: Bell Labs developed the vocoder as early as in the late 30s, and the concept of a voice assistant computer made it into people’s awareness when Stanley Kubrick made the vocoder the voice of HAL9000 in 2001: A Space Odyssey (1968)."
    );
  }, [prefetchedText]);

  return { prefetchedText };
}
