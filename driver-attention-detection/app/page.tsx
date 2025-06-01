import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Camera, FileVideo, Upload } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            <span className="text-xl font-bold">DriveSense</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/history" className="text-sm font-medium hover:underline underline-offset-4">
              History
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:underline underline-offset-4">
              Settings
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Driver Attention Detection System
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Advanced AI-powered system to monitor driver attention in real-time. Upload images, videos, or use
                  your webcam for instant analysis.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
                  <CardContent className="p-0">
                    <img
                      src="/img_208.jpg?height=400&width=600"
                      alt="Driver attention detection system"
                      width={600}
                      height={400}
                      className="aspect-video object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                Our system uses advanced AI to detect driver attention levels through various input methods.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center p-6">
                <Upload className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Image Analysis</h3>
                <p className="text-muted-foreground">
                  Upload driver images for instant attention analysis and detailed reports.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <FileVideo className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Video Processing</h3>
                <p className="text-muted-foreground">
                  Process video footage to track attention patterns over time with frame-by-frame analysis.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <Camera className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Live Webcam</h3>
                <p className="text-muted-foreground">
                  Real-time monitoring through webcam with instant alerts for attention lapses.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DriveSense. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
