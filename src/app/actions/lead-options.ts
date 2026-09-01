/* Shared option lists for the consultation form.

   These live outside submit-lead.ts on purpose: that file is a "use server"
   module, and such a module may only export async functions at runtime.
   Exporting a plain array from it throws ("can only export async functions"),
   so the action and the form component both import from here instead. */

export const SOLUTIONS = ["idexi Pass", "idexi Flow", "idexi Face", "Full suite"] as const;

export const EVENT_TYPES = [
  "Graduation",
  "Competition",
  "Conference",
  "Corporate summit",
  "Trade show",
  "Wedding",
] as const;
