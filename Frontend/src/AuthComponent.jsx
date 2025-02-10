
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter,CardHeader, CardTitle ,CardDescription} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthComponent() {
  return (
    <Card className="w-full max-w-md bg-white text-gray-800">
      <CardHeader>
        <CardTitle>Welcome to Péregrin</CardTitle>
        <CardDescription>Sign in to start your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" placeholder="Enter your email" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" placeholder="Enter your password" type="password" />
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name-register">Name</Label>
                  <Input id="name-register" placeholder="Enter your name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email-register">Email</Label>
                  <Input id="email-register" placeholder="Enter your email" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password-register">Password</Label>
                  <Input id="password-register" placeholder="Choose a password" type="password" />
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Submit</Button>
      </CardFooter>
    </Card>
  )
}