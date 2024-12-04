import OpenAI from "openai"
import { NextResponse } from "next/server"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { formDataSchema } from "@/lib/schemas"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
})

const FORM_FIELD_DESCRIPTIONS = {
  fullName: "Full legal name of the individual",
  dateOfBirth: "Date of birth in YYYY-MM-DD format",
  email: "Valid email address",
  phone: "Phone number with area code",
  address: "Complete mailing address",
  occupation: "Current occupation or profession",
  annualIncome: "Annual income in USD (numeric value)",
  netWorth: "Total net worth in USD (numeric value)",
  investmentExperience: "Description of previous investment experience",
  riskTolerance: "Risk tolerance level (Low/Medium/High)",
  investmentGoals: "Primary investment objectives and goals",
  timeHorizon: "Expected investment time horizon in years",
  liquidityNeeds: "Description of liquidity requirements",
  taxStatus: "Current tax situation and considerations",
}

export async function POST(request: Request) {
  try {
    const { userInput } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a financial advisor assistant that helps analyze user input and extract relevant information to fill out a financial suitability form. The form has the following fields with their descriptions:

${Object.entries(FORM_FIELD_DESCRIPTIONS)
  .map(([field, desc]) => `${field}: ${desc}`)
  .join("\n")}

Analyze the user's input and return ONLY the fields that can be confidently determined from the provided information. Do not make assumptions or fill in fields without clear evidence from the user's input. Return with JSON format.`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      response_format: zodResponseFormat(formDataSchema, "formData"),
    })

    const response = completion.choices[0].message.content

    if (!response) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      )
    }

    return NextResponse.json(JSON.parse(response))
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Failed to process financial analysis" },
      { status: 500 }
    )
  }
}
