import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const schemesData = [
  {
    id: 1,
    title: "PM Kisan Samman Nidhi",
    description: "Financial assistance of ₹6000 per year to all farmer families across the country in three equal installments of ₹2000 each.",
    level: "Central",
    sector: "Agriculture",
    tags: ["Farmers", "Direct Benefit Transfer"],
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Ayushman Bharat - PM-JAY",
    description: "World's largest health insurance scheme providing coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
    level: "Central",
    sector: "Health",
    tags: ["Health Insurance", "Wellness"],
    status: "Upcoming",
  },
  {
    id: 3,
    title: "PM Awas Yojana",
    description: "Affordable housing scheme for urban and rural poor with financial assistance for construction of pucca houses with basic amenities.",
    level: "Central",
    sector: "Housing",
    tags: ["Urban", "Rural", "Housing"],
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Swachh Bharat Mission",
    description: "National campaign to clean streets, roads and infrastructure of India's cities, towns and rural areas. Focus on sanitation and waste management.",
    level: "Central",
    sector: "Sanitation",
    tags: ["Cleanliness", "Toilets", "Waste Management"],
    status: "Upcoming",
  },
  {
    id: 5,
    title: "Digital India",
    description: "Transforming India into a digitally empowered society and knowledge economy through digital infrastructure, digital literacy and digital services.",
    level: "Central",
    sector: "Technology",
    tags: ["Digital", "Technology", "E-Governance"],
    status: "Upcoming",
  },
  {
    id: 6,
    title: "Skill India Mission",
    description: "Enabling youth to take up industry-relevant skill training that will help them in securing a better livelihood through Skill Development programs.",
    level: "Central",
    sector: "Education",
    tags: ["Skill Development", "Employment", "Training"],
    status: "Upcoming",
  },
  {
    id: 7,
    title: "Make in India",
    description: "Initiative to encourage companies to manufacture products in India and incentivize dedicated investments into manufacturing.",
    level: "Central",
    sector: "Manufacturing",
    tags: ["Manufacturing", "Investment", "Employment"],
    status: "Upcoming",
  },
  {
    id: 8,
    title: "Startup India",
    description: "Flagship initiative to build a strong ecosystem for nurturing innovation and startups in the country with tax benefits and funding support.",
    level: "Central",
    sector: "Business",
    tags: ["Startups", "Innovation", "Funding"],
    status: "Upcoming",
  },
  {
    id: 9,
    title: "Pradhan Mantri Jan Dhan Yojana",
    description: "National mission for financial inclusion to ensure access to financial services like banking, savings, deposit accounts, remittance, credit, insurance, pension.",
    level: "Central",
    sector: "Finance",
    tags: ["Banking", "Financial Inclusion"],
    status: "Upcoming",
  },
  {
    id: 10,
    title: "Beti Bachao Beti Padhao",
    description: "Campaign to address declining child sex ratio and related issues of women empowerment through education and awareness.",
    level: "Central",
    sector: "Women & Child",
    tags: ["Women Empowerment", "Education", "Girl Child"],
    status: "Upcoming",
  },
  {
    id: 11,
    title: "Jal Jeevan Mission",
    description: "Aims to provide safe and adequate drinking water through individual household tap connections by 2024 to all households in rural India.",
    level: "Central",
    sector: "Water",
    tags: ["Water Supply", "Rural Development"],
    status: "Upcoming",
  },
  {
    id: 12,
    title: "PM Ujjwala Yojana",
    description: "Scheme to provide LPG connections to women from Below Poverty Line (BPL) households to ensure universal coverage of cooking gas in the country.",
    level: "Central",
    sector: "Energy",
    tags: ["LPG", "Women Welfare", "Clean Energy"],
    status: "Upcoming",
  },
];

export default function Schemes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] py-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-serif font-bold mb-4">
              Government Schemes
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Discover various government welfare schemes
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Upcoming Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Alert className="border-2 bg-gradient-to-r from-orange-50 via-white to-green-50 dark:from-gray-800 dark:to-gray-700" style={{ borderColor: "var(--color-saffron)" }}>
            <Rocket className="h-5 w-5" style={{ color: "var(--color-saffron)" }} />
            <AlertDescription className="ml-2">
              <strong className="text-lg" style={{ color: "var(--color-navy)" }}>Upcoming Feature - Work in Progress</strong>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                This feature is currently under development. The schemes listed below are for preview purposes. Full functionality including eligibility checker, application guidance, and detailed information will be available soon!
              </p>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemesData.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col border-2 hover:shadow-lg transition-shadow" style={{ borderColor: "var(--color-navy)" }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-yellow-500 text-white">
                      {scheme.status}
                    </Badge>
                    <Badge variant="outline" style={{ borderColor: "var(--color-navy)", color: "var(--color-navy)" }}>
                      {scheme.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl" style={{ color: "var(--color-navy)" }}>
                    {scheme.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <Badge variant="secondary" className="mt-2">
                      {scheme.sector}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {scheme.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled
                    style={{ backgroundColor: "var(--color-navy)", opacity: 0.5 }}
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
