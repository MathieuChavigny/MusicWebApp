import { useAudioVisual } from "../lib/audiotim";
import "./Animation.css";

function Animation() {
    const data = useAudioVisual();

    return <div className="barres">
        {data.map((data, i) => (
            <div key={i} className="barre" style={{ height: data / 2 + '%' }}></div>
        ))}
    </div>;
}

export default Animation