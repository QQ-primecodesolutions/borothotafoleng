'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
  subtitle?: string;
}

export function FAQSection({
  faqs,
  heading = 'Frequently Asked Questions',
  subtitle = "Find answers to common questions about our cleaning services.",
}: FAQSectionProps) {
  return (
    <section className="bg-brand-light py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title={heading} subtitle={subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/60"
              >
                <AccordionTrigger className="font-heading text-base font-semibold text-brand-dark hover:no-underline hover:text-brand-blue sm:text-lg">
                  <span className="text-left">{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-brand-blue transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
