export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          description: string | null
          id: number
          latitude: number | null
          location_name: string | null
          longitude: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          name?: string | null
        }
        Relationships: []
      }
      occurrences: {
        Row: {
          created_at: string
          event_id: number
          id: number
          recurrence_series_id: number | null
          start_time: string | null
          starts_on: string | null
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          recurrence_series_id?: number | null
          start_time?: string | null
          starts_on?: string | null
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          recurrence_series_id?: number | null
          start_time?: string | null
          starts_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ocurrences_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ocurrences_recurrence_series_id_fkey"
            columns: ["recurrence_series_id"]
            isOneToOne: false
            referencedRelation: "recurrence_series"
            referencedColumns: ["id"]
          },
        ]
      }
      participations: {
        Row: {
          created_at: string
          id: number
          occurrence_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          occurrence_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          occurrence_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_participations_ocurrence_id_fkey"
            columns: ["occurrence_id"]
            isOneToOne: false
            referencedRelation: "occurrences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_participations_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recurrence_series: {
        Row: {
          by_day: string | null
          by_month: string | null
          count: number | null
          created_at: string
          description: string | null
          ends_on: string | null
          event_id: number
          frequency: string | null
          id: number
          interval: number | null
          name: string
          starts_on: string | null
        }
        Insert: {
          by_day?: string | null
          by_month?: string | null
          count?: number | null
          created_at?: string
          description?: string | null
          ends_on?: string | null
          event_id: number
          frequency?: string | null
          id?: number
          interval?: number | null
          name: string
          starts_on?: string | null
        }
        Update: {
          by_day?: string | null
          by_month?: string | null
          count?: number | null
          created_at?: string
          description?: string | null
          ends_on?: string | null
          event_id?: number
          frequency?: string | null
          id?: number
          interval?: number | null
          name?: string
          starts_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_recurrence_series_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
