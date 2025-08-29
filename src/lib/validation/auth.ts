import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalid'),
  password: z.string().min(6, 'Parolă minim 6 caractere'),
  remember: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email('Email invalid'),
    password: z.string().min(6, 'Parolă minim 6 caractere'),
    confirm: z.string().min(6, 'Parolă minim 6 caractere'),
    userType: z.enum(['shipper', 'carrier'], { required_error: 'Selectează tipul de utilizator' }),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'Trebuie să accepți termenii și condițiile' }),
    }),
    full_name: z.string().trim().min(1).max(200).optional(),
    company_name: z.string().trim().min(1).max(200).optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Parolele nu coincid',
    path: ['confirm'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

// Metadata for Supabase raw_user_meta_data
export const userMetadataSchema = z.object({
  user_type: z.enum(['shipper', 'carrier']),
  full_name: z.string().trim().min(1).max(200).optional(),
  company_name: z.string().trim().min(1).max(200).optional(),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;


