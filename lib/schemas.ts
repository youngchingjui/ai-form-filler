import { z } from "zod"

export const formDataSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  occupation: z.string(),
  annualIncome: z.number(),
  netWorth: z.number(),
  investmentExperience: z.string(),
  riskTolerance: z.string(),
  investmentGoals: z.string(),
  timeHorizon: z.string(),
  liquidityNeeds: z.string(),
  taxStatus: z.string(),
})
