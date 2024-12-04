import { z } from "zod"

export const formDataSchema = z.object({
  fullName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  occupation: z.string().optional(),
  annualIncome: z.number().nullable().optional(),
  netWorth: z.number().nullable().optional(),
  investmentExperience: z.string().optional(),
  riskTolerance: z.string().optional(),
  investmentGoals: z.string().optional(),
  timeHorizon: z.string().optional(),
  liquidityNeeds: z.string().optional(),
  taxStatus: z.string().optional(),
})
