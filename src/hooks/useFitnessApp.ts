"use client"

import { useState, useEffect, useCallback } from 'react'
import { User, Workout, NutritionPlan, UserChallenge, BodyMetrics } from '@/lib/fitness-types'
import { 
  calculateBMI, 
  calculateBMIPrime, 
  calculateBMR, 
  calculateTDEE, 
  calculateMacros,
  adjustCaloriesForGoal,
  calculateLevel
} from '@/lib/fitness-calculations'

interface FitnessState {
  user: User | null
  workouts: Workout[]
  nutritionPlan: NutritionPlan | null
  currentChallenge: UserChallenge | null
  bodyMetrics: BodyMetrics[]
  isLoading: boolean
  error: string | null
}

export function useFitnessApp() {
  const [state, setState] = useState<FitnessState>({
    user: null,
    workouts: [],
    nutritionPlan: null,
    currentChallenge: null,
    bodyMetrics: [],
    isLoading: true,
    error: null
  })

  // Initialize with mock data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockUser: User = {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@email.com',
          avatar: '/api/placeholder/150/150',
          isPremium: true,
          streak: 12,
          level: 8,
          totalWorkouts: 156,
          currentWeight: 65,
          targetWeight: 60,
          height: 165,
          age: 28,
          gender: 'female',
          activityLevel: 'moderate',
          goal: 'lose_weight',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date()
        }

        // Calculate nutrition plan
        const bmr = calculateBMR(mockUser.currentWeight, mockUser.height, mockUser.age, mockUser.gender)
        const tdee = calculateTDEE(bmr, mockUser.activityLevel)
        const targetCalories = adjustCaloriesForGoal(tdee, mockUser.goal)
        const macros = calculateMacros(targetCalories, mockUser.goal)

        const mockNutritionPlan: NutritionPlan = {
          id: '1',
          userId: mockUser.id,
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          meals: [],
          date: new Date().toISOString().split('T')[0],
          waterIntake: 2500
        }

        const mockBodyMetrics: BodyMetrics = {
          id: '1',
          userId: mockUser.id,
          date: new Date(),
          weight: mockUser.currentWeight,
          bmi: calculateBMI(mockUser.currentWeight, mockUser.height),
          bmiPrime: calculateBMIPrime(calculateBMI(mockUser.currentWeight, mockUser.height)),
          bmr,
          tdee,
          measurements: {
            chest: 90,
            waist: 70,
            hips: 95,
            arms: 28,
            thighs: 55
          }
        }

        setState(prev => ({
          ...prev,
          user: mockUser,
          nutritionPlan: mockNutritionPlan,
          bodyMetrics: [mockBodyMetrics],
          isLoading: false
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Erro ao carregar dados do usuário',
          isLoading: false
        }))
      }
    }

    initializeApp()
  }, [])

  // Update user profile
  const updateUser = useCallback((updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates, updatedAt: new Date() } : null
    }))
  }, [])

  // Update body metrics
  const updateBodyMetrics = useCallback((weight: number, measurements?: any) => {
    if (!state.user) return

    const newMetrics: BodyMetrics = {
      id: Date.now().toString(),
      userId: state.user.id,
      date: new Date(),
      weight,
      bmi: calculateBMI(weight, state.user.height),
      bmiPrime: calculateBMIPrime(calculateBMI(weight, state.user.height)),
      bmr: calculateBMR(weight, state.user.height, state.user.age, state.user.gender),
      tdee: calculateTDEE(
        calculateBMR(weight, state.user.height, state.user.age, state.user.gender),
        state.user.activityLevel
      ),
      measurements
    }

    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, currentWeight: weight } : null,
      bodyMetrics: [newMetrics, ...prev.bodyMetrics]
    }))
  }, [state.user])

  // Complete workout
  const completeWorkout = useCallback((workoutId: string) => {
    setState(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout =>
        workout.id === workoutId
          ? { ...workout, completed: true, completedAt: new Date() }
          : workout
      ),
      user: prev.user ? {
        ...prev.user,
        totalWorkouts: prev.user.totalWorkouts + 1,
        level: calculateLevel(prev.user.totalWorkouts + 1),
        streak: prev.user.streak + 1
      } : null
    }))
  }, [])

  // Update nutrition plan
  const updateNutritionPlan = useCallback((updates: Partial<NutritionPlan>) => {
    setState(prev => ({
      ...prev,
      nutritionPlan: prev.nutritionPlan ? { ...prev.nutritionPlan, ...updates } : null
    }))
  }, [])

  // Add workout
  const addWorkout = useCallback((workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString()
    }

    setState(prev => ({
      ...prev,
      workouts: [newWorkout, ...prev.workouts]
    }))
  }, [])

  // Update challenge progress
  const updateChallengeProgress = useCallback((day: number) => {
    setState(prev => ({
      ...prev,
      currentChallenge: prev.currentChallenge ? {
        ...prev.currentChallenge,
        currentDay: day,
        progress: (day / prev.currentChallenge.challenge.duration) * 100,
        completedDays: [...prev.currentChallenge.completedDays, day]
      } : null
    }))
  }, [])

  // Calculate daily nutrition summary
  const getDailyNutritionSummary = useCallback(() => {
    if (!state.nutritionPlan) return null

    const totalCalories = state.nutritionPlan.meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
    const totalProtein = state.nutritionPlan.meals.reduce((sum, meal) => sum + meal.totalProtein, 0)
    const totalCarbs = state.nutritionPlan.meals.reduce((sum, meal) => sum + meal.totalCarbs, 0)
    const totalFat = state.nutritionPlan.meals.reduce((sum, meal) => sum + meal.totalFat, 0)

    return {
      consumed: { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fat: totalFat },
      target: {
        calories: state.nutritionPlan.calories,
        protein: state.nutritionPlan.protein,
        carbs: state.nutritionPlan.carbs,
        fat: state.nutritionPlan.fat
      },
      remaining: {
        calories: state.nutritionPlan.calories - totalCalories,
        protein: state.nutritionPlan.protein - totalProtein,
        carbs: state.nutritionPlan.carbs - totalCarbs,
        fat: state.nutritionPlan.fat - totalFat
      }
    }
  }, [state.nutritionPlan])

  // Get workout statistics
  const getWorkoutStats = useCallback(() => {
    const completedWorkouts = state.workouts.filter(w => w.completed)
    const totalWorkouts = state.workouts.length
    const completionRate = totalWorkouts > 0 ? (completedWorkouts.length / totalWorkouts) * 100 : 0
    
    const thisWeekWorkouts = completedWorkouts.filter(w => {
      const workoutDate = new Date(w.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return workoutDate >= weekAgo
    }).length

    const totalMinutes = completedWorkouts.reduce((sum, w) => sum + w.duration, 0)

    return {
      total: completedWorkouts.length,
      thisWeek: thisWeekWorkouts,
      completionRate: Math.round(completionRate),
      totalMinutes,
      averageDuration: completedWorkouts.length > 0 ? Math.round(totalMinutes / completedWorkouts.length) : 0
    }
  }, [state.workouts])

  // Get progress data for charts
  const getProgressData = useCallback(() => {
    const weightData = state.bodyMetrics
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(metric => ({
        date: metric.date.toISOString().split('T')[0],
        weight: metric.weight,
        bmi: metric.bmi
      }))

    return {
      weight: weightData,
      workouts: state.workouts.filter(w => w.completed).length,
      streak: state.user?.streak || 0
    }
  }, [state.bodyMetrics, state.workouts, state.user])

  return {
    // State
    ...state,
    
    // Actions
    updateUser,
    updateBodyMetrics,
    completeWorkout,
    updateNutritionPlan,
    addWorkout,
    updateChallengeProgress,
    
    // Computed values
    dailyNutrition: getDailyNutritionSummary(),
    workoutStats: getWorkoutStats(),
    progressData: getProgressData(),
    
    // Helper functions
    calculateUserBMI: () => state.user ? calculateBMI(state.user.currentWeight, state.user.height) : 0,
    calculateUserTDEE: () => state.user ? calculateTDEE(
      calculateBMR(state.user.currentWeight, state.user.height, state.user.age, state.user.gender),
      state.user.activityLevel
    ) : 0
  }
}