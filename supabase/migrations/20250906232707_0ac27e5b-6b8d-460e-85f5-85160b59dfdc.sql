-- Create a sample newsletter issue
INSERT INTO newsletter_issues (title, subtitle, issue_number, content, status) 
VALUES (
  '🚀 AI Automation Revolution: Week 1',
  'How small businesses are saving 40% costs with no-code AI tools',
  1,
  '{
    "highlights": [
      "OpenAI announced enhanced enterprise features that help companies create custom AI assistants in minutes",
      "New no-code AI tools are making automation accessible to small businesses, reducing operational costs by up to 40%",
      "Video generation AI reached new quality levels, opening opportunities for creators and marketers worldwide",
      "AI consultants are reporting 300% income increases by offering AI implementation services to local businesses"
    ],
    "insights": "We are witnessing the democratization of AI tools. Small businesses and individual creators now have access to enterprise-level AI capabilities. This shift creates massive opportunities for those who learn to harness these tools effectively. Whether you are automating workflows, creating content, or offering AI services, the potential for income generation has never been higher.",
    "callToAction": "How do you see AI changing your daily workflow? What opportunities are you exploring?"
  }',
  'published'
);