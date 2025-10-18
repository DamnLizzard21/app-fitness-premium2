import { User, MacroNutrients, BMICategory, ActivityLevel } from './fitness-types'

// BMI Calculations
export function calculateBMI(weight: number, height: number): number {
  const heightInM = height / 100
  return weight / (heightInM * heightInM)
}

export function calculateBMIPrime(bmi: number): number {
  return bmi / 25 // 25 is the upper limit of normal BMI
}

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  if (bmi < 35) return 'obese_class_1'
  if (bmi < 40) return 'obese_class_2'
  return 'obese_class_3'
}

export function getBMICategoryLabel(category: BMICategory): string {
  const labels = {
    underweight: 'Abaixo do peso',
    normal: 'Normal',
    overweight: 'Sobrepeso',
    obese_class_1: 'Obesidade Grau I',
    obese_class_2: 'Obesidade Grau II',
    obese_class_3: 'Obesidade Grau III'
  }
  return labels[category]
}

// BMR Calculation using Mifflin-St Jeor Equation
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
  }
}

// TDEE Calculation
const activityMultipliers: ActivityLevel = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
}

export function calculateTDEE(bmr: number, activityLevel: keyof ActivityLevel): number {
  return bmr * activityMultipliers[activityLevel]
}

// Macro Calculations based on goals
export function calculateMacros(calories: number, goal: User['goal']): MacroNutrients {
  let proteinRatio: number
  let fatRatio: number
  let carbRatio: number

  switch (goal) {
    case 'lose_weight':
      proteinRatio = 0.35 // 35% protein for muscle preservation
      fatRatio = 0.25 // 25% fat
      carbRatio = 0.40 // 40% carbs
      break
    case 'build_muscle':
      proteinRatio = 0.30 // 30% protein for muscle building
      fatRatio = 0.25 // 25% fat
      carbRatio = 0.45 // 45% carbs for energy
      break
    case 'gain_weight':
      proteinRatio = 0.25 // 25% protein
      fatRatio = 0.30 // 30% fat for calorie density
      carbRatio = 0.45 // 45% carbs
      break
    case 'maintain':
    default:
      proteinRatio = 0.25 // 25% protein
      fatRatio = 0.25 // 25% fat
      carbRatio = 0.50 // 50% carbs
      break
  }

  const protein = Math.round((calories * proteinRatio) / 4) // 4 calories per gram
  const fat = Math.round((calories * fatRatio) / 9) // 9 calories per gram
  const carbs = Math.round((calories * carbRatio) / 4) // 4 calories per gram

  return {
    calories,
    protein,
    carbs,
    fat
  }
}

// Calorie adjustment based on goal
export function adjustCaloriesForGoal(tdee: number, goal: User['goal']): number {
  switch (goal) {
    case 'lose_weight':
      return Math.round(tdee * 0.8) // 20% deficit
    case 'gain_weight':
      return Math.round(tdee * 1.15) // 15% surplus
    case 'build_muscle':
      return Math.round(tdee * 1.1) // 10% surplus
    case 'maintain':
    default:
      return Math.round(tdee)
  }
}

// Water intake calculation (ml per day)
export function calculateWaterIntake(weight: number, activityLevel: keyof ActivityLevel): number {
  const baseWater = weight * 35 // 35ml per kg
  const activityBonus = activityLevel === 'active' || activityLevel === 'very_active' ? 500 : 0
  return Math.round(baseWater + activityBonus)
}

// Protein per kg calculation
export function calculateProteinPerKg(weight: number, goal: User['goal'], activityLevel: keyof ActivityLevel): number {
  let proteinPerKg: number

  if (activityLevel === 'active' || activityLevel === 'very_active') {
    switch (goal) {
      case 'build_muscle':
        proteinPerKg = 2.2 // 2.2g per kg for muscle building
        break
      case 'lose_weight':
        proteinPerKg = 2.0 // 2.0g per kg to preserve muscle
        break
      default:
        proteinPerKg = 1.6 // 1.6g per kg for active individuals
        break
    }
  } else {
    switch (goal) {
      case 'build_muscle':
        proteinPerKg = 1.8
        break
      case 'lose_weight':
        proteinPerKg = 1.6
        break
      default:
        proteinPerKg = 1.2 // RDA minimum
        break
    }
  }

  return Math.round(weight * proteinPerKg)
}

// Body Fat Percentage estimation (rough estimation, not medical)
export function estimateBodyFatFromBMI(bmi: number, age: number, gender: 'male' | 'female'): number {
  // This is a rough estimation and should not be used for medical purposes
  let bodyFat: number

  if (gender === 'male') {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2
  } else {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4
  }

  // Clamp between reasonable values
  return Math.max(5, Math.min(50, Math.round(bodyFat)))
}

// Ideal weight range calculation
export function calculateIdealWeightRange(height: number): { min: number; max: number } {
  const heightInM = height / 100
  const minBMI = 18.5
  const maxBMI = 24.9

  return {
    min: Math.round(minBMI * heightInM * heightInM),
    max: Math.round(maxBMI * heightInM * heightInM)
  }
}

// Workout-related calculations
export function calculateOneRepMax(weight: number, reps: number): number {
  // Epley formula
  return Math.round(weight * (1 + reps / 30))
}

export function calculateTrainingVolume(sets: number, reps: number, weight: number): number {
  return sets * reps * weight
}

// Calories burned estimation (very rough, for display purposes only)
export function estimateCaloriesBurned(
  exerciseType: 'strength' | 'cardio' | 'calisthenics',
  duration: number, // minutes
  weight: number, // kg
  intensity: 'low' | 'moderate' | 'high' = 'moderate'
): number {
  let metValue: number

  switch (exerciseType) {
    case 'strength':
      metValue = intensity === 'high' ? 6 : intensity === 'moderate' ? 5 : 3
      break
    case 'cardio':
      metValue = intensity === 'high' ? 10 : intensity === 'moderate' ? 7 : 5
      break
    case 'calisthenics':
      metValue = intensity === 'high' ? 8 : intensity === 'moderate' ? 6 : 4
      break
    default:
      metValue = 5
  }

  // MET formula: calories = MET × weight(kg) × time(hours)
  return Math.round(metValue * weight * (duration / 60))
}

// Progress tracking
export function calculateProgressPercentage(current: number, start: number, target: number): number {
  if (start === target) return 100
  
  const totalChange = target - start
  const currentChange = current - start
  
  return Math.max(0, Math.min(100, Math.round((currentChange / totalChange) * 100)))
}

// Streak calculations
export function calculateStreakBonus(streak: number): number {
  if (streak >= 30) return 1.5 // 50% bonus for 30+ days
  if (streak >= 14) return 1.3 // 30% bonus for 14+ days
  if (streak >= 7) return 1.2 // 20% bonus for 7+ days
  return 1.0 // No bonus
}

// Level system
export function calculateLevel(totalWorkouts: number): number {
  return Math.floor(totalWorkouts / 10) + 1 // Level up every 10 workouts
}

export function calculateXPForNextLevel(currentLevel: number): number {
  return currentLevel * 10 // Need 10 more workouts for next level
}

// Nutrition score (0-100)
export function calculateNutritionScore(
  actualCalories: number,
  targetCalories: number,
  actualProtein: number,
  targetProtein: number,
  actualCarbs: number,
  targetCarbs: number,
  actualFat: number,
  targetFat: number
): number {
  const calorieScore = Math.max(0, 100 - Math.abs(actualCalories - targetCalories) / targetCalories * 100)
  const proteinScore = Math.max(0, 100 - Math.abs(actualProtein - targetProtein) / targetProtein * 100)
  const carbScore = Math.max(0, 100 - Math.abs(actualCarbs - targetCarbs) / targetCarbs * 100)
  const fatScore = Math.max(0, 100 - Math.abs(actualFat - targetFat) / targetFat * 100)

  return Math.round((calorieScore + proteinScore + carbScore + fatScore) / 4)
}