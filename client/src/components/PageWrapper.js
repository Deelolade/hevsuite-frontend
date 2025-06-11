// components/PageWrapper.tsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    x: 100,
  },
  animate: {
    x: 0
  },
  exit: {
    x: 0,
  },
};

 const PageWrapper = ({ children }) => (
  <motion.div
    // variants={pageVariants}
    // initial="initial"
    // animate="animate"
    // exit="exit"
    // transition={{
    //   duration: 0.8,
    //   delay: 0.1,
    //   ease: "easeInOut",
    // }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;

// // PageWrapper.tsx
// import { motion } from "framer-motion";

// const variants = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
// };

// export default function PageWrapper({ children }: { children: React.ReactNode }) {
//   return (
//     <motion.div
//       variants={variants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       transition={{ duration: 0.4 }}
//     >
//       {children}
//     </motion.div>
//   );
// }
