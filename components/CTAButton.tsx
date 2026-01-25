'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export function CTAButton({ text, href, variant = 'primary' }: CTAButtonProps) {
  const baseClasses = "inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 min-w-[44px] min-h-[44px] text-center";
  
  const variantClasses = {
    primary: "bg-accent text-white hover:bg-accent/90 hover:shadow-lg",
    secondary: "bg-secondary text-foreground hover:bg-secondary/80 border-2 border-accent"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {text}
      </Link>
    </motion.div>
  );
}
