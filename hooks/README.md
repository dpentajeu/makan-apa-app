# Navigation Layout Hooks

This collection of utility hooks helps prevent overlapping issues in React Native navigation, particularly with tab bars, status bars, and safe areas.

## Hooks Overview

### 1. `useNavigationLayout`
The core hook that provides safe area insets, tab bar dimensions, and screen information.

```typescript
import { useNavigationLayout } from '@/hooks';

function MyComponent() {
  const layout = useNavigationLayout();
  
  return (
    <View style={{ 
      paddingTop: layout.safeAreaTop,
      paddingBottom: layout.getTabBarOffset()
    }}>
      {/* Your content */}
    </View>
  );
}
```

**Returns:**
- `top`, `bottom`, `left`, `right`: Safe area insets
- `tabBarHeight`: Height of the tab bar (60px)
- `screenWidth`, `screenHeight`: Screen dimensions
- `safeAreaTop`, `safeAreaBottom`: Calculated safe areas
- `getContentPadding()`: Get complete padding object
- `getTabBarOffset()`: Get tab bar height + bottom safe area
- `getFullHeight()`: Get full screen height
- `getContentHeight()`: Get available content height

### 2. `useScrollViewLayout`
Specialized hook for ScrollView components to handle content padding and bottom spacing.

```typescript
import { useScrollViewLayout } from '@/hooks';

function MyScrollView() {
  const scrollLayout = useScrollViewLayout();
  
  return (
    <ScrollView
      style={scrollLayout.scrollViewStyle}
      contentContainerStyle={scrollLayout.contentContainerStyle}
    >
      {/* Your scrollable content */}
    </ScrollView>
  );
}
```

**Returns:**
- `contentContainerStyle`: Pre-configured content container styles
- `scrollViewStyle`: ScrollView container styles
- `bottomSpacing`: Calculated bottom spacing for content
- `getContentPadding(additionalPadding)`: Get padding with custom additions
- `getBottomSpacing(additionalSpacing)`: Get bottom spacing with custom additions

### 3. `useHeaderLayout`
Specialized hook for header components to handle status bar and safe area padding.

```typescript
import { useHeaderLayout } from '@/hooks';

function MyHeader() {
  const headerLayout = useHeaderLayout();
  
  return (
    <View style={headerLayout.headerContainerStyle}>
      <View style={headerLayout.headerContentStyle}>
        <Text>My Header</Text>
      </View>
    </View>
  );
}
```

**Returns:**
- `headerContainerStyle`: Pre-configured header container styles
- `headerContentStyle`: Header content padding styles
- `statusBarHeight`: Status bar height
- `getHeaderPadding(options)`: Get header padding with options
- `getHeaderHeight(contentHeight)`: Calculate total header height

## Common Use Cases

### 1. Basic Screen Layout
```typescript
import { useNavigationLayout } from '@/hooks';

function MyScreen() {
  const layout = useNavigationLayout();
  
  return (
    <View style={{ 
      flex: 1,
      paddingTop: layout.safeAreaTop,
      paddingBottom: layout.getTabBarOffset()
    }}>
      {/* Screen content */}
    </View>
  );
}
```

### 2. ScrollView with Proper Spacing
```typescript
import { useScrollViewLayout } from '@/hooks';

function MyScrollScreen() {
  const scrollLayout = useScrollViewLayout();
  
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={scrollLayout.contentContainerStyle}
    >
      {/* Scrollable content */}
      <View style={{ height: scrollLayout.bottomSpacing }} />
    </ScrollView>
  );
}
```

### 3. Custom Header
```typescript
import { useHeaderLayout } from '@/hooks';

function MyHeader() {
  const headerLayout = useHeaderLayout();
  
  return (
    <View style={headerLayout.headerContainerStyle}>
      <View style={headerLayout.headerContentStyle}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          My App Title
        </Text>
      </View>
    </View>
  );
}
```

### 4. Floating Elements
```typescript
import { useNavigationLayout } from '@/hooks';

function FloatingButton() {
  const layout = useNavigationLayout();
  
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: layout.getTabBarOffset() + 20,
        right: 20,
        // ... other styles
      }}
    >
      {/* Button content */}
    </TouchableOpacity>
  );
}
```

## Benefits

1. **Automatic Safe Area Handling**: No more manual calculations for different devices
2. **Tab Bar Overlap Prevention**: Content automatically accounts for tab bar height
3. **Responsive Design**: Adapts to screen size changes and orientation
4. **Platform Consistency**: Works consistently across iOS and Android
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Performance Optimized**: Uses `useMemo` for expensive calculations

## Migration Guide

### Before (Manual Padding)
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Hard-coded value
    paddingBottom: 100, // Hard-coded value
  },
});
```

### After (Using Hooks)
```typescript
import { useScrollViewLayout } from '@/hooks';

function MyComponent() {
  const scrollLayout = useScrollViewLayout();
  
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={scrollLayout.contentContainerStyle}
    >
      {/* Content */}
    </ScrollView>
  );
}
```

## Notes

- These hooks require `react-native-safe-area-context` to be properly set up
- The tab bar height is set to 60px (matching your current configuration)
- All hooks are memoized for performance
- The hooks automatically handle screen orientation changes
- Safe area insets are dynamically calculated based on the device 