import loading from "../assets/loading.svg";
function LoadingSpinner() {
  return (
    <div className="py-10">
      <img className="mx-auto max-w-[75px]" src={loading}></img>
    </div>
  );
}

export default LoadingSpinner;
