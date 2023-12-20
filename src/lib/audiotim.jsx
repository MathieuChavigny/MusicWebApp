import React, { useContext, useEffect, useRef, useState } from "react";
const audioContext = React.createContext({
  _v: 0,
  audio: null,
  setSrc: (src) => {},
  ready: false,
  visual: {
    analyser: null,
    data: null,
  },
  autoplay: false,
  stopCount: 0, // pour synchroniser le stop et le useProgress
  setStopCount: (val) => {},
});

const AudioProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const analyserRef = useRef({
    analyser: null,
    data: null,
  });
  const [listenersAdded, setListenersAdded] = useState(false);
  const [ready, setReady] = useState(false);
  const [autoplayRequested, setAutoplayRequested] = useState(false);
  const [stopCount, setStopCount] = useState(0);

  useEffect(() => {
    const audioElement = audio;
    if (!listenersAdded && audio) {
      _bindListeners();
    }
    return () => {
      if (listenersAdded) {
        _removeListeners(audioElement);
      }
    };
  }, [listenersAdded, audio]);

  const _bindListeners = () => {
    audio.addEventListener("canplaythrough", () =>
      _canplaythroughHandler(audio)
    );
    setListenersAdded(true);
  };

  const _removeListeners = (audioElement) => {
    if (!audioElement) {
      return;
    }
    audioElement.removeEventListener("canplaythrough", () => {
      _canplaythroughHandler(audioElement);
    });
  };

  const _canplaythroughHandler = (audioElement) => {
    setReady(true);
  };

  const _manageContext = (audioElement) => {
    audioElement.crossOrigin = "anonymous";
    const ctx = new AudioContext();
    const mediaSource = ctx.createMediaElementSource(audioElement);
    const mediaAnalyser = ctx.createAnalyser();
    mediaAnalyser.fftSize = 2 ** 8;
    const bufferLength = mediaAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    mediaSource.connect(mediaAnalyser);
    mediaAnalyser.connect(ctx.destination);
    analyserRef.current = {
      analyser: mediaAnalyser,
      data: dataArray,
      ctx
    };
  };

  const setSrc = (src, autoplay = true) => {
    if (!src.trim()) {
      return;
    }
    setAutoplayRequested(autoplay);
    setReady(false);
    if (!audio) {
      const audioElement = new Audio(src);
      setAudio(audioElement);
      _manageContext(audioElement);

    } else {
      audio.src = src;
      audio.load();
    }
  };

  return (
    <audioContext.Provider
      value={{
        _v: 1,
        audio,
        setSrc,
        ready,
        visual: analyserRef.current,
        autoplay: autoplayRequested,
        stopCount,
        setStopCount,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

const useAudio = (stopOnUnmount = false) => {
  const { _v, audio, setSrc, ready, autoplay, visual, setStopCount } =
    useContext(audioContext);
  const [volume, setVolume] = useState(1);

  if (_v === 0) {
    console.error(`Vous devez utiliser le AudioProvider dans l'app.`);
  }

  useEffect(() => {
    if (ready && audio.paused && autoplay) {
      playHandler();
    }

    return () => {
      if (stopOnUnmount && audio) {
        stopHandler();
      }
    };
  }, [ready, autoplay, audio]);

  const pauseHandler = () => {
    if (!audio) {
      console.warn("Aucune source de chargée pour le moment.");
      return;
    }
    if (!audio.paused) {
      audio.pause();
      
    }
  };

  const togglePauseHandler = () => {
    if (!audio) {
      console.warn("Aucune source de chargée pour le moment.");
      return;
    }
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const playHandler = () => {
    if (!audio) {
      console.warn("Aucune source de chargée pour le moment.");
      return;
    }

    if (audio.paused) {
      if (visual.ctx.state === 'suspended') {
        visual.ctx.resume();
      }
      audio.play();
    }
  };

  const stopHandler = () => {
    if (!audio) {
      console.warn("Aucune source de chargée pour le moment.");
      return;
    }
    pauseHandler();
    setStopCount((current) => current + 1);
    audio.currentTime = 0;
  };

  const changeVolumeHandler = (val) => {
    if (val > 1 || val < 0) {
      throw "Valeur non acceptée. Veuillez fournir une valeur décimale entre 0 et 1.";
    }
    if (!audio || !ready) {
      console.warn("Aucune source de chargée pour le moment.");
      return;
    }
    audio.volume = val;
    setVolume(val);
  };

  return {
    changeSource: setSrc,
    pause: pauseHandler,
    play: playHandler,
    togglePause: togglePauseHandler,
    stop: stopHandler,
    isReady: ready,
    isPaused: audio?.paused ?? true,
    duration: (audio && audio.duration) || -1,
    volume,
    changeVolume: changeVolumeHandler,
    raw: {
      getAudio: () => {
        console.warn(
          `La manipulation de la balise audio risque d'en désynchroniser les states. À utiliser à vos risques.`
        );
        return audio;
      },
      getAnalyser: () => {
        console.warn(
          `La manipulation de l'analyser risque d'en désynchroniser les states. À utiliser à vos risques.`
        );
        return visual.analyser;
      },
    },
  };
};

const useAudioEnded = (endedCallback) => {
  const { audio } = useContext(audioContext);
  useEffect(() => {
    let audioElement = audio;

    if (audio) {
      audioElement.addEventListener("ended", endedCallback);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", endedCallback);
      }
    };
  }, [audio, endedCallback]);
};

const useAudioProgress = () => {
  const { audio, ready, stopCount } = useContext(audioContext);
  const [progress, setProgress] = useState(audio ? audio.currentTime : 0);

  const _updateProgressHandler = (audioElement) => {
    if (audioElement.currentTime === progress) {
      return;
    }
    setProgress(audio.currentTime / audio.duration);
  };

  useEffect(() => {
    if (stopCount > 0) {
      setProgress(0);
    }
  }, [stopCount]);

  useEffect(() => {
    let audioElement = audio;

    if (audio) {
      audioElement.addEventListener("timeupdate", () =>
        _updateProgressHandler(audioElement)
      );
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", () =>
          _updateProgressHandler(audioElement)
        );
      }
    };
  }, [audio]);

  const changeProgressHandler = (val) => {
    if (val < 0 || val > 1) {
      throw "Valeur non acceptée. Veuillez fournir une valeur décimale entre 0 et 1.";
    }

    if (!ready || !audio) {
      console.warn("Aucune source n'est chargée pour le moment.");
      return;
    }
    audio.currentTime = val * audio.duration;
    setProgress(val);
  };

  return { progress, changeProgress: changeProgressHandler };
};

const useAudioVisual = (updateDelayInMs = 30) => {
  const { visual } = useContext(audioContext);
  const [visualInfos, setVisualInfos] = useState([]);

  useEffect(() => {
    const _updateVisual = () => {
      visual.analyser.getByteTimeDomainData(visual.data);
      setVisualInfos(
        Array.from(visual.data.map((d) => (Math.abs(128 - d) * 2.8125) | 0))
      );
    };

    let interval;
    if (visual && visual.analyser) {
      interval = setInterval(_updateVisual, updateDelayInMs);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [visual, updateDelayInMs]);

  return visualInfos;
};

export {
  AudioProvider,
  useAudio,
  useAudioVisual,
  useAudioProgress,
  useAudioEnded,
};
