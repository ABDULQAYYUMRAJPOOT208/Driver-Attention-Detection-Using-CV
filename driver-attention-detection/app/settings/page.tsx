"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  // General settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  // Detection settings
  const [sensitivityLevel, setSensitivityLevel] = useState(75)
  const [detectionModel, setDetectionModel] = useState("standard")
  const [minimumAttentionThreshold, setMinimumAttentionThreshold] = useState(70)
  const [alertFrequency, setAlertFrequency] = useState("medium")

  // Account settings
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const handleResetSettings = () => {
    // Reset to defaults
    setNotificationsEnabled(true)
    setSoundAlertsEnabled(true)
    setAutoSaveEnabled(true)
    setDarkModeEnabled(false)
    setSensitivityLevel(75)
    setDetectionModel("standard")
    setMinimumAttentionThreshold(70)
    setAlertFrequency("medium")

    toast({
      title: "Settings Reset",
      description: "Your settings have been reset to default values.",
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="detection">Detection</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your application preferences and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when attention levels drop below threshold
                  </p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">Play audio alerts for critical attention warnings</p>
                </div>
                <Switch id="sound-alerts" checked={soundAlertsEnabled} onCheckedChange={setSoundAlertsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-Save Results</Label>
                  <p className="text-sm text-muted-foreground">Automatically save detection results to history</p>
                </div>
                <Switch id="auto-save" checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch id="dark-mode" checked={darkModeEnabled} onCheckedChange={setDarkModeEnabled} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="detection">
          <Card>
            <CardHeader>
              <CardTitle>Detection Settings</CardTitle>
              <CardDescription>
                Configure the sensitivity and behavior of the attention detection system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sensitivity">Detection Sensitivity</Label>
                  <span className="text-sm text-muted-foreground">{sensitivityLevel}%</span>
                </div>
                <Slider
                  id="sensitivity"
                  min={0}
                  max={100}
                  step={1}
                  value={[sensitivityLevel]}
                  onValueChange={(value) => setSensitivityLevel(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Higher sensitivity may detect subtle attention changes but may increase false positives
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detection-model">Detection Model</Label>
                <Select value={detectionModel} onValueChange={setDetectionModel}>
                  <SelectTrigger id="detection-model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lightweight">Lightweight (Faster)</SelectItem>
                    <SelectItem value="standard">Standard (Balanced)</SelectItem>
                    <SelectItem value="advanced">Advanced (More Accurate)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose between speed and accuracy based on your hardware capabilities
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="threshold">Minimum Attention Threshold</Label>
                  <span className="text-sm text-muted-foreground">{minimumAttentionThreshold}%</span>
                </div>
                <Slider
                  id="threshold"
                  min={50}
                  max={95}
                  step={5}
                  value={[minimumAttentionThreshold]}
                  onValueChange={(value) => setMinimumAttentionThreshold(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Scores below this threshold will trigger alerts and warnings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-frequency">Alert Frequency</Label>
                <Select value={alertFrequency} onValueChange={setAlertFrequency}>
                  <SelectTrigger id="alert-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Fewer Alerts)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="high">High (More Frequent)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How often to notify about attention issues</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveSettings}>Update Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
