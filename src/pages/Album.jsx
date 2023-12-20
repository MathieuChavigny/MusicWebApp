import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import "./album.css";

function Album({ title, artist, cover, id }) {
    return <div className="album02">
        <ul className="flex">
            <li> <motion.img src={cover} alt="" initial={{ scale: 0 }} animate={{ rotate: [-25, 25, 0], scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.25
                }} /></li>
            <li className="txt"><Link to={`/album/${id}`} >{title}</Link></li>
            <li className="txt"><Link to={`/artiste/${artist.id}`} >{artist.name}</Link></li>
        </ul>
    </div>;
}

export default Album