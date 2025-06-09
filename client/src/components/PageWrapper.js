// components/PageWrapper.tsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

 const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{
      duration: 0.4,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;