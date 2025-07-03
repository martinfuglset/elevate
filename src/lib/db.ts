// Optional Supabase database connection
// The app will work without Supabase until you configure it

let supabase: any = null
let supabaseAdmin: any = null

// Factory function to create Supabase client only when needed
async function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  try {
    // Use eval to avoid TypeScript module resolution warnings
    const supabaseModule = await eval('import("@supabase/supabase-js")')
    return supabaseModule.createClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.log('Supabase not available - using mock data')
    return null
  }
}

// Factory function to create Supabase admin client
async function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }

  try {
    const supabaseModule = await eval('import("@supabase/supabase-js")')
    return supabaseModule.createClient(supabaseUrl, serviceRoleKey)
  } catch (error) {
    return null
  }
}

// Getter functions that initialize clients on demand
export async function getSupabase() {
  if (!supabase) {
    supabase = await createSupabaseClient()
  }
  return supabase
}

export async function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    supabaseAdmin = await createSupabaseAdminClient()
  }
  return supabaseAdmin
}

// Option 2: Prisma (PostgreSQL/MySQL)
// import { PrismaClient } from '@prisma/client'
// 
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }
// 
// export const prisma = globalForPrisma.prisma ?? new PrismaClient()
// 
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Option 3: MongoDB
// import { MongoClient } from 'mongodb'
// 
// const uri = process.env.MONGODB_URI!
// const options = {}
// 
// let client
// let clientPromise: Promise<MongoClient>
// 
// if (process.env.NODE_ENV === 'development') {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>
//   }
// 
//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     globalWithMongo._mongoClientPromise = client.connect()
//   }
//   clientPromise = globalWithMongo._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }
// 
// export default clientPromise

// Option 4: Firebase Firestore
// import { initializeApp, getApps } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// 
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// }
// 
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
// export const db = getFirestore(app)

// Placeholder for now - replace with your chosen database implementation
export const db = {
  // Add your database methods here
  query: async () => {
    throw new Error('Database not configured - choose an implementation above')
  }
} 