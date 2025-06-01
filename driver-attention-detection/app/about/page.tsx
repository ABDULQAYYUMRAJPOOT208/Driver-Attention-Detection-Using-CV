import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Brain, Car, CheckCircle, Eye, Shield } from "lucide-react"

export default function AboutPage() {
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About DriveSense</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Advanced AI-powered system designed to monitor and enhance driver attention for safer roads.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                <p className="text-muted-foreground md:text-xl">
                  At DriveSense, we're committed to reducing accidents caused by driver inattention. Our
                  cutting-edge technology helps drivers stay focused and alert, making roads safer for everyone.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Prevent accidents through early detection of inattention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Provide real-time alerts to refocus driver attention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Analyze patterns to improve driver habits over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Create a safer driving environment for all road users</span>
                  </li>
                </ul>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Driver safety technology"
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our advanced AI technology monitors multiple factors to determine driver attention levels.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center p-6">
                <Eye className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Eye Tracking</h3>
                <p className="text-muted-foreground">
                  Monitors eye movement patterns to detect signs of drowsiness or distraction.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <Brain className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Neural Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced neural networks analyze facial expressions and micro-movements.
                </p>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <Car className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Driving Patterns</h3>
                <p className="text-muted-foreground">
                  Identifies changes in driving behavior that may indicate reduced attention.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:mr-auto order-2 lg:order-1">
                <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="AI technology"
                      width={600}
                      height={400}
                      className="aspect-video object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter">Our Technology</h2>
                <p className="text-muted-foreground md:text-xl">
                DriveSense uses state-of-the-art computer vision and machine learning algorithms specifically
                  trained on driver behavior data. Our models can detect subtle changes in attention levels before they
                  become dangerous.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Privacy-focused design that processes data locally</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Real-time processing with minimal latency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Continuous learning to improve detection accuracy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Works in various lighting and environmental conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to enhance your driving safety?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start using DriveSense today and experience the future of driver safety technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
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
