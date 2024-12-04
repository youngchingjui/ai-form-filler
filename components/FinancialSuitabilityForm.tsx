"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import AIAssistant from "./AIAssistant"
import { formDataSchema } from "@/lib/schemas"
import { z } from "zod"

type FormData = {
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  occupation: string
  annualIncome: number
  netWorth: number
  investmentExperience: string
  riskTolerance: string
  investmentGoals: string
  timeHorizon: string
  liquidityNeeds: string
  taxStatus: string
}

export default function FinancialSuitabilityForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    annualIncome: 0,
    netWorth: 0,
    investmentExperience: "",
    riskTolerance: "",
    investmentGoals: "",
    timeHorizon: "",
    liquidityNeeds: "",
    taxStatus: "",
  })

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "annualIncome" || name === "netWorth" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      formDataSchema.parse(formData)
      console.log("Form submitted:", formData)
      setFormErrors([])
      // Proceed with form submission logic, such as sending data to an API
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error("Validation errors:", error.errors)
        setFormErrors(error.errors)
      } else {
        console.error("An unexpected error occurred:", error)
      }
    }
  }

  return (
    <Card
      className={`w-full max-w-4xl mx-auto ${isAIAssistantOpen ? "mb-48" : ""}`}
    >
      <CardHeader>
        <CardTitle>Financial Suitability Form</CardTitle>
        <CardDescription>
          Please fill out this form to assess your financial suitability for
          investment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.find((error) => error.path[0] === "email") && (
                <p className="text-red-500 text-sm">
                  {
                    formErrors.find((error) => error.path[0] === "email")
                      ?.message
                  }
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {formErrors.find((error) => error.path[0] === "phone") && (
                <p className="text-red-500 text-sm">
                  {
                    formErrors.find((error) => error.path[0] === "phone")
                      ?.message
                  }
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "address") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "address")
                    ?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "occupation") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "occupation")
                    ?.message
                }
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Input
                id="annualIncome"
                name="annualIncome"
                type="number"
                value={formData.annualIncome}
                onChange={handleInputChange}
                required
              />
              {formErrors.find((error) => error.path[0] === "annualIncome") && (
                <p className="text-red-500 text-sm">
                  {
                    formErrors.find((error) => error.path[0] === "annualIncome")
                      ?.message
                  }
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="netWorth">Net Worth</Label>
              <Input
                id="netWorth"
                name="netWorth"
                type="number"
                value={formData.netWorth}
                onChange={handleInputChange}
                required
              />
              {formErrors.find((error) => error.path[0] === "netWorth") && (
                <p className="text-red-500 text-sm">
                  {
                    formErrors.find((error) => error.path[0] === "netWorth")
                      ?.message
                  }
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="investmentExperience">Investment Experience</Label>
            <Textarea
              id="investmentExperience"
              name="investmentExperience"
              value={formData.investmentExperience}
              onChange={handleInputChange}
              required
            />
            {formErrors.find(
              (error) => error.path[0] === "investmentExperience"
            ) && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find(
                    (error) => error.path[0] === "investmentExperience"
                  )?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
            <Textarea
              id="riskTolerance"
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "riskTolerance") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "riskTolerance")
                    ?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="investmentGoals">Investment Goals</Label>
            <Textarea
              id="investmentGoals"
              name="investmentGoals"
              value={formData.investmentGoals}
              onChange={handleInputChange}
              required
            />
            {formErrors.find(
              (error) => error.path[0] === "investmentGoals"
            ) && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find(
                    (error) => error.path[0] === "investmentGoals"
                  )?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeHorizon">Investment Time Horizon</Label>
            <Input
              id="timeHorizon"
              name="timeHorizon"
              value={formData.timeHorizon}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "timeHorizon") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "timeHorizon")
                    ?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="liquidityNeeds">Liquidity Needs</Label>
            <Textarea
              id="liquidityNeeds"
              name="liquidityNeeds"
              value={formData.liquidityNeeds}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "liquidityNeeds") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "liquidityNeeds")
                    ?.message
                }
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxStatus">Tax Status</Label>
            <Input
              id="taxStatus"
              name="taxStatus"
              value={formData.taxStatus}
              onChange={handleInputChange}
              required
            />
            {formErrors.find((error) => error.path[0] === "taxStatus") && (
              <p className="text-red-500 text-sm">
                {
                  formErrors.find((error) => error.path[0] === "taxStatus")
                    ?.message
                }
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AIAssistant
          onFill={(data) =>
            setFormData((prevData) => ({ ...prevData, ...data }))
          }
          onOpenChange={setIsAIAssistantOpen}
        />
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
