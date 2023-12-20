import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Artistes.css";

function Artiste({ name, picture, id }) {
    return <div className="artiste">
        <motion.img src={picture} alt="" initial={{ scale: 0 }} animate={{ rotate: [-25, 25, 0], scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.25
            }} />
        <Link to={`/artiste/${id}`} >
            <h2>{name}</h2>
        </Link>
    </div>;
}

export default Artiste