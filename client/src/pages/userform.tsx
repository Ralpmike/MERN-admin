"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
// import axiosInstance from "@/base/axios";
import userAuthServices from "../services/user.auth.servcies";

const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(16, "Age must be at least 16")
    .max(100, "Age must be less than 100"),
  location: z
    .string()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .min(2, "Nationality must be at least 2 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .min(2, "State must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  course: z.enum(
    [
      "web developement",
      "mobile development",
      "backend development",
      "game development",
      "design",
      "other",
    ],
    {
      required_error: "Please select a course",
    }
  ),
});

export type UserFormValues = z.infer<typeof userSchema>;

const courseOptions = [
  { value: "web developement", label: "Web Development" },
  { value: "mobile development", label: "Mobile Development" },
  { value: "backend development", label: "Backend Development" },
  { value: "game development", label: "Game Development" },
  { value: "design", label: "Design" },
  { value: "other", label: "Other" },
];

const nationalityOptions = [
  "American",
  "Canadian",
  "British",
  "Australian",
  "German",
  "French",
  "Italian",
  "Spanish",
  "Japanese",
  "Chinese",
  "Indian",
  "Brazilian",
  "Mexican",
  "Russian",
  "South African",
  "Nigerian",
  "Egyptian",
  "Argentinian",
  "Colombian",
  "Other",
];

export default function UserRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = userAuthServices;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      location: "",
      nationality: "",
      city: "",
      state: "",
      phoneNumber: "",
      course: "other",
    },
  });

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);
    try {
      await registerUser(data);
      form.reset();
      console.log("User registration data:", data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="text-center my-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Project Genesis Form Registration
        </h2>
        <p className="text-lg text-gray-600">
          Your oppurtunity to become a software engineer starts here! Why not
          register for our bootcamp and get started on your journey?
        </p>
      </div>
      <Card className="w-full max-w-2xl mx-auto my-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Registration
          </CardTitle>
          <CardDescription className="text-center">
            Please fill out all required fields to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This email must be unique
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            min="16"
                            max="100"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Must be between 16 and 100
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormDescription>
                        Include country code if international
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nationalityOptions.map((nationality) => (
                            <SelectItem
                              key={nationality}
                              value={nationality.toLowerCase()}
                            >
                              {nationality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Location Information
                </h3>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full address or general location"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your general location or full address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province *</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Course Selection Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Course Selection
                </h3>

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseOptions.map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the course you're most interested in
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {isLoading ? "Loading..." : " Complete Registration"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
