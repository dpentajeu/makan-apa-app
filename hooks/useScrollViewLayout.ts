import { useMemo } from 'react';
import { useNavigationLayout } from './useNavigationLayout';

interface ScrollViewLayoutInfo {
  // Content container styles
  contentContainerStyle: {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
  
  // Scroll view styles
  scrollViewStyle: {
    flex: number;
  };
  
  // Bottom spacing for content
  bottomSpacing: number;
  
  // Utility functions
  getContentPadding: (additionalPadding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }) => {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
  
  getBottomSpacing: (additionalSpacing?: number) => number;
}

export function useScrollViewLayout(): ScrollViewLayoutInfo {
  const navigationLayout = useNavigationLayout();
  
  const contentContainerStyle = useMemo(() => ({
    paddingTop: navigationLayout.safeAreaTop,
    paddingBottom: navigationLayout.getTabBarOffset() + 20, // Extra padding for content
    paddingLeft: navigationLayout.left,
    paddingRight: navigationLayout.right,
  }), [navigationLayout]);
  
  const scrollViewStyle = useMemo(() => ({
    flex: 1,
  }), []);
  
  const bottomSpacing = useMemo(() => 
    navigationLayout.getTabBarOffset() + 20, [navigationLayout]
  );
  
  const getContentPadding = (additionalPadding = {}) => ({
    paddingTop: contentContainerStyle.paddingTop + (additionalPadding.top || 0),
    paddingBottom: contentContainerStyle.paddingBottom + (additionalPadding.bottom || 0),
    paddingLeft: contentContainerStyle.paddingLeft + (additionalPadding.left || 0),
    paddingRight: contentContainerStyle.paddingRight + (additionalPadding.right || 0),
  });
  
  const getBottomSpacing = (additionalSpacing = 0) => 
    bottomSpacing + additionalSpacing;
  
  return {
    contentContainerStyle,
    scrollViewStyle,
    bottomSpacing,
    getContentPadding,
    getBottomSpacing,
  };
} 