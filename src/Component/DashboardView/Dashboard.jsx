import Sidewinder from "./Sidewinder";
import GameTable from "./GameTable";
import { useParams, Redirect } from "react-router-dom";

export default function Header() {
  let { id } = useParams();
  if (id)
    return (
      <div className="row">
        <div className="colu-2 colu-s-4">
          <Sidewinder />
        </div>
        <div className="colu-6 colu-s-6">
          <GameTable />
        </div>
      </div>
    );
  else return <Redirect to={{ pathname: "/login" }} />;
}
