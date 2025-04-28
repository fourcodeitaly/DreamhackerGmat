"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Award, Clock } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "50,000+",
      label: "Active Users",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      value: "5,000+",
      label: "Practice Questions",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      value: "24/7",
      label: "Access",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-2 bg-primary-foreground/10 p-3 rounded-full">{stat.icon}</div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-primary-foreground/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
