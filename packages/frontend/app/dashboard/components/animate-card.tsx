"use client";

import { motion } from "framer-motion";

/**
 * A parent component for all the dashboard cards so that they are all
 * consistently animated
 *
 * @param props - The props object
 * @returns An animation
 */
const AnimateCard = ({
  children,
  delay = 0,
}: {
  children: JSX.Element;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1.5, delay },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateCard;
