import { useEffect } from 'react';
import { logger } from '@/lib/logger';

/**
 * Performance monitoring hook
 * Tracks key web vitals and logs performance metrics
 */
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only monitor in production
    if (import.meta.env.DEV) return;

    // Log page load time
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (perfData) {
        logger.info('Page Performance', {
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          firstPaint: Math.round(perfData.responseStart - perfData.fetchStart),
        });
      }
    });

    // Monitor Core Web Vitals if available
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          logger.info('LCP', { value: Math.round(lastEntry.startTime) });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            logger.info('FID', { value: Math.round(entry.processingStart - entry.startTime) });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              logger.info('CLS', { value: Math.round(clsValue * 1000) / 1000 });
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        logger.error('Performance monitoring error', error);
      }
    }
  }, []);
};
