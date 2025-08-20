import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Users, FileText, Plus, Eye, BarChart3 } from "lucide-react";

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

interface AnalyticsData {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalUnsubscribed: number;
}

const Admin = () => {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({ totalSent: 0, totalOpened: 0, totalClicked: 0, totalUnsubscribed: 0 });
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState<string | null>(null);
  const [previewIssue, setPreviewIssue] = useState<NewsletterIssue | null>(null);
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
    loadAnalytics();
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

  const loadAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_analytics')
        .select('event_type');

      if (error) throw error;

      const analytics = (data || []).reduce((acc, event) => {
        acc[`total${event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}`] = 
          (acc[`total${event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}`] || 0) + 1;
        return acc;
      }, {} as any);

      setAnalytics({
        totalSent: analytics.totalSent || 0,
        totalOpened: analytics.totalOpened || 0,
        totalClicked: analytics.totalClicked || 0,
        totalUnsubscribed: analytics.totalUnsubscribed || 0,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
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

  const previewNewsletter = (issue: NewsletterIssue) => {
    setPreviewIssue(issue);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{confirmedSubscribers}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingSubscribers}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Send className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{analytics.totalSent}</p>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-500" />
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => previewNewsletter(issue)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    
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
                    
                    <p className="text-xs text-muted-foreground ml-auto">
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

        {/* Preview Modal */}
        {previewIssue && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preview: {previewIssue.title}</h3>
                <Button variant="outline" onClick={() => setPreviewIssue(null)}>
                  Close
                </Button>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="max-w-[680px] mx-auto bg-white border rounded-lg p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold">
                        B
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">BTEHub Newsletter</div>
                        <div className="text-xs text-slate-600">Learn AI • Build Solutions • Create Income</div>
                      </div>
                    </div>
                    
                    <hr className="my-4" />
                    
                    {/* Content */}
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">{previewIssue.title}</h1>
                    {previewIssue.subtitle && (
                      <p className="text-lg text-slate-600 mb-6">{previewIssue.subtitle}</p>
                    )}
                    
                    {previewIssue.content?.highlights && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">🚀 This Week's AI Highlights</h2>
                        <ul className="space-y-3">
                          {previewIssue.content.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-blue-600 font-bold">•</span>
                              <span className="text-slate-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {previewIssue.content?.insights && (
                      <div className="bg-slate-100 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-2">💡 Why This Matters</h3>
                        <p className="text-slate-700">{previewIssue.content.insights}</p>
                      </div>
                    )}
                    
                    {previewIssue.content?.callToAction && (
                      <div className="text-center py-4">
                        <p className="text-slate-600 italic">"{previewIssue.content.callToAction}"</p>
                      </div>
                    )}
                    
                    <hr className="my-4" />
                    
                    <div className="text-center text-sm text-slate-600">
                      <p>— BTEHub Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;