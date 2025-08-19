import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Users, FileText, Plus } from "lucide-react";

interface NewsletterIssue {
  id: string;
  title: string;
  subtitle?: string;
  content: any;
  status: string;
  issue_number: number;
  created_at: string;
  published_at?: string;
}

interface Subscription {
  id: string;
  email: string;
  status: string;
  created_at: string;
  confirmed_at?: string;
}

const Admin = () => {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState<string | null>(null);
  const [newIssue, setNewIssue] = useState({
    title: "",
    subtitle: "",
    highlights: [""],
    insights: "",
    callToAction: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadIssues();
    loadSubscribers();
  }, []);

  const loadIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIssues(data || []);
    } catch (error) {
      console.error('Error loading issues:', error);
    }
  };

  const loadSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    }
  };

  const createIssue = async () => {
    setIsCreating(true);
    try {
      const nextIssueNumber = Math.max(...issues.map(i => i.issue_number), 0) + 1;
      
      const { error } = await supabase
        .from('newsletter_issues')
        .insert([{
          title: newIssue.title,
          subtitle: newIssue.subtitle || null,
          issue_number: nextIssueNumber,
          content: {
            highlights: newIssue.highlights.filter(h => h.trim()),
            insights: newIssue.insights,
            callToAction: newIssue.callToAction,
          },
          status: 'draft'
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Newsletter issue created successfully",
      });

      setNewIssue({
        title: "",
        subtitle: "",
        highlights: [""],
        insights: "",
        callToAction: "",
      });
      
      loadIssues();
    } catch (error) {
      console.error('Error creating issue:', error);
      toast({
        title: "Error",
        description: "Failed to create newsletter issue",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const sendNewsletter = async (issueId: string) => {
    setIsSending(issueId);
    try {
      const response = await supabase.functions.invoke('newsletter-send', {
        body: { issueId }
      });

      if (response.error) throw response.error;

      toast({
        title: "Success!",
        description: `Newsletter sent to ${response.data.totalSent} subscribers`,
      });

      loadIssues();
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to send newsletter",
        variant: "destructive",
      });
    } finally {
      setIsSending(null);
    }
  };

  const addHighlight = () => {
    setNewIssue(prev => ({
      ...prev,
      highlights: [...prev.highlights, ""]
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setNewIssue(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const removeHighlight = (index: number) => {
    setNewIssue(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const confirmedSubscribers = subscribers.filter(s => s.status === 'confirmed').length;
  const pendingSubscribers = subscribers.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Newsletter Admin</h1>
          <p className="text-muted-foreground">Manage your BTEHub newsletter campaigns</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{confirmedSubscribers}</p>
                <p className="text-sm text-muted-foreground">Confirmed Subscribers</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingSubscribers}</p>
                <p className="text-sm text-muted-foreground">Pending Confirmations</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{issues.length}</p>
                <p className="text-sm text-muted-foreground">Total Issues</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Issue */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Create New Issue</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                <Input
                  value={newIssue.title}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your Weekly AI Newsletter 🚀"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subtitle (optional)</label>
                <Input
                  value={newIssue.subtitle}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Brief description of this week's content"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Highlights</label>
                {newIssue.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Textarea
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="AI breakthrough or important update..."
                      className="flex-1"
                      rows={2}
                    />
                    {newIssue.highlights.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeHighlight(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addHighlight} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Why This Matters</label>
                <Textarea
                  value={newIssue.insights}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, insights: e.target.value }))}
                  placeholder="Explain the impact and implications..."
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Call to Action</label>
                <Input
                  value={newIssue.callToAction}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, callToAction: e.target.value }))}
                  placeholder="How do you see AI changing your workflow?"
                />
              </div>

              <Button 
                onClick={createIssue} 
                disabled={!newIssue.title || isCreating}
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Issue"}
              </Button>
            </div>
          </Card>

          {/* Issues List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Issues</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {issues.map((issue) => (
                <div key={issue.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">Issue #{issue.issue_number}</p>
                    </div>
                    <Badge variant={issue.status === 'published' ? 'default' : 'secondary'}>
                      {issue.status}
                    </Badge>
                  </div>
                  
                  {issue.subtitle && (
                    <p className="text-sm text-muted-foreground mb-2">{issue.subtitle}</p>
                  )}
                  
                  <div className="flex items-center gap-2 mt-3">
                    {issue.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => sendNewsletter(issue.id)}
                        disabled={isSending === issue.id}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {isSending === issue.id ? "Sending..." : "Send Now"}
                      </Button>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(issue.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {issues.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No newsletter issues yet. Create your first one!
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;