import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterIssue {
  id: string;
  title: string;
  subtitle?: string;
  content: any;
  issue_number: number;
  published_at: string;
  created_at: string;
}

const NewsletterArchive = () => {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublishedIssues();
  }, []);

  const loadPublishedIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_issues')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setIssues(data || []);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content: any) => {
    if (!content) return null;

    return (
      <div className="space-y-6">
        {content.highlights && content.highlights.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              🚀 This Week's AI Highlights
            </h3>
            <ul className="space-y-3">
              {content.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.insights && (
          <div className="bg-secondary/30 p-6 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              💡 Why This Matters
            </h4>
            <p className="text-muted-foreground leading-relaxed">{content.insights}</p>
          </div>
        )}

        {content.callToAction && (
          <div className="text-center py-4">
            <p className="text-muted-foreground italic">"{content.callToAction}"</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <div className="animate-pulse">Loading newsletter archive...</div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedIssue) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedIssue(null)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Archive
          </Button>

          <article className="bg-background">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Issue #{selectedIssue.issue_number}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedIssue.published_at).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedIssue.title}
              </h1>
              {selectedIssue.subtitle && (
                <p className="text-xl text-muted-foreground">{selectedIssue.subtitle}</p>
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              {renderContent(selectedIssue.content)}
            </div>

            <footer className="mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  — BTEHub Team
                </p>
                <p className="text-sm text-primary">
                  <em>BTEHub: Learn AI • Build Solutions • Create Income</em>
                </p>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/" className="text-primary hover:underline flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Newsletter Archive
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse past issues of the BTEHub AI Newsletter
          </p>
        </header>

        {issues.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Issues Yet</h2>
            <p className="text-muted-foreground mb-6">
              We haven't published any newsletter issues yet. Check back soon!
            </p>
            <Link to="/">
              <Button>Subscribe to Get Notified</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <Card 
                key={issue.id} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Issue #{issue.issue_number}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(issue.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {issue.title}
                    </h2>
                    {issue.subtitle && (
                      <p className="text-muted-foreground mb-4">{issue.subtitle}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Read
                  </Button>
                </div>
                
                {issue.content?.highlights && issue.content.highlights.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {issue.content.highlights[0]}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterArchive;