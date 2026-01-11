# Convex + Better Auth + TanStack Router Template

A modern full-stack template featuring **Convex** for the backend, **Better Auth** for authentication, and **TanStack Router** for client-side routing. Built with React, TypeScript, Tailwind CSS, and Shadcn/ui components.

## 🚀 Features

- **Authentication**: Secure authentication with Better Auth supporting Google OAuth
- **Backend**: Convex for real-time database and serverless functions
- **Routing**: File-based routing with TanStack Router
- **UI**: Beautiful components with Tailwind CSS and Shadcn/ui
- **Type Safety**: Full TypeScript support with T3 Env for environment variables
- **Development**: Hot reload, ESLint, Prettier, and Vitest for testing

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Router, Tailwind CSS
- **Backend**: Convex (database + serverless functions)
- **Auth**: Better Auth with Google OAuth
- **UI**: Shadcn/ui components, Radix UI primitives
- **Build**: Vite, ESLint, Prettier
- **Testing**: Vitest

## 🛠️ Quick Start

### 1. Clone and Install

```bash
# Clone the template
git clone <your-repo-url>
cd convex-better-auth-tstack-router-template

# Install dependencies
pnpm install
```

### 2. Set up Convex

```bash
# Initialize Convex (this will create your deployment)
npx convex init

# Start the Convex development server
npx convex dev
```

### 3. Configure Authentication

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - For production: Add your production URL

#### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex
VITE_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_deployment_name

# Auth
VITE_SITE_URL=http://localhost:3000
VITE_CONVEX_SITE_URL=your_convex_site_url

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Set the environment variables in Convex:

```bash
# Set site URL
npx convex env set SITE_URL http://localhost:3000

# Set Google OAuth credentials
npx convex env set GOOGLE_CLIENT_ID "your_google_client_id"
npx convex env set GOOGLE_CLIENT_SECRET "your_google_client_secret"
```

### 4. Start Development

```bash
# Start the development server
pnpm dev

# The app will be available at http://localhost:3000
```

## 🔐 Authentication

This template includes a complete authentication system:

### Features
- Google OAuth sign-in
- Session management
- Protected routes
- User profile display
- Secure logout

### Usage

The authentication is already set up and ready to use. Visit `/demo/auth` to see the authentication flow in action.

Key files:
- `src/lib/auth-client.ts` - Client-side auth configuration
- `convex/auth.ts` - Server-side auth setup
- `convex/auth.config.ts` - Auth configuration
- `src/features/auth/signin-modal.tsx` - Sign-in modal component
- `src/routes/demo/auth.tsx` - Demo authentication page

### Adding Authentication to New Routes

```tsx
import { authClient } from '@/lib/auth-client'

function ProtectedComponent() {
  const session = authClient.useSession()

  if (session.isPending) return <div>Loading...</div>
  if (!session.data) return <div>Please sign in</div>

  return <div>Welcome, {session.data.user.name}!</div>
}
```

## 📁 Project Structure

```
├── convex/                 # Backend functions and schema
│   ├── auth.config.ts     # Auth configuration
│   ├── auth.ts           # Auth setup
│   ├── schema.ts         # Database schema
│   └── todos.ts          # Example functions
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-specific components
│   │   └── auth/        # Authentication components
│   ├── integrations/     # Third-party integrations
│   │   └── convex/      # Convex client setup
│   ├── lib/             # Utilities and configurations
│   ├── routes/          # File-based routes
│   │   ├── __root.tsx   # Root layout
│   │   ├── index.tsx    # Home page
│   │   └── demo/        # Demo pages
│   └── env.ts           # Environment variables
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## 🎨 Styling

This template uses Tailwind CSS with Shadcn/ui components:

```bash
# Add new Shadcn components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
```

## 🚀 Deployment

### Deploy to Convex

```bash
# Deploy your Convex functions
npx convex deploy
```

### Build for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## 📚 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm test         # Run tests
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm check        # Format and lint
```

## 🔧 Development

### Adding New Routes

Create files in the `src/routes/` directory. TanStack Router will automatically generate the route tree.

### Adding Convex Functions

Add new functions in the `convex/` directory:

```typescript
// convex/myFunction.ts
import { query } from "./_generated/server";

export const myQuery = query({
  args: {},
  handler: async (ctx) => {
    // Your function logic here
    return "Hello World!";
  },
});
```

### Environment Variables

Use T3 Env for type-safe environment variables:

```typescript
// src/env.ts
export const env = createEnv({
  client: {
    VITE_API_KEY: z.string(),
  },
  // ...
});

// Usage
import { env } from "@/env";
console.log(env.VITE_API_KEY);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- [Convex Documentation](https://docs.convex.dev)
- [Better Auth Documentation](https://better-auth.com)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
