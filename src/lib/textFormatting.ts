/**
 * Removes markdown formatting and cleans up text for display
 */
export function cleanMarkdown(text: string): string {
  return text
    // Remove bold markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Remove italic markers
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove header markers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove inline code markers
    .replace(/`([^`]+)`/g, '$1')
    // Remove strikethrough
    .replace(/~~([^~]+)~~/g, '$1')
    // Clean up extra whitespace but preserve line breaks
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Formats text with proper spacing for readability
 */
export function formatChatMessage(text: string): string {
  const cleaned = cleanMarkdown(text);
  
  // Split into sentences and add proper spacing
  return cleaned
    // Add spacing after periods when followed by capital letters (new sentences)
    .replace(/\.([A-Z])/g, '. $1')
    // Add spacing after colons
    .replace(/:([^\s])/g, ': $1')
    // Ensure list items have proper spacing
    .replace(/\n-\s*/g, '\n• ')
    .trim();
}
