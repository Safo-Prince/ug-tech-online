import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import FormModal from "../components/modals/FormModal";
const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <FormModal open={open} setOpen={setOpen} />
      <Header setOpen={setOpen} />
      <Hero title="UG Online Technologies Portal" />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
