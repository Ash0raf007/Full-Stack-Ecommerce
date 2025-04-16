"use client";

import store from "@/Redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";



const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <Provider store={store}>  

      {children}
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
</Provider>
  );
};

export default Providers;