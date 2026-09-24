'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  CheckCircle,
  Facebook,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SectionHeading } from '@/components/section-heading';
import { COMPANY, PHONE_HREF, EMAIL_HREF, whatsappUrl } from '@/lib/constants';
import {
  contactSchema,
  CONTACT_SUBJECTS,
  HONEYPOT_FIELD,
  type ContactFormValues,
} from '@/lib/enquiry';
import { fadeIn, viewportOnce } from '@/lib/scroll';

type ContactFormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [contactState, setContactState] = useState<ContactFormState>('idle');
  const whatsapp = whatsappUrl();

  const contactForm = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: undefined,
      message: '',
      consent: false as unknown as true,
      company: '',
    },
    resolver: zodResolver(contactSchema),
  });

  const onContactSubmit = async (data: ContactFormValues) => {
    setContactState('submitting');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact' }),
      });
      if (res.ok) {
        setContactState('success');
        contactForm.reset();
      } else {
        setContactState('error');
      }
    } catch {
      setContactState('error');
    }
  };

  return (
    <section
      id="contact"
      className="bg-brand-light py-16 sm:py-20 lg:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl lg:max-w-7xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="We'd love to hear from you. Reach out through any of these channels."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact info cards */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {/* Phone */}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Phone className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phone
                </p>
                <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                  {COMPANY.phone}
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 transition-colors group-hover:bg-[#25D366]">
                <MessageCircle className="h-5 w-5 text-[#25D366] transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </p>
                <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                  Send us a message
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={EMAIL_HREF}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Mail className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                  {COMPANY.email}
                </p>
              </div>
            </a>

            {/* Facebook */}
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 transition-colors group-hover:bg-[#1877F2]">
                <Facebook className="h-5 w-5 text-[#1877F2] transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Facebook
                </p>
                <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                  Follow us on Facebook
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                <MapPin className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Address
                </p>
                <p className="mt-0.5 font-heading text-base font-semibold text-brand-dark">
                  {COMPANY.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <h3 className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
                Send Us a Message
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you.
              </p>

              {contactState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-brand-green" />
                  <h4 className="mt-4 font-heading text-lg font-bold text-brand-dark">
                    Message Sent!
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for reaching out. We&apos;ll respond within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => setContactState('idle')}
                    className="mt-6 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-6"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit(onContactSubmit)}
                    className="mt-6 space-y-4"
                  >
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={contactForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="072 000 0000"
                                type="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="you@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contactForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Subject <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONTACT_SUBJECTS.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what you need..."
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot — hidden from people, irresistible to bots. */}
                    <FormField
                      control={contactForm.control}
                      name={HONEYPOT_FIELD}
                      render={({ field }) => (
                        <div aria-hidden="true" className="hidden">
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            {...field}
                          />
                        </div>
                      )}
                    />

                    {/* POPIA consent — unticked by default, required to submit. */}
                    <FormField
                      control={contactForm.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 rounded-xl bg-brand-light p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="text-xs font-normal leading-relaxed text-muted-foreground">
                              I agree that {COMPANY.shortName} may use the
                              details above to contact me about this enquiry, as
                              set out in the{' '}
                              <Link
                                href="/privacy"
                                className="text-brand-blue underline underline-offset-2"
                              >
                                Privacy Policy
                              </Link>
                              .
                            </FormLabel>
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />

                    {contactState === 'error' && (
                      <p className="text-sm text-destructive">
                        Something went wrong. Please try again, or reach us on
                        WhatsApp.
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={contactState === 'submitting'}
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-3 font-semibold shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                    >
                      {contactState === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Google Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34926.57555548775!2d28.774095999999997!3d-28.58158195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef2b178c8b3cc49%3A0x8e34cd72785410df!2sTseki%2C%20Phuthaditjhaba%2C%209874!5e1!3m2!1sen!2sza!4v1786060371683!5m2!1sen!2sza"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Borotho Tafoleng Cleaning &amp; Maintenance - Location: QwaQwa, Phuthaditjhaba"
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
