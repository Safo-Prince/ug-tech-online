import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import AdminTable from "../components/AdminTable";

const Administrator: React.FC = () => {
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

export default Administrator;
