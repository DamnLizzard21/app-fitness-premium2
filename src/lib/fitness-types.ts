// Fitness App Types

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isPremium: boolean
  streak: number
  level: number
  totalWorkouts: number
  currentWeight: number
  targetWeight: number
  height: number
  age: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lose_weight' | 'maintain' | 'gain_weight' | 'build_muscle'
  createdAt: Date
  updatedAt: Date
}

export interface Exercise {
  id: string
  name: string
  category: 'strength' | 'cardio' | 'flexibility' | 'calisthenics'
  muscleGroups: string[]
  equipment: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructions: string[]
  tips: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface WorkoutExercise {
  id: string
  exerciseId: string
  exercise: Exercise
  sets: number
  reps: number
  weight?: number
  duration?: number
  restTime?: number
  completed: boolean
  rpe?: number // Rate of Perceived Exertion (1-10)
  notes?: string
  personalRecord?: boolean
}

export interface Workout {
  id: string
  name: string
  description?: string
  duration: number
  exercises: WorkoutExercise[]
  completed: boolean
  completedAt?: Date
  date: string
  type: 'strength' | 'cardio' | 'mixed' | 'calisthenics'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  calories?: number
}

export interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration: number // weeks
  workouts: Workout[]
  goal: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
}

export interface Food {
  id: string
  name: string
  brand?: string
  calories: number // per 100g
  protein: number // per 100g
  carbs: number // per 100g
  fat: number // per 100g
  fiber?: number // per 100g
  sugar?: number // per 100g
  sodium?: number // per 100g
  category: 'protein' | 'carbs' | 'fat' | 'vegetable' | 'fruit' | 'dairy' | 'other'
  barcode?: string
}

export interface MealFood {
  id: string
  foodId: string
  food: Food
  quantity: number // in grams
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  id: string
  name: string
  time: string
  foods: MealFood[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  completed: boolean
}

export interface NutritionPlan {
  id: string
  userId: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  meals: Meal[]
  date: string
  waterIntake?: number // in ml
  supplements?: string[]
}

export interface Recipe {
  id: string
  name: string
  description: string
  ingredients: RecipeIngredient[]
  instructions: string[]
  prepTime: number // minutes
  cookTime: number // minutes
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'
  tags: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  rating: number
  imageUrl?: string
}

export interface RecipeIngredient {
  id: string
  foodId: string
  food: Food
  quantity: number
  unit: string
}

export interface Challenge {
  id: string
  name: string
  description: string
  type: 'workout' | 'nutrition' | 'habit'
  duration: number // days
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises?: Exercise[]
  dailyGoal: string
  rewards: string[]
  participants: number
}

export interface UserChallenge {
  id: string
  userId: string
  challengeId: string
  challenge: Challenge
  startDate: Date
  currentDay: number
  completed: boolean
  completedDays: number[]
  progress: number // percentage
}

export interface ProgressPhoto {
  id: string
  userId: string
  imageUrl: string
  date: Date
  weight?: number
  bodyFat?: number
  muscleMass?: number
  notes?: string
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }
}

export interface BodyMetrics {
  id: string
  userId: string
  date: Date
  weight: number
  bodyFat?: number
  muscleMass?: number
  bmi: number
  bmiPrime: number
  bmr: number // Basal Metabolic Rate
  tdee: number // Total Daily Energy Expenditure
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
    neck?: number
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'workout' | 'nutrition' | 'streak' | 'challenge' | 'progress'
  requirement: {
    type: 'count' | 'streak' | 'weight' | 'time'
    value: number
    unit?: string
  }
  reward?: {
    type: 'badge' | 'points' | 'premium_days'
    value: number
  }
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  achievement: Achievement
  unlockedAt: Date
  progress: number // percentage
}

export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'premium' | 'premium_annual' | 'lifetime'
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: Date
  endDate?: Date
  autoRenew: boolean
  paymentMethod: string
  amount: number
  currency: string
}

export interface Payment {
  id: string
  userId: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: 'credit_card' | 'paypal' | 'stripe' | 'pix'
  transactionId: string
  date: Date
  description: string
}

// Utility Types
export type MacroNutrients = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export type ActivityLevel = {
  sedentary: 1.2
  light: 1.375
  moderate: 1.55
  active: 1.725
  very_active: 1.9
}

export type BMICategory = 
  | 'underweight' 
  | 'normal' 
  | 'overweight' 
  | 'obese_class_1' 
  | 'obese_class_2' 
  | 'obese_class_3'

// Calculation Functions Types
export interface NutritionCalculations {
  calculateBMI: (weight: number, height: number) => number
  calculateBMIPrime: (bmi: number) => number
  calculateBMR: (weight: number, height: number, age: number, gender: 'male' | 'female') => number
  calculateTDEE: (bmr: number, activityLevel: keyof ActivityLevel) => number
  calculateMacros: (calories: number, goal: User['goal']) => MacroNutrients
  getBMICategory: (bmi: number) => BMICategory
}

export interface WorkoutCalculations {
  calculateCaloriesBurned: (exercise: Exercise, duration: number, weight: number) => number
  calculateOneRepMax: (weight: number, reps: number) => number
  calculateTrainingVolume: (workout: Workout) => number
}