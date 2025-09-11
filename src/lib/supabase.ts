import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Booking {
  id?: string
  event_date: string
  event_time: string
  event_type: string
  guest_count: number
  customer_name: string
  customer_email: string
  customer_phone: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  total_amount?: number
  payment_status?: 'pending' | 'paid' | 'failed'
  special_requests?: string
  created_at?: string
  updated_at?: string
}

export const bookingService = {
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async sendBookingEmail(bookingData: any) {
    const { data, error } = await supabase.functions.invoke('send-booking-email', {
      body: { bookingData }
    })

    if (error) throw error
    return data
  }
}