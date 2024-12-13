import Navbar from "../../components/molecules/Navbar/Navbar";
import AnimatedOutlet from "./AnimatedOutlet";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <AnimatedOutlet />
      </main>
    </>
  );
};
