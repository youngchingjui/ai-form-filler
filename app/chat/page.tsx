"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, StopCircle } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event) => {
          const current = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("")
          setTranscript(current)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsRecording(false)
        }
      }
    }
  }, [])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      console.error("Speech recognition not supported")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
    } else {
      setTranscript("")
      recognitionRef.current.start()
    }
    setIsRecording(!isRecording)
  }

  const handleSendMessage = async () => {
    if (!transcript.trim()) return

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: transcript }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const reader = response.body?.getReader()
      if (!reader) return

      setMessages((prev) => [...prev, `You: ${transcript}`])
      setTranscript("")

      let aiResponse = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Convert the chunk to text
        const chunk = new TextDecoder().decode(value)
        aiResponse += chunk

        // Update the messages with the current accumulated response
        setMessages((prev) => {
          const newMessages = [...prev]
          if (newMessages[newMessages.length - 1]?.startsWith("AI:")) {
            newMessages[newMessages.length - 1] = `AI: ${aiResponse}`
          } else {
            newMessages.push(`AI: ${aiResponse}`)
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Voice Chat with AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[400px] overflow-y-auto space-y-2 bg-muted p-4 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className="bg-background p-2 rounded">
                {message}
              </div>
            ))}
            {transcript && (
              <div className="bg-background p-2 rounded opacity-50">
                {transcript}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? (
                <>
                  <StopCircle className="h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Recording
                </>
              )}
            </Button>
            <Button onClick={handleSendMessage} disabled={!transcript}>
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
