'use client';

import { motion } from 'framer-motion';

export interface InternshipItem {
    company: string;
    date: string;
    role: string;
}

interface InternshipsProps {
    title?: string;
    items: InternshipItem[];
}

export default function Internships({ title = 'Internship Experience', items }: InternshipsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.article
                        key={`${item.company}-${item.date}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 * index }}
                        className="rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                            <h3 className="font-semibold leading-snug text-primary">{item.company}</h3>
                            <time className="shrink-0 text-sm font-medium text-accent">{item.date}</time>
                        </div>
                        <p className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400">{item.role}</p>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
