//import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";
import axios from "axios";
import * as React from "react";
//import AprrovalModal from "../components/modals/ApprovalModal";

const baseURL = 'https://innovate.ug.edu.gh/loginstatus';

{
  /* @ts-ignore */
}
/* @ts-ignore */
export default function Administrator(props: any) {
  const [authStatus, setAuthStatus] = React.useState(null);
  React.useEffect(()=>{
    axios.get(baseURL).then((response) => {
      setAuthStatus(response.data);
    });
  });
  console.log(authStatus);
  if(authStatus==false) {
    history.pushState({urlPath:''},"",'/login')
    window.location.reload()
  }

  return (
    <div className="flex flex-col sm:h-screen">
      <Header
        setOpen={() => {
          return;
        }}
      />
      <Hero title="List of Applicants" />
      <AdminTable />
      <Footer />
    </div>
  );
};


