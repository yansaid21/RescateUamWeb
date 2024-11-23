import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { x: "60%", opacity: 0.3 }, // Start off-screen to the right
  in: { x: 0, opacity: 1 }, // Move to original position
  out: { x: "-100%", opacity: 0 }, // Move off-screen to the left
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.3,
};

export const AnimatedOutlet = () => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Outlet />
    </motion.div>
  );
};

export default AnimatedOutlet;
