import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationLayoutInfo {
  // Safe area insets
  top: number;
  bottom: number;
  left: number;
  right: number;
  
  // Tab bar dimensions
  tabBarHeight: number;
  
  // Screen dimensions
  screenWidth: number;
  screenHeight: number;
  
  // Calculated safe areas
  safeAreaTop: number;
  safeAreaBottom: number;
  
  // Utility functions
  getContentPadding: () => {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
  
  getTabBarOffset: () => number;
  
  getFullHeight: () => number;
  
  getContentHeight: () => number;
}

// Constants for tab bar
const TAB_BAR_HEIGHT = 60;
const TAB_BAR_PADDING_TOP = 8;
const TAB_BAR_PADDING_BOTTOM = 8;

export function useNavigationLayout(): NavigationLayoutInfo {
  const insets = useSafeAreaInsets();
  const [screenDimensions, setScreenDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const safeAreaTop = insets.top;
  const safeAreaBottom = Math.max(insets.bottom, TAB_BAR_HEIGHT);

  const getContentPadding = () => ({
    paddingTop: safeAreaTop,
    paddingBottom: safeAreaBottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  });

  const getTabBarOffset = () => TAB_BAR_HEIGHT + insets.bottom;

  const getFullHeight = () => screenDimensions.height;

  const getContentHeight = () => screenDimensions.height - safeAreaTop - safeAreaBottom;

  return {
    // Safe area insets
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    
    // Tab bar dimensions
    tabBarHeight: TAB_BAR_HEIGHT,
    
    // Screen dimensions
    screenWidth: screenDimensions.width,
    screenHeight: screenDimensions.height,
    
    // Calculated safe areas
    safeAreaTop,
    safeAreaBottom,
    
    // Utility functions
    getContentPadding,
    getTabBarOffset,
    getFullHeight,
    getContentHeight,
  };
} 