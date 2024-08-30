'use client'
import { motion } from "framer-motion";

export default function Motion({children}) {
    return (
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{children}</motion.div>
    )
  }