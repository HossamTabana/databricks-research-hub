import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Moon, Sun, BookOpen, Code2, Database, Package, Link2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [filteredContent, setFilteredContent] = useState("");
  const [activeSection, setActiveSection] = useState("all");

  useEffect(() => {
    // Load markdown content
    fetch('/research.md')
      .then(response => response.text())
      .then(text => {
        setMarkdownContent(text);
        setFilteredContent(text);
      });
  }, []);

  useEffect(() => {
    if (!markdownContent) return;

    let content = markdownContent;

    // Filter by section
    if (activeSection !== "all") {
      const sections = {
        "apps": "## Databricks Apps",
        "lakehouse": "## Databricks Lakehouse",
        "bundles": "## Databricks Asset Bundles",
        "integration": "## Integration Patterns"
      };
      
      const sectionStart = content.indexOf(sections[activeSection as keyof typeof sections]);
      if (sectionStart !== -1) {
        const nextSection = content.indexOf("\n## ", sectionStart + 10);
        content = nextSection !== -1 
          ? content.substring(sectionStart, nextSection)
          : content.substring(sectionStart);
      }
    }

    // Filter by search query
    if (searchQuery) {
      const lines = content.split('\n');
      const matchedLines: string[] = [];
      const query = searchQuery.toLowerCase();
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(query)) {
          // Include context: 2 lines before and 5 lines after
          const start = Math.max(0, i - 2);
          const end = Math.min(lines.length, i + 6);
          matchedLines.push(...lines.slice(start, end));
          matchedLines.push('\n---\n');
          i = end;
        }
      }
      
      content = matchedLines.length > 0 
        ? matchedLines.join('\n')
        : "No results found for your search query.";
    }

    setFilteredContent(content);
  }, [searchQuery, activeSection, markdownContent]);

  const downloadPDF = () => {
    window.open('/Databricks_Comprehensive_Research_Complete.pdf', '_blank');
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Databricks_Research.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const topics = [
    {
      id: "apps",
      title: "Databricks Apps",
      icon: <Code2 className="w-5 h-5" />,
      description: "Production-ready platform for building data and AI applications",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      id: "lakehouse",
      title: "Databricks Lakehouse",
      icon: <Database className="w-5 h-5" />,
      description: "Unified architecture combining data lakes and warehouses",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      id: "bundles",
      title: "Asset Bundles",
      icon: <Package className="w-5 h-5" />,
      description: "Infrastructure-as-code for Databricks resources",
      color: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    {
      id: "integration",
      title: "Integration Patterns",
      icon: <Link2 className="w-5 h-5" />,
      description: "Combining Apps, Lakehouse, and Bundles",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Databricks Research Hub
                </h1>
                <p className="text-sm text-muted-foreground">Comprehensive Guide to Apps, Lakehouse & Asset Bundles</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={downloadMarkdown}>
                <Download className="w-4 h-4 mr-2" />
                Markdown
              </Button>
              <Button variant="outline" size="sm" onClick={downloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                activeSection === topic.id ? topic.color : 'border-border/40'
              }`}
              onClick={() => setActiveSection(activeSection === topic.id ? "all" : topic.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {topic.icon}
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </div>
                <CardDescription className="text-xs">{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation... (e.g., 'streamlit', 'medallion', 'CI/CD')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          {searchQuery && (
            <div className="text-center mt-2">
              <Badge variant="secondary">
                Searching: {searchQuery}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="ml-2"
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Content Display */}
        <Card className="border-border/40">
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="p-8 prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                            }}
                          >
                            Copy
                          </Button>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    table(props: any) {
                      return (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full border-collapse border border-border">
                            {props.children}
                          </table>
                        </div>
                      );
                    },
                    th(props: any) {
                      return (
                        <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                          {props.children}
                        </th>
                      );
                    },
                    td(props: any) {
                      return (
                        <td className="border border-border px-4 py-2">
                          {props.children}
                        </td>
                      );
                    },
                  }}
                >
                  {filteredContent}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Comprehensive research compiled from official Databricks documentation, GitHub repositories, and community resources.
          </p>
          <p className="mt-2">
            Last updated: October 20, 2025 | {markdownContent.split('\n').length} lines of documentation
          </p>
        </div>
      </main>
    </div>
  );
}

