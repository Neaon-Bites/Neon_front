export type User = {
  id: number
  username: string
  email: string
  role: "admin" | "editor" | "viewer"
  isPremium: boolean
}
