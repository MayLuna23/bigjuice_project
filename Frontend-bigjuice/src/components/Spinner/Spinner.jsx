import "./spinner.css";
import BounceLoader from "react-spinners/BounceLoader";
export function Spinner() {
  return (
    <div className="loading-overlay">
      <div>
        <BounceLoader color={"greenyellow"} />
      </div>
    </div>
  );
}
