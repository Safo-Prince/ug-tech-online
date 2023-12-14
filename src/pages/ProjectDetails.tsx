import { useState } from "react";

import ProjectDetailsBody from "../components/ProjectDetailsBody";
import FormModal from "../components/modals/FormModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const ProjectDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <FormModal open={open} setOpen={setOpen} />
      <Header setOpen={setOpen} />
      <Hero title="Multi-nutrient supplement for ruminants" techId="SOA 03" />
      <ProjectDetailsBody />
      <Footer />
    </div>
  );
};

export default ProjectDetails;
