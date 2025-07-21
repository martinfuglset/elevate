import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HelpCircle, Search, BookOpen, MessageCircle, Mail, Phone, FileText, ChevronRight, ExternalLink } from "lucide-react"

export default function HelpPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      items: [
        "How to create your first account",
        "Setting up your profile",
        "Understanding the dashboard",
        "Basic navigation guide"
      ]
    },
    {
      title: "Account & Billing",
      icon: FileText,
      items: [
        "Updating account information",
        "Changing your password",
        "Billing and subscription",
        "Account security settings"
      ]
    },
    {
      title: "Features & Usage",
      icon: HelpCircle,
      items: [
        "Using the main features",
        "Advanced functionality",
        "Keyboard shortcuts",
        "Mobile app usage"
      ]
    }
  ]

  const popularArticles = [
    {
      title: "How to get started with your account",
      description: "Learn the basics of setting up and using your account effectively.",
      category: "Getting Started",
      readTime: "5 min read"
    },
    {
      title: "Understanding your dashboard",
      description: "A comprehensive guide to navigating and understanding your dashboard.",
      category: "Features",
      readTime: "8 min read"
    },
    {
      title: "Managing user permissions",
      description: "Learn how to manage user roles and permissions in your workspace.",
      category: "Account",
      readTime: "6 min read"
    }
  ]

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "Send Email",
      href: "mailto:support@example.com"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
      href: "#"
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      action: "Call Now",
      href: "tel:+1-555-123-4567"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles, guides, and more..." 
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="grid gap-4 md:grid-cols-3">
        {faqCategories.map((category) => (
          <Card key={category.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    <span>{item}</span>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
          <CardDescription>
            Most frequently viewed help articles and guides.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="space-y-2">
                  <h3>{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>
            Can't find what you're looking for? Contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div key={method.title} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="p-2 bg-muted rounded-lg">
                  <method.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3>{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    {method.action}
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            Explore more resources to help you get the most out of our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
              <BookOpen className="h-5 w-5" />
              <div className="text-left">
                <div>Documentation</div>
                <div className="text-xs text-muted-foreground">Complete API docs</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div>Tutorials</div>
                <div className="text-xs text-muted-foreground">Step-by-step guides</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
              <MessageCircle className="h-5 w-5" />
              <div className="text-left">
                <div>Community</div>
                <div className="text-xs text-muted-foreground">Join discussions</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col items-start gap-2">
              <HelpCircle className="h-5 w-5" />
              <div className="text-left">
                <div>Status</div>
                <div className="text-xs text-muted-foreground">System status</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 