#!/bin/bash

echo "🚀 Migration Vite → React TypeScript STRICT"

# 1. Install deps
npm install -D typescript @types/react @types/react-dom

# 2. Override tsconfig with strict config (NO jq)
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],

    "jsx": "react-jsx",

    "moduleResolution": "Node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },

  "include": ["src"]
}
EOF

# 3. Rename files
find src -name "*.jsx" -exec bash -c 'mv "$1" "${1%.jsx}.tsx"' _ {} \;
find src -name "*.js" -exec bash -c 'mv "$1" "${1%.js}.ts"' _ {} \;

# 4. Fix main entrypoint
cat <<EOF > src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOF

# 5. Create CMS architecture
mkdir -p src/{api,types,components,features,pages,hooks,layouts}

# 6. Example type file
cat <<EOF > src/types/User.ts
export type User = {
  id: number
  username: string
  email: string
  role: "admin" | "editor" | "viewer"
  isPremium: boolean
}
EOF

echo "✅ TypeScript STRICT migration done!"

