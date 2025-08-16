"use client"

import { useState, useEffect } from "react"
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
import { Volume2, VolumeX, Pause, Play, Square, Settings, Bot, X } from "lucide-react"

interface FloatingAIAssistantProps {
  className?: string
}

export function FloatingAIAssistant({ className = "" }: FloatingAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [currentPageText, setCurrentPageText] = useState("")
  
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

  // Auto-detect page content for text-to-speech
  useEffect(() => {
    const detectPageContent = () => {
      const pathname = window.location.pathname
      let pageText = ""

      switch (pathname) {
        case "/":
          pageText = "Welcome to VidaXP - Your Web3 Real Estate Platform. Invest in Real Estate with Blockchain Security. Discover tokenized real estate opportunities across Africa. Buy, rent, or invest in properties with transparent escrow transactions and fractional ownership."
          break
        case "/select-role":
          pageText = "Choose Your Web3 Journey - Enter the future of real estate with blockchain technology. Select your role to access personalized features and start your decentralized property experience. Choose from Crypto Investor, Property Owner, Tenant, or Real Estate Developer."
          break
        case "/dashboard":
          pageText = "Investment Dashboard - Track your real estate investments and portfolio performance. View your portfolio overview, investment holdings, and discover new investment opportunities in tokenized real estate."
          break
        case "/listings":
          pageText = "Property Listings - Discover real estate opportunities across Africa. Rent, buy, or invest in verified properties. Use the filters to find properties by location, price range, property type, and more."
          break
        case "/about":
          pageText = "About VidaXP - Revolutionizing Real Estate Through Blockchain Technology. VidaXP is pioneering the future of real estate investment by making property ownership accessible, transparent, and profitable through tokenization and smart contracts."
          break
        default:
          pageText = "VidaXP - Your Web3 Real Estate Platform. Navigate through our cyberpunk-themed interface to discover tokenized real estate investments and explore the future of property ownership."
      }
      
      setCurrentPageText(pageText)
    }

    detectPageContent()
    
    // Listen for route changes
    const handleRouteChange = () => {
      setTimeout(detectPageContent, 100) // Small delay to ensure page has loaded
    }
    
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

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
      speak(currentPageText, { rate, pitch, volume, voice: currentVoice })
    }
  }

  const handleStop = () => {
    stop()
  }

  const getMainIcon = () => {
    if (isSpeaking && !isPaused) {
      return <Pause className="h-5 w-5" />
    } else if (isSpeaking && isPaused) {
      return <Play className="h-5 w-5" />
    } else {
      return <Bot className="h-5 w-5" />
    }
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Minimized floating button */}
      {isMinimized && (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 border-2 border-primary/30 transition-all duration-300 hover:scale-110 glow-effect"
          title="AI Assistant - Click to expand"
        >
          {getMainIcon()}
        </Button>
      )}

      {/* Expanded floating panel */}
      {!isMinimized && (
        <div className="cyber-card border border-border/50 rounded-lg shadow-2xl bg-background/95 backdrop-blur-sm p-4 w-80 glow-on-hover">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary neon-glow" />
              <span className="font-semibold text-gradient-primary">AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main controls */}
          <div className="flex items-center gap-2 mb-4">
            <Button
              onClick={handleSpeak}
              className="flex-1 gradient-primary text-white glow-effect border-0 hover:pulse-glow"
              title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Read page aloud"}
            >
              {getMainIcon()}
              <span className="ml-2">
                {isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen"}
              </span>
            </Button>

            {isSpeaking && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleStop}
                className="hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                title="Stop"
              >
                <Square className="h-4 w-4" />
              </Button>
            )}

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-secondary/10 hover:text-secondary border-secondary/30"
                  title="Speech settings"
                >
                  <Settings className="h-4 w-4 neon-glow" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 cyber-card border border-border/50" align="end">
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
          </div>

          {/* Status indicator */}
          <div className="text-xs text-muted-foreground text-center">
            {isSpeaking ? (isPaused ? "Paused" : "Speaking...") : "Ready to assist"}
          </div>
        </div>
      )}
    </div>
  )
}
