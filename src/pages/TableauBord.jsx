import Statistiques from "../components/Statistiques";
import ListesLecture from "./ListesLecture";
import User from "../components/User";

function TableauBord() {
  return <div>
    <User></User>
    <ListesLecture></ListesLecture>
    <Statistiques></Statistiques>
  </div>;
}

export default TableauBord