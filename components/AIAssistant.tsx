"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mic, StopCircle } from "lucide-react"

type AIAssistantProps = {
  onFill: (data: Record<string, string>) => void
  onOpenChange: (isOpen: boolean) => void
}

export default function AIAssistant({
  onFill,
  onOpenChange,
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleAIFill = async () => {
    // This is where you would typically call your AI service to process the input
    // For now, we'll just simulate it with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulated AI response
    const aiResponse = {
      fullName: "John Doe",
      dateOfBirth: "1990-01-01",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      occupation: "Software Developer",
      annualIncome: "100000",
      netWorth: "500000",
      investmentExperience: "Moderate experience with stocks and bonds",
      riskTolerance: "Medium risk tolerance",
      investmentGoals: "Retirement savings and wealth accumulation",
      timeHorizon: "20 years",
      liquidityNeeds: "Low, can keep investments for long term",
      taxStatus: "Employed, standard tax bracket",
    }

    onFill(aiResponse)
    setIsOpen(false)
    onOpenChange(false)
    setInput("")
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would typically start or stop the speech recognition
    // For now, we'll just simulate it with a timeout
    if (!isRecording) {
      setTimeout(() => {
        setInput(
          (prevInput) => prevInput + " This is simulated speech-to-text input."
        )
        setIsRecording(false)
      }, 3000)
    }
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    onOpenChange(!isOpen)
  }

  return (
    <>
      <Button variant="outline" onClick={toggleOpen}>
        {isOpen ? "Close AI Assistant" : "Use AI Assistant"}
      </Button>
      {isOpen && (
        <Card className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto z-50 shadow-lg">
          <CardHeader>
            <CardTitle>AI Form Filling Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your financial situation and investment goals..."
              className="min-h-[4em] resize-none overflow-hidden w-full max-w-md mx-auto"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={toggleRecording}>
              {isRecording ? (
                <StopCircle className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              {isRecording ? "Stop Recording" : "Start Voice Input"}
            </Button>
            <Button onClick={handleAIFill}>Fill Form</Button>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
