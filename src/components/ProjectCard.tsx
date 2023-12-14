import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Project {
  image: string;
  project_id: string;
  title: string;
  description: string;
}

interface Props {
  project: Project;
}

const item = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};
const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      variants={item}
      className=" w-full sm:w-80 xl:w-96   border rounded-md p-3   shadow-sm space-y-2   cursor-pointer"
    >
      <img src={project.image} className="rounded-md object-cover " />
      <div>
        <h1 className="text-black text-sm">{project.project_id}</h1>
        <h2 className="text-[#56585B] text-xl font-bold">{project.title}</h2>
      </div>
      <div>
        <p className="text-[#56585B] xl:text-lg">{project.description}</p>
        <button
          onClick={() => navigate("/project-details")}
          className="bg-[#153D6D] text-white py-1 px-3  rounded-md text-sm mt-2"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
