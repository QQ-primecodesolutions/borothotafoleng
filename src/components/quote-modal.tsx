"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  quoteSchema,
  SERVICE_OPTIONS,
  PROPERTY_TYPES,
  HONEYPOT_FIELD,
  type QuoteFormValues,
} from "@/lib/enquiry";

// Derived from the site content, so a new service in constants.ts shows up here.
const serviceOptions = SERVICE_OPTIONS;
const propertyTypes = PROPERTY_TYPES;

type FormState = "idle" | "submitting" | "success" | "error";

export function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  const form = useForm<QuoteFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: undefined,
      propertyType: undefined,
      location: "",
      preferredDate: "",
      message: "",
      consent: false as unknown as true,
      company: "",
    },
    resolver: zodResolver(quoteSchema),
  });

  const handleOpen = useCallback(() => {
    setOpen(true);
    setFormState("idle");
  }, []);

  useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener("open-quote-modal", handler);
    return () => window.removeEventListener("open-quote-modal", handler);
  }, [handleOpen]);

  const onSubmit = async (data: QuoteFormValues) => {
    setFormState("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "quote" }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const handleReset = () => {
    form.reset();
    setFormState("idle");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) handleReset(); }}>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-0"
      >
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CheckCircle2 className="h-20 w-20 text-brand-green" />
              </motion.div>
              <h3 className="font-heading text-xl font-bold mt-6 text-foreground">
                Quote Request Sent!
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Thank you for your interest. We&apos;ll get back to you within 24
                hours with a personalized quote.
              </p>
              <Button
                onClick={() => { setOpen(false); handleReset(); }}
                className="mt-8 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl px-8"
              >
                Done
              </Button>
            </motion.div>
          ) : formState === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
            >
              <XCircle className="h-20 w-20 text-destructive" />
              <h3 className="font-heading text-xl font-bold mt-6 text-foreground">
                Something Went Wrong
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                We couldn&apos;t submit your request. Please try again or contact us
                directly on WhatsApp.
              </p>
              <div className="flex gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setFormState("idle")}
                  className="rounded-xl px-6"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => { setOpen(false); handleReset(); }}
                  className="rounded-xl px-6 bg-brand-blue hover:bg-brand-blue-dark text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="font-heading text-xl font-bold text-brand-blue">
                  Request a Quote
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below and we&apos;ll get back to you with a
                  customized quote.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 pt-4 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
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
                  </div>

                  <FormField
                    control={form.control}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Service Required{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Property Type{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {propertyTypes.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="QwaQwa, Phuthaditjhaba" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your cleaning needs..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <FormField
                    control={form.control}
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
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start gap-3 rounded-xl bg-muted/50 p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-xs font-normal leading-relaxed text-muted-foreground">
                            I agree that Borotho Tafoleng may use the details
                            above to contact me about this enquiry, as set out
                            in the{" "}
                            <Link
                              href="/privacy"
                              target="_blank"
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

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { setOpen(false); handleReset(); }}
                      className="rounded-xl flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="rounded-xl flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
