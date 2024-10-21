import loading from "../assets/loading.svg";
function LoadingSpinner() {
  return (
    <div className="py-10">
      <img className="max-w-[75px] mx-auto" src={loading}></img>
    </div>
  );
}

export default LoadingSpinner;
