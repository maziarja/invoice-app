export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      clientAddress: {
        Row: {
          city: string | null
          country: string | null
          id: number
          postCode: string | null
          street: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          id?: number
          postCode?: string | null
          street?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: number
          postCode?: string | null
          street?: string | null
        }
        Relationships: []
      }
      invoice: {
        Row: {
          clientAddressId: number | null
          clientEmail: string | null
          clientName: string | null
          createdAt: string
          defaultId: string | null
          description: string | null
          id: string
          isDeleted: boolean
          paymentDue: string | null
          paymentTerms: number | null
          senderAddressId: number | null
          status: string | null
          total: number | null
          userId: string | null
        }
        Insert: {
          clientAddressId?: number | null
          clientEmail?: string | null
          clientName?: string | null
          createdAt?: string
          defaultId?: string | null
          description?: string | null
          id: string
          isDeleted?: boolean
          paymentDue?: string | null
          paymentTerms?: number | null
          senderAddressId?: number | null
          status?: string | null
          total?: number | null
          userId?: string | null
        }
        Update: {
          clientAddressId?: number | null
          clientEmail?: string | null
          clientName?: string | null
          createdAt?: string
          defaultId?: string | null
          description?: string | null
          id?: string
          isDeleted?: boolean
          paymentDue?: string | null
          paymentTerms?: number | null
          senderAddressId?: number | null
          status?: string | null
          total?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_clientAddressId_fkey"
            columns: ["clientAddressId"]
            isOneToOne: false
            referencedRelation: "clientAddress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_senderAddressId_fkey"
            columns: ["senderAddressId"]
            isOneToOne: false
            referencedRelation: "senderAddress"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          id: number
          invoiceId: string | null
          name: string | null
          price: number | null
          quantity: number | null
          total: number | null
          userId: string | null
        }
        Insert: {
          id?: number
          invoiceId?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          total?: number | null
          userId?: string | null
        }
        Update: {
          id?: number
          invoiceId?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          total?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_invoiceId_fkey"
            columns: ["invoiceId"]
            isOneToOne: false
            referencedRelation: "invoice"
            referencedColumns: ["id"]
          },
        ]
      }
      senderAddress: {
        Row: {
          city: string | null
          country: string | null
          id: number
          postCode: string | null
          street: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          id?: number
          postCode?: string | null
          street?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: number
          postCode?: string | null
          street?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
