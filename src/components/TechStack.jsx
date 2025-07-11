import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Icons
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiPostman, SiMongodb,
  SiJavascript, SiTypescript, SiRedux, SiTailwindcss,
  SiGithub, SiFirebase, SiThunderstore, SiSupabase, SiExpress,
  SiStreamlit, SiCplusplus, SiPython, SiMysql,
  SiPostgresql,
  SiDrizzle,
  SiPrisma
} from 'react-icons/si';

// Mapping tech names to icons and colors
const iconMap = {
  JavaScript: { Icon: SiJavascript, color: 'text-yellow-400' },
  TailwindCSS: { Icon: SiTailwindcss, color: 'text-cyan-500' },
  React: { Icon: SiReact, color: 'text-sky-500' },
  'Next.js': { Icon: SiNextdotjs, color: 'text-slate-800 dark:text-slate-200' },
  'Node.js': { Icon: SiNodedotjs, color: 'text-green-600' },
  Postman: { Icon: SiPostman, color: 'text-orange-500' },
  ThunderClient: { Icon: SiThunderstore, color: 'text-purple-600' },
  MongoDB: { Icon: SiMongodb, color: 'text-green-500' },
  Firebase: { Icon: SiFirebase, color: 'text-amber-500' },
  Superbase: { Icon: SiSupabase, color: 'text-green-500' },
  GitHub: { Icon: SiGithub, color: 'text-slate-800 dark:text-slate-200' },
  Express: { Icon: SiExpress, color: 'text-slate-700 dark:text-slate-300' },
  Streamlit: { Icon: SiStreamlit, color: 'text-pink-500' },
  'C++': { Icon: SiCplusplus, color: 'text-blue-700' },
  Python: { Icon: SiPython, color: 'text-sky-500' },
  MySQL: { Icon: SiMysql, color: 'text-blue-600 dark:text-blue-300' },
  PostgreSql: { Icon: SiPostgresql, color: 'text-blue-600 dark:text-blue-300' },
  Drizzle: { Icon: SiDrizzle, color: 'text-blue-600 dark:text-blue-300' },
  Prisma: { Icon: SiPrisma, color: 'text-blue-600 dark:text-blue-300' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

const TechStack = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    fetch('/data/homeData.json')
      .then(res => res.json())
      .then(data => {
        const rawTech = data?.technologies || [];
        const mappedTech = rawTech
          .map(tech => {
            const icon = iconMap[tech.name];
            return icon ? { ...tech, ...icon } : null;
          })
          .filter(Boolean); // remove nulls
        setTechnologies(mappedTech);
      })
      .catch(err => console.error('Failed to load technologies:', err));
  }, []);

  return (
    <motion.div
      key={technologies.length} // <- force re-render animation when loaded
      className="flex flex-wrap gap-6 justify-start"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {technologies.map(({ name, Icon, color }) => (
        <motion.div
          key={name}
          variants={item}
          className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
        >
          <Icon className={`h-8 w-8 ${color}`} />
          <span className="text-sm text-muted-foreground">
            {name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TechStack;
