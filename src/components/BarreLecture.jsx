import { useUser } from "../context/userContext";
import { useAudio, useAudioProgress } from "../lib/audiotim";
import "./BarreLecture.css";

function BarreLecture() {
    const { enLecture } = useUser();
    const { progress, changeProgress } = useAudioProgress(0);
    const { isReady } = useAudio();
    const handleProgress = (event) => {
        changeProgress(event.target.value / 100);
    }

    return <input className="barreLecture" disabled={!enLecture} onChange={(event) =>
        handleProgress(event)} type="range" min="1" max="100" value={isReady ? progress * 100 : 0} />
}

export default BarreLecture