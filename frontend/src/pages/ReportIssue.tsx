import { Navbar } from "@/components/layout/Navbar";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Clock, Phone, Mail, MapPin, Image as ImageIcon, X, User } from "lucide-react";

const INDIAN_STATES = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
  { value: "delhi", label: "Delhi" },
  { value: "jammu-kashmir", label: "Jammu and Kashmir" },
  { value: "ladakh", label: "Ladakh" },
  { value: "puducherry", label: "Puducherry" },
  { value: "chandigarh", label: "Chandigarh" },
  { value: "dadra-nagar-haveli-daman-diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "lakshadweep", label: "Lakshadweep" },
] as const;

const SECTORS = [
  { value: "health", label: "Health & Family Welfare" },
  { value: "education", label: "Education & Literacy" },
  { value: "infrastructure", label: "Roads & Infrastructure" },
  { value: "water", label: "Water Supply & Sanitation" },
  { value: "electricity", label: "Power & Electricity" },
  { value: "transport", label: "Public Transport" },
  { value: "agriculture", label: "Agriculture & Farmers Welfare" },
  { value: "environment", label: "Environment & Pollution" },
  { value: "law-order", label: "Law & Order" },
] as const;

const PRIORITY_LEVELS = [
  {
    value: "low",
    label: "Low",
    description: "Minor issues, can wait",
    color: "bg-green-100 text-green-800 border-green-300",
    timeline: "15-30 days"
  },
  {
    value: "medium",
    label: "Medium",
    description: "Moderate impact",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    timeline: "7-15 days"
  },
  {
    value: "high",
    label: "High",
    description: "Significant impact",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    timeline: "3-7 days"
  },
  {
    value: "critical",
    label: "Critical",
    description: "Urgent, immediate attention",
    color: "bg-red-100 text-red-800 border-red-300",
    timeline: "24-48 hours"
  },
] as const;

const QUICK_TAGS = [
  "Pothole",
  "Street Light",
  "Garbage Collection",
  "Water Leakage",
  "Power Outage",
  "Road Damage",
  "Drainage Issue",
  "Traffic Signal",
  "Other"
] as const;

const formSchema = z.object({
  state: z.string({
    required_error: "Please select your state.",
  }),
  district: z.string().min(2, {
    message: "District must be at least 2 characters.",
  }).trim(),
  pincode: z.string().regex(/^\d{6}$/, {
    message: "Pincode must be exactly 6 digits.",
  }).optional().or(z.literal("")),
  sector: z.string({
    required_error: "Please select a sector.",
  }),
  priority: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Please select priority level.",
  }),
  quickTag: z.string().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }).trim(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }).trim(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).trim(),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  }).optional().or(z.literal("")),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal("")),
  notifyBySMS: z.boolean().default(false),
  notifyByEmail: z.boolean().default(false),
  images: z.array(z.instanceof(File)).max(3, {
    message: "You can upload maximum 3 images.",
  }).optional(),
});

export default function ReportIssue() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "medium",
      notifyBySMS: false,
      notifyByEmail: false,
    },
  });

  const watchedPriority = form.watch("priority");
  const watchedQuickTag = form.watch("quickTag");

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append("title", values.subject);

      const fullDescription = `
**State:** ${values.state}
**District:** ${values.district}
${values.pincode ? `**Pincode:** ${values.pincode}` : ""}
**Sector:** ${values.sector}
**Priority:** ${values.priority.toUpperCase()}
${values.quickTag ? `**Category:** ${values.quickTag}` : ""}
**Location:** ${values.location}
${values.phone ? `**Contact Phone:** ${values.phone}` : ""}
${values.email ? `**Contact Email:** ${values.email}` : ""}
**Notifications:** ${values.notifyBySMS ? "SMS" : ""} ${values.notifyByEmail ? "Email" : ""}

**Details:**
${values.description}
      `.trim();

      formData.append("description", fullDescription);

      // Backend only accepts single image, send first one if available
      if (selectedFiles.length > 0) {
        formData.append("image", selectedFiles[0]);
      }

      const res = await fetch("/api/complaints", {
        method: "POST",
        body: formData,
        credentials: "include", // Important: include cookies for authentication
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to submit complaint" }));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully registered. You will receive updates based on your notification preferences.",
      });
      form.reset();
      setImagePreviews([]);
      setSelectedFiles([]);
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
    },
    onError: (error: Error) => {
      console.error("Submit error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Unable to submit complaint. Please check your connection and try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if user is logged in before submitting
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a complaint.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(values);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 3 images.",
        variant: "destructive",
      });
      return;
    }

    const newFiles = [...selectedFiles, ...files].slice(0, 3);
    setSelectedFiles(newFiles);

    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
    form.setValue("images", newFiles);
  };

  const removeImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);
    form.setValue("images", newFiles);
  };

  const selectedPriority = PRIORITY_LEVELS.find(p => p.value === watchedPriority);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 font-sans">
      <Navbar />

      {/* Hero Section with Visual Elements */}
      <div className="bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] py-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-serif font-bold mb-4">
              Report a Public Grievance
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your voice matters! Help us build a better India by reporting public issues directly to your state government.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 md:px-6">
        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[
              { num: 1, label: "Fill Details", icon: "📝" },
              { num: 2, label: "Submit", icon: "✅" }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#000080] text-white flex items-center justify-center text-2xl mb-2 shadow-lg">
                    {step.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{step.label}</span>
                </div>
                {idx < 1 && (
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#000080] to-[#FF9933] mx-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Important Notice with Icon */}
            <Alert className="mb-8 border-l-4 bg-orange-50 dark:bg-orange-900/20" style={{ borderLeftColor: "var(--color-saffron)" }}>
              <AlertTriangle className="h-5 w-5" style={{ color: "var(--color-saffron)" }} />
              <AlertDescription className="text-base">
                <strong>Important:</strong> Submit only genuine public issues. False complaints may result in legal action under applicable laws.
              </AlertDescription>
            </Alert>

            {/* Main Form with Visual Sections */}
            <Card className="border-t-4 shadow-2xl" style={{ borderTopColor: "var(--color-navy)" }}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="text-2xl flex items-center gap-3" style={{ color: "var(--color-navy)" }}>
                  <div className="w-10 h-10 rounded-full bg-[#000080] text-white flex items-center justify-center text-xl">
                    📝
                  </div>
                  Step 1: Fill in Issue Details
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8"
            >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ height: '400px' }}>
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/assets/images/report isseue video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </motion.div>
              </motion.div>
            </div>
        </div >
      </div >
      );
}
