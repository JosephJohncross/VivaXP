"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"
import { Volume2, VolumeX, Pause, Play, Square, Settings } from "lucide-react"

interface TextToSpeechProps {
  text: string
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  showControls?: boolean
}

export function TextToSpeech({ 
  text, 
  className = "", 
  variant = "ghost", 
  size = "sm",
  showControls = false 
}: TextToSpeechProps) {
  const {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    isSupported,
    voices,
    currentVoice,
    setVoice,
  } = useTextToSpeech()

  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)

  if (!isSupported) {
    return null // Hide component if not supported
  }

  const handleSpeak = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume()
      } else {
        pause()
      }
    } else {
      speak(text, { rate, pitch, volume, voice: currentVoice })
    }
  }

  const handleStop = () => {
    stop()
  }

  const getIcon = () => {
    if (isSpeaking && !isPaused) {
      return <Pause className="h-4 w-4 neon-glow" />
    } else if (isSpeaking && isPaused) {
      return <Play className="h-4 w-4 neon-glow" />
    } else {
      return <Volume2 className="h-4 w-4 neon-glow" />
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={handleSpeak}
        className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
        title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Read aloud"}
      >
        {getIcon()}
        {size !== "icon" && (
          <span className="ml-1">
            {isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen"}
          </span>
        )}
      </Button>

      {isSpeaking && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStop}
          className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
          title="Stop"
        >
          <Square className="h-4 w-4" />
        </Button>
      )}

      {showControls && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
              title="Speech settings"
            >
              <Settings className="h-4 w-4 neon-glow" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 cyber-card border border-border/50">
            <DropdownMenuLabel className="text-gradient-primary">Speech Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Voice Selection */}
            <div className="p-3">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Voice
              </label>
              <select
                value={currentVoice?.name || ""}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value) || null
                  setVoice(voice)
                }}
                className="w-full p-2 rounded border border-border/50 bg-background text-foreground text-sm"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Rate Control */}
            <div className="p-3">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Speed: {rate.toFixed(1)}x
              </label>
              <Slider
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Pitch Control */}
            <div className="p-3">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Pitch: {pitch.toFixed(1)}
              </label>
              <Slider
                value={[pitch]}
                onValueChange={(value) => setPitch(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Volume Control */}
            <div className="p-3">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Volume: {Math.round(volume * 100)}%
              </label>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
