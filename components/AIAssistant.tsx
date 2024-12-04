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
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleAIFill = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-financial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze financial information")
      }

      const data = await response.json()

      // Remove all undefined or null values
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      )

      onFill(cleanedData as Record<string, string>)
      setIsOpen(false)
      onOpenChange(false)
      setInput("")
    } catch (error) {
      console.error("Error processing AI response:", error)
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false)
    }
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
            <Button onClick={toggleRecording} disabled={isLoading}>
              {isRecording ? (
                <StopCircle className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              {isRecording ? "Stop Recording" : "Start Voice Input"}
            </Button>
            <Button onClick={handleAIFill} disabled={isLoading}>
              {isLoading ? "Processing..." : "Fill Form"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
