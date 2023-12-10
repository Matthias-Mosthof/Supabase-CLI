export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          age: string
          created_at: string
          email: string
          gender: string
          id: number
          name: string
          rejected: boolean
          released: boolean
          text: string
          title: string
        }
        Insert: {
          age: string
          created_at?: string
          email: string
          gender: string
          id?: number
          name: string
          rejected?: boolean
          released?: boolean
          text: string
          title?: string
        }
        Update: {
          age?: string
          created_at?: string
          email?: string
          gender?: string
          id?: number
          name?: string
          rejected?: boolean
          released?: boolean
          text?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

