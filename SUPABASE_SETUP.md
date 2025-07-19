# Supabase Setup Guide

This guide will help you set up Supabase for your Makan Apa? React Native app.

## 🚀 Quick Start

### 1. Install Dependencies
All required dependencies have been installed:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@react-native-async-storage/async-storage` - For session persistence
- `react-native-url-polyfill` - URL polyfill for React Native

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `makan-apa-app`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 3. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env` file in your project root:

```bash
# Copy env.example to .env and fill in your values
cp env.example .env
```

4. Update `.env` with your actual values:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Database Migrations

```bash
# Start Supabase locally (optional for development)
npx supabase start

# Apply the database schema
npx supabase db push
```

Or apply the schema directly in your Supabase dashboard:
1. Go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL

## 📁 Project Structure

```
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── hooks/
│   └── useSupabaseAuth.ts   # Authentication hook
├── supabase/
│   ├── config.toml          # Supabase CLI configuration
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
└── env.example              # Environment variables template
```

## 🔧 Configuration Files

### Supabase Client (`lib/supabase.ts`)
- Configured for React Native
- Includes helper functions for common operations
- Handles authentication, database, and storage operations

### Authentication Hook (`hooks/useSupabaseAuth.ts`)
- Provides easy-to-use auth functions
- Handles user state management
- Includes sign up, sign in, sign out, and password reset

## 🗄️ Database Schema

The schema includes the following tables:

### `profiles`
- Extends Supabase auth.users
- Stores user profile information
- Automatically created on user signup

### `restaurants`
- Restaurant information
- Location data (latitude/longitude)
- Ratings and reviews count
- Cuisine types and price ranges

### `reviews`
- User reviews for restaurants
- Rating (1-5 stars) and comments
- Images support
- Automatic rating updates

### `favorites`
- User's favorite restaurants
- Many-to-many relationship

### `search_history`
- Track user search queries
- Location-based searches

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Profiles**: Users can only access their own profile
- **Restaurants**: Public read, authenticated create
- **Reviews**: Public read, authenticated create/update/delete own reviews
- **Favorites**: Users can only access their own favorites
- **Search History**: Users can only access their own search history

## 🚀 Usage Examples

### Authentication

```typescript
import { useSupabaseAuth } from '@/hooks';

function LoginScreen() {
  const { signIn, loading, user } = useSupabaseAuth();

  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password');
    if (error) {
      console.error('Login error:', error);
    }
  };

  return (
    // Your login UI
  );
}
```

### Database Operations

```typescript
import { supabaseHelpers } from '@/lib/supabase';

// Get restaurants
const { data: restaurants, error } = await supabaseHelpers.db.query('restaurants');

// Add a review
const { data, error } = await supabaseHelpers.db.insert('reviews', {
  restaurant_id: 'restaurant-uuid',
  rating: 5,
  comment: 'Great food!'
});

// Get user favorites
const { data: favorites, error } = await supabaseHelpers.db.query('favorites', {
  user_id: user.id
});
```

### File Storage

```typescript
import { supabaseHelpers } from '@/lib/supabase';

// Upload image
const { data, error } = await supabaseHelpers.storage.uploadFile(
  'restaurant-images',
  'restaurant-1.jpg',
  imageFile
);

// Get public URL
const publicUrl = supabaseHelpers.storage.getPublicUrl(
  'restaurant-images',
  'restaurant-1.jpg'
);
```

## 🔧 Development Commands

```bash
# Start Supabase locally
npx supabase start

# Stop Supabase locally
npx supabase stop

# Reset local database
npx supabase db reset

# Generate types from database
npx supabase gen types typescript --local > types/supabase.ts

# Apply migrations
npx supabase db push

# Create new migration
npx supabase migration new migration_name
```

## 📱 React Native Specific Setup

### Deep Linking
For password reset and email confirmation, add to your `app.json`:

```json
{
  "expo": {
    "scheme": "makan-apa-app",
    "ios": {
      "bundleIdentifier": "com.yourcompany.makanapaapp"
    },
    "android": {
      "package": "com.yourcompany.makanapaapp"
    }
  }
}
```

### Environment Variables
Expo requires environment variables to be prefixed with `EXPO_PUBLIC_` for client-side access.

## 🧪 Testing

### Local Development
1. Start Supabase locally: `npx supabase start`
2. Use the local credentials provided
3. Test your app with local database

### Production
1. Use your Supabase project credentials
2. Test with real data
3. Monitor usage in Supabase dashboard

## 🔍 Monitoring

- **Supabase Dashboard**: Monitor database usage, auth, and storage
- **Logs**: View real-time logs in the dashboard
- **Analytics**: Track API usage and performance

## 🚨 Common Issues

### 1. Environment Variables Not Loading
- Ensure variables are prefixed with `EXPO_PUBLIC_`
- Restart your development server after adding `.env`

### 2. Authentication Issues
- Check that your Supabase URL and key are correct
- Ensure email confirmation is configured properly
- Verify RLS policies are set up correctly

### 3. Database Connection Issues
- Check your internet connection
- Verify your Supabase project is active
- Ensure your API keys have the correct permissions

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Database Guide](https://supabase.com/docs/guides/database)

## 🎯 Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run the database migrations
4. Test authentication flow
5. Integrate with your existing components
6. Add real restaurant data
7. Implement search and filtering
8. Add image upload functionality

Your Supabase setup is now ready! 🚀 