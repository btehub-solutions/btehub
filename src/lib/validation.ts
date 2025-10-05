import { z } from "zod";
import DOMPurify from "dompurify";

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim(), { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  
  lastName: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address")
    .toLowerCase(),
  
  interest: z.string()
    .trim()
    .max(200, "Interest must be less than 200 characters")
    .optional(),
  
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Booking Form Validation Schema
 */
export const bookingFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address")
    .toLowerCase(),
  
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number"),
  
  serviceType: z.string()
    .trim()
    .min(1, "Please select a service type"),
  
  notes: z.string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

/**
 * Chat Message Validation Schema
 */
export const chatMessageSchema = z.object({
  message: z.string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(1000, "Message must be less than 1000 characters")
});

export type ChatMessageData = z.infer<typeof chatMessageSchema>;

/**
 * Newsletter Subscription Validation Schema
 */
export const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address")
    .toLowerCase()
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
