import { ReactNode } from 'react';
import { motion } from 'motion/react';

type ButtonToggleProps = {
  children: ReactNode;
};

export const ButtonToggle = ({ children }: ButtonToggleProps) => {
  return (
    <div className="flex justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 4 }}
        className="button button--primary"
        style={{ cursor: 'pointer' }}
      >
        {children}
      </motion.button>
    </div>
  );
};
