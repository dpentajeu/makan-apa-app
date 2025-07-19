import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useNavigationLayout } from './useNavigationLayout';

interface HeaderLayoutInfo {
  // Header container styles
  headerContainerStyle: {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    backgroundColor: string;
  };
  
  // Header content styles
  headerContentStyle: {
    paddingHorizontal: number;
    paddingVertical: number;
  };
  
  // Status bar height
  statusBarHeight: number;
  
  // Utility functions
  getHeaderPadding: (options?: {
    includeStatusBar?: boolean;
    customPadding?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  }) => {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
  
  getHeaderHeight: (contentHeight: number) => number;
}

export function useHeaderLayout(): HeaderLayoutInfo {
  const navigationLayout = useNavigationLayout();
  
  const statusBarHeight = useMemo(() => {
    // Default status bar heights for different platforms
    if (Platform.OS === 'ios') {
      return navigationLayout.top;
    } else if (Platform.OS === 'android') {
      return navigationLayout.top;
    }
    return 0;
  }, [navigationLayout.top]);
  
  const headerContainerStyle = useMemo(() => ({
    paddingTop: statusBarHeight,
    paddingBottom: 16,
    paddingLeft: navigationLayout.left,
    paddingRight: navigationLayout.right,
    backgroundColor: '#FFFFFF',
  }), [statusBarHeight, navigationLayout.left, navigationLayout.right]);
  
  const headerContentStyle = useMemo(() => ({
    paddingHorizontal: 20,
    paddingVertical: 16,
  }), []);
  
  const getHeaderPadding = (options: {
    includeStatusBar?: boolean;
    customPadding?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  } = {}) => {
    const { includeStatusBar = true, customPadding = {} } = options;
    
    return {
      paddingTop: (includeStatusBar ? statusBarHeight : 0) + (customPadding.top || 0),
      paddingBottom: headerContainerStyle.paddingBottom + (customPadding.bottom || 0),
      paddingLeft: headerContainerStyle.paddingLeft + (customPadding.left || 0),
      paddingRight: headerContainerStyle.paddingRight + (customPadding.right || 0),
    };
  };
  
  const getHeaderHeight = (contentHeight: number) => 
    statusBarHeight + contentHeight + headerContainerStyle.paddingBottom;
  
  return {
    headerContainerStyle,
    headerContentStyle,
    statusBarHeight,
    getHeaderPadding,
    getHeaderHeight,
  };
} 