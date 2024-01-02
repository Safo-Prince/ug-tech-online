import * as React from "react";
import { useState } from "react";
import ProjectDetailsBody from "../components/ProjectDetailsBody";
import FormModal from "../components/modals/FormModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

import SubmissionModal from "../components/modals/SubmissionModal";

const ProjectDetails = () => {
  const [open, setOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);

  return (
    <div>
      <SubmissionModal open={submissionOpen} setOpen={setSubmissionOpen} />
      {/* @ts-ignore */}
      <FormModal open={open} setOpen={setOpen} setSubmissionOpen={setSubmissionOpen}
      />
      <Header setOpen={setOpen} />
      
      <ProjectDetailsBody />
      <Footer />
    </div>
  );
};

export default ProjectDetails;
