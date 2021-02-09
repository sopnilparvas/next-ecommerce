import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

function Notify() {
  const { state, dispatch } = useContext(DataContext);

  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          message={{ msg: notify.error, title: "Error" }}
          handleClose={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor='bg-danger'
        />
      )}
      {notify.success && (
        <Toast
          message={{ msg: notify.success, title: "Success" }}
          handleClose={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor='bg-success'
        />
      )}
    </>
  );
}

export default Notify;
