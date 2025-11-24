import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Users, Activity, AlertCircle, CheckCircle2, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroVideo from "@assets/generated_images/vin.mp4";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden chakra-pattern">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-lg bg-gradient-to-r from-[#FF9933]/10 via-white/10 to-[#138808]/10 border border-[#FF9933]/20 px-3 py-1 text-sm font-medium">
                <span className="bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent font-semibold">
                  Public Grievance Portal (Prototype)
                </span>
              </div>
              <h1 className="text-4xl font-serif font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="text-[#000080]">Empowering Citizens,</span> <br />
                <span className="bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">
                  Strengthening Governance
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                A unified platform to report public sector issues, access government schemes, and track the progress of our nation's development.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/report-issue">
                  <Button
                    size="lg"
                    className="gap-2 font-semibold bg-[#000080] hover:bg-[#000066] text-white"
                  >
                    Report an Issue <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/schemes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white"
                  >
                    Browse Schemes
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto lg:ml-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-transparent aspect-video w-full max-w-[600px] gov-card">
                {heroVideo.endsWith('.mp4') || heroVideo.endsWith('.webm') || heroVideo.endsWith('.mov') ? (
                  <video
                    className="object-cover w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    controls={false}
                  >
                    <source src={heroVideo} type={heroVideo.endsWith('.mp4') ? 'video/mp4' : heroVideo.endsWith('.webm') ? 'video/webm' : 'video/quicktime'} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    alt="Digital India Governance"
                    className="object-cover w-full h-full"
                    src={heroVideo}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif text-[#000080]">
              Why Digital Public Seva?
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
              Transforming how citizens report issues and access government services
            </p>
          </div>

          {/* Problems Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-[#FF9933]">Common Public Issues</h3>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-2 border-gray-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-32 h-32 rounded-lg overflow-hidden bg-orange-50 flex items-center justify-center">
                      <img src="/assets/images/road-infrastructure-problem.jpg" alt="Road Damage" className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-[#000080]">Road Infrastructure</CardTitle>
                    <CardDescription className="text-left">
                      Potholes, damaged roads, and poor maintenance affect daily commute and safety of millions of citizens
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-2 border-gray-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-32 h-32 rounded-lg overflow-hidden bg-blue-50 flex items-center justify-center">
                      <img src="/assets/images/water-supply-problem.jpg" alt="Water Supply Issues" className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-[#000080]">Water Supply</CardTitle>
                    <CardDescription className="text-left">
                      Broken pipes, water shortages, and irregular supply disrupt households and businesses across communities
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-2 border-gray-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-32 h-32 rounded-lg overflow-hidden bg-yellow-50 flex items-center justify-center">
                      <img src="/assets/images/power-supply-problem.jpg" alt="Electricity Issues" className="w-full h-full object-cover" />
                    </div>
                    <CardTitle className="text-[#000080]">Power Supply</CardTitle>
                    <CardDescription className="text-left">
                      Frequent outages, damaged infrastructure, and electrical hazards impact productivity and quality of life
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Solution Section */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-[#FF9933]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-2xl font-bold text-[#138808]">Our Solution</span>
            </div>
          </div>

          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-4 border-[#138808] shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-r from-[#FF9933]/5 via-white to-[#138808]/5">
                <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#FF9933] via-[#000080] to-[#138808] flex items-center justify-center">
                  <Smartphone className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-serif text-[#000080]">Digital Public Seva Platform</CardTitle>
                <CardDescription className="text-lg mt-2">
                  One unified platform for all your public grievances
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#FF9933]/10 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-[#FF9933]" />
                    </div>
                    <h4 className="font-bold text-[#000080]">Report Instantly</h4>
                    <p className="text-sm text-gray-600">
                      Submit issues with photos and location in seconds
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#000080]/10 flex items-center justify-center">
                      <Activity className="w-8 h-8 text-[#000080]" />
                    </div>
                    <h4 className="font-bold text-[#000080]">Track Progress</h4>
                    <p className="text-sm text-gray-600">
                      Monitor real-time status updates and resolution timeline
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#138808]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#138808]" />
                    </div>
                    <h4 className="font-bold text-[#000080]">Get Results</h4>
                    <p className="text-sm text-gray-600">
                      Receive notifications when your issue is resolved
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/report-issue">
                    <Button size="lg" className="bg-[#138808] hover:bg-[#0f6606] text-white font-semibold">
                      Start Reporting Issues Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif text-[#000080]">
              How We Serve You
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Direct access to government services and grievance redressal mechanisms.
            </p>
          </div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 gov-card">
                <CardHeader>
                  <AlertCircle className="h-10 w-10 text-[#FF9933] mb-2" />
                  <CardTitle className="text-[#000080]">Report Issues</CardTitle>
                  <CardDescription>
                    Identify problems in public sectors like roads, water, or electricity and notify authorities directly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/report-issue">
                    <Button variant="link" className="p-0 h-auto text-[#000080] hover:text-[#FF9933]">
                      Learn more &rarr;
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 gov-card">
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-[#138808] mb-2" />
                  <CardTitle className="text-[#000080]">Government Schemes</CardTitle>
                  <CardDescription>
                    Discover welfare schemes from Central and State governments tailored for your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/schemes">
                    <Button variant="link" className="p-0 h-auto text-[#000080] hover:text-[#138808]">
                      Browse schemes &rarr;
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 gov-card">
                <CardHeader>
                  <Activity className="h-10 w-10 text-[#000080] mb-2" />
                  <CardTitle className="text-[#000080]">Track Progress</CardTitle>
                  <CardDescription>
                    View real-time dashboards on resolution status and development project milestones.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard">
                    <Button variant="link" className="p-0 h-auto text-[#000080] hover:text-[#FF9933]">
                      View dashboard &rarr;
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-[#000080] text-white relative overflow-hidden">
        {/* Subtle Ashoka Chakra background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-white"></div>
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-white"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
              Coming Soon
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Real-time statistics and analytics dashboard will be available soon to track our progress in serving the nation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
