import { modalToggle } from "../store/reducers/webContentReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

function ModalWindow({ children }: { children?: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.webContent.showModal);

  const modalToggleHandler = () => dispatch(modalToggle(false));
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed bottom-1/2 right-1/2 z-20 w-0">
            <div className=" w-fit -translate-x-1/2 translate-y-1/2 rounded-xl bg-white">
              <div>{children}</div>
            </div>
            <div
              className=" fixed left-0 top-0 -z-10 h-full w-full bg-black opacity-10 "
              onClick={modalToggleHandler}
            ></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalWindow;
