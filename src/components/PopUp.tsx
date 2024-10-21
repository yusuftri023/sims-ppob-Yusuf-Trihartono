import { useEffect, useState } from "react";

function PopUp({
  showPopUp,
  duration,
  children,
}: {
  showPopUp: boolean;
  duration: number;
  children?: React.ReactNode;
}) {
  const [render, setRender] = useState(showPopUp);

  useEffect(() => {
    if (showPopUp) {
      setRender(true);
      setTimeout(() => {
        setRender(() => false);
      }, duration + 950);
    }
  }, [showPopUp]);
  return (
    <>
      {render && (
        <div
          className={`${
            showPopUp
              ? ` animate-[fadeInToBottom_1s_ease-in-out]`
              : ` animate-[fadeOutToTop_1s_ease-in-out]`
          } absolute top-1/4  left-[calc(50%-150px)] z-20`}
          onAnimationEnd={() => {
            if (!showPopUp) setRender(false);
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
export default PopUp;
