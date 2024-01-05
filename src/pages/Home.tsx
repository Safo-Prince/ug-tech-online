import * as React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import FormModal from "../components/modals/FormModal";
import SubmissionModal from "../components/modals/SubmissionModal";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (submissionOpen) {
        setSubmissionOpen(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [submissionOpen]);

  return (
    <div className="min-h-screen  flex flex-col justify-between">
      <SubmissionModal open={submissionOpen} setOpen={setSubmissionOpen} />
      {/* @ts-ignore */}
      <FormModal
        open={open}
        setOpen={setOpen}
        setSubmissionOpen={setSubmissionOpen}
      />
      <Header setOpen={setOpen} />
      <Hero
        title="Innovation & Technology Portal"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default Home;
