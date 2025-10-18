"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Home, 
  Dumbbell, 
  Target, 
  UtensilsCrossed, 
  TrendingUp, 
  User, 
  CreditCard,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Trophy,
  Flame,
  Activity,
  Apple,
  Clock,
  CheckCircle2,
  Plus,
  Star,
  Zap,
  Heart,
  BarChart3,
  Camera,
  Calculator,
  ShoppingCart,
  Crown,
  Globe,
  ArrowRight,
  Check,
  X,
  PlayCircle,
  Lock,
  Unlock,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Gift,
  Shield,
  Headphones,
  BookOpen,
  Video,
  Users,
  MessageCircle,
  FileText,
  Download,
  Smartphone,
  ArrowLeft,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  LogOut,
  Edit,
  Save,
  Menu,
  ChevronDown,
  Moon,
  Sun,
  Timer,
  Weight,
  Utensils,
  ChefHat,
  ListChecks,
  Repeat,
  TrendingDown,
  Percent,
  Scale,
  Ruler,
  Upload,
  Minus,
  MoreHorizontal,
  Filter,
  Search,
  Bell,
  Share2,
  Copy,
  RefreshCw,
  PieChart,
  LineChart,
  BarChart,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Trash2,
  Archive,
  UserCheck,
  DollarSign,
  Package,
  Truck,
  CreditCard as CreditCardIcon,
  Receipt,
  History,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  TreePine,
  Building
} from 'lucide-react'

interface User {
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
  createdAt: string
  phone?: string
  bio?: string
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lose_weight' | 'gain_weight' | 'maintain' | 'build_muscle'
  bodyFat?: number
  muscleMass?: number
  bmi?: number
  bmiPrime?: number
  tdee?: number
  bmr?: number
  macros?: {
    protein: number
    carbs: number
    fat: number
    calories: number
  }
  emailVerified?: boolean
  lastLogin?: string
  loginAttempts?: number
  accountLocked?: boolean
  lockUntil?: string
  workoutLocation?: 'outdoor' | 'home' | 'gym'
  medicalHistory?: {
    hasConditions: boolean
    conditions: string[]
    medications: string[]
    allergies: string[]
    injuries: string[]
    doctorApproval: boolean
    lastCheckup?: string
  }
}

interface Exercise {
  id: string
  name: string
  category: string
  muscle: string
  equipment: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructions: string[]
  sets?: number
  reps?: number
  weight?: number
  duration?: number
  rest?: number
  completed?: boolean
  rpe?: number
  notes?: string
  location: 'outdoor' | 'home' | 'gym' | 'any'
  actualWeight?: number
  actualReps?: number
  actualSets?: number
}

interface Workout {
  id: string
  name: string
  category: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: Exercise[]
  completed?: boolean
  date?: string
  totalVolume?: number
  location: 'outdoor' | 'home' | 'gym'
}

interface WeeklyWorkoutPlan {
  [key: string]: {
    name: string
    exercises: Exercise[]
    focus: string[]
  }
}

interface Recipe {
  id: string
  name: string
  category: string
  prepTime: number
  cookTime: number
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[]
  instructions: string[]
  image?: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

interface Challenge {
  id: string
  name: string
  description: string
  duration: number
  currentDay: number
  exercises: Exercise[]
  completed: boolean
  progress: number
}

interface PricingPlan {
  id: string
  name: string
  duration: string
  price: number
  originalPrice?: number
  discount?: string
  popular?: boolean
  features: string[]
}

interface ValidationError {
  field: string
  message: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Mensal',
    duration: 'mês',
    price: 49.90,
    features: [
      'Acesso completo à biblioteca de exercícios',
      'Dieta personalizada com IA',
      'Produto de emagrecimento',
      'Suporte 24/7',
      'Comunidade VIP',
      'Análises avançadas'
    ]
  },
  {
    id: 'quarterly',
    name: 'Trimestral',
    duration: 'mês',
    price: 39.90,
    originalPrice: 49.90,
    discount: '20% OFF',
    popular: true,
    features: [
      'Todos os recursos do plano mensal',
      'Desconto de 20%',
      'Plano nutricional estendido',
      'Acompanhamento personalizado',
      'Relatórios trimestrais',
      'Prioridade no suporte'
    ]
  },
  {
    id: 'semiannual',
    name: 'Semestral',
    duration: 'mês',
    price: 34.90,
    originalPrice: 49.90,
    discount: '30% OFF',
    features: [
      'Todos os recursos anteriores',
      'Desconto de 30%',
      'Consulta com nutricionista',
      'Plano de treino semestral',
      'Análise corporal avançada',
      'Acesso antecipado a novidades'
    ]
  },
  {
    id: 'annual',
    name: 'Anual',
    duration: 'mês',
    price: 29.90,
    originalPrice: 49.90,
    discount: '40% OFF',
    features: [
      'Todos os recursos anteriores',
      'Desconto de 40%',
      'Personal trainer dedicado',
      'Acompanhamento médico',
      'Kit de suplementos grátis',
      'Garantia estendida de 60 dias'
    ]
  }
]

// Plano de treino semanal para academia
const weeklyGymPlan: WeeklyWorkoutPlan = {
  'Segunda': {
    name: 'Peito e Tríceps',
    focus: ['Peitoral', 'Tríceps'],
    exercises: [
      {
        id: 'chest1',
        name: 'Supino Reto',
        category: 'Peito',
        muscle: 'Peitoral',
        equipment: 'Barra',
        difficulty: 'intermediate',
        instructions: ['Deite no banco', 'Segure a barra com pegada média', 'Desça controladamente até o peito', 'Empurre explosivamente para cima'],
        sets: 4,
        reps: 10,
        weight: 80,
        rest: 120,
        location: 'gym'
      },
      {
        id: 'chest2',
        name: 'Supino Inclinado com Halteres',
        category: 'Peito',
        muscle: 'Peitoral Superior',
        equipment: 'Halteres',
        difficulty: 'intermediate',
        instructions: ['Ajuste o banco em 30-45°', 'Segure os halteres', 'Desça controladamente', 'Empurre para cima contraindo o peito'],
        sets: 3,
        reps: 12,
        weight: 30,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'chest3',
        name: 'Crucifixo Inclinado',
        category: 'Peito',
        muscle: 'Peitoral',
        equipment: 'Halteres',
        difficulty: 'intermediate',
        instructions: ['Banco inclinado 30°', 'Braços ligeiramente flexionados', 'Abra os braços em arco', 'Contraia o peito no movimento'],
        sets: 3,
        reps: 12,
        weight: 20,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'triceps1',
        name: 'Tríceps Testa',
        category: 'Tríceps',
        muscle: 'Tríceps',
        equipment: 'Barra W',
        difficulty: 'intermediate',
        instructions: ['Deite no banco', 'Segure a barra W', 'Flexione apenas os cotovelos', 'Estenda os braços controladamente'],
        sets: 4,
        reps: 12,
        weight: 40,
        rest: 90,
        location: 'gym'
      }
    ]
  },
  'Terça': {
    name: 'Costas e Bíceps',
    focus: ['Dorsais', 'Bíceps'],
    exercises: [
      {
        id: 'back1',
        name: 'Puxada Frontal',
        category: 'Costas',
        muscle: 'Latíssimo do Dorso',
        equipment: 'Polia Alta',
        difficulty: 'intermediate',
        instructions: ['Sente-se no equipamento', 'Pegada pronada na barra', 'Puxe até o peito', 'Controle a subida'],
        sets: 4,
        reps: 10,
        weight: 60,
        rest: 120,
        location: 'gym'
      },
      {
        id: 'back2',
        name: 'Remada Curvada',
        category: 'Costas',
        muscle: 'Romboides e Trapézio',
        equipment: 'Barra',
        difficulty: 'intermediate',
        instructions: ['Pés na largura dos ombros', 'Incline o tronco 45°', 'Puxe a barra até o abdômen', 'Contraia as escápulas'],
        sets: 4,
        reps: 10,
        weight: 70,
        rest: 120,
        location: 'gym'
      },
      {
        id: 'back3',
        name: 'Remada Sentado',
        category: 'Costas',
        muscle: 'Dorsais',
        equipment: 'Polia Baixa',
        difficulty: 'intermediate',
        instructions: ['Sente-se no equipamento', 'Puxe o cabo até o abdômen', 'Mantenha o tronco ereto', 'Contraia as costas'],
        sets: 3,
        reps: 12,
        weight: 50,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'biceps1',
        name: 'Rosca Direta',
        category: 'Bíceps',
        muscle: 'Bíceps',
        equipment: 'Barra',
        difficulty: 'beginner',
        instructions: ['Pés na largura dos ombros', 'Segure a barra com pegada supinada', 'Flexione os cotovelos', 'Contraia o bíceps'],
        sets: 4,
        reps: 12,
        weight: 30,
        rest: 90,
        location: 'gym'
      }
    ]
  },
  'Quarta': {
    name: 'Pernas',
    focus: ['Quadríceps', 'Glúteos', 'Posterior'],
    exercises: [
      {
        id: 'legs1',
        name: 'Agachamento Livre',
        category: 'Pernas',
        muscle: 'Quadríceps e Glúteos',
        equipment: 'Barra',
        difficulty: 'intermediate',
        instructions: ['Barra nas costas', 'Pés na largura dos ombros', 'Desça até 90°', 'Suba contraindo glúteos'],
        sets: 4,
        reps: 10,
        weight: 100,
        rest: 180,
        location: 'gym'
      },
      {
        id: 'legs2',
        name: 'Leg Press 45°',
        category: 'Pernas',
        muscle: 'Quadríceps',
        equipment: 'Leg Press',
        difficulty: 'beginner',
        instructions: ['Posicione os pés na plataforma', 'Desça controladamente', 'Empurre com força', 'Não trave os joelhos'],
        sets: 4,
        reps: 12,
        weight: 200,
        rest: 120,
        location: 'gym'
      },
      {
        id: 'legs3',
        name: 'Mesa Flexora',
        category: 'Pernas',
        muscle: 'Posterior da Coxa',
        equipment: 'Mesa Flexora',
        difficulty: 'beginner',
        instructions: ['Deite na mesa', 'Posicione as pernas', 'Flexione controladamente', 'Contraia o posterior'],
        sets: 3,
        reps: 12,
        weight: 40,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'legs4',
        name: 'Panturrilha em Pé',
        category: 'Pernas',
        muscle: 'Panturrilha',
        equipment: 'Máquina',
        difficulty: 'beginner',
        instructions: ['Posicione-se na máquina', 'Suba na ponta dos pés', 'Contraia a panturrilha', 'Desça controladamente'],
        sets: 4,
        reps: 15,
        weight: 80,
        rest: 60,
        location: 'gym'
      }
    ]
  },
  'Quinta': {
    name: 'Ombros e Trapézio',
    focus: ['Deltoides', 'Trapézio'],
    exercises: [
      {
        id: 'shoulders1',
        name: 'Desenvolvimento com Barra',
        category: 'Ombros',
        muscle: 'Deltoides',
        equipment: 'Barra',
        difficulty: 'intermediate',
        instructions: ['Sentado ou em pé', 'Barra na altura dos ombros', 'Empurre para cima', 'Desça controladamente'],
        sets: 4,
        reps: 10,
        weight: 50,
        rest: 120,
        location: 'gym'
      },
      {
        id: 'shoulders2',
        name: 'Elevação Lateral',
        category: 'Ombros',
        muscle: 'Deltoides Médio',
        equipment: 'Halteres',
        difficulty: 'beginner',
        instructions: ['Halteres nas mãos', 'Braços ao lado do corpo', 'Eleve lateralmente até a altura dos ombros', 'Desça controladamente'],
        sets: 3,
        reps: 12,
        weight: 15,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'shoulders3',
        name: 'Elevação Frontal',
        category: 'Ombros',
        muscle: 'Deltoides Anterior',
        equipment: 'Halteres',
        difficulty: 'beginner',
        instructions: ['Halteres à frente do corpo', 'Eleve alternadamente', 'Até a altura dos ombros', 'Controle a descida'],
        sets: 3,
        reps: 12,
        weight: 12,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'shoulders4',
        name: 'Encolhimento',
        category: 'Trapézio',
        muscle: 'Trapézio',
        equipment: 'Halteres',
        difficulty: 'beginner',
        instructions: ['Halteres nas mãos', 'Braços estendidos', 'Encolha os ombros', 'Contraia o trapézio'],
        sets: 3,
        reps: 12,
        weight: 25,
        rest: 90,
        location: 'gym'
      }
    ]
  },
  'Sexta': {
    name: 'Braços Completo',
    focus: ['Bíceps', 'Tríceps', 'Antebraços'],
    exercises: [
      {
        id: 'arms1',
        name: 'Rosca Alternada',
        category: 'Bíceps',
        muscle: 'Bíceps',
        equipment: 'Halteres',
        difficulty: 'beginner',
        instructions: ['Halteres nas mãos', 'Alterne os braços', 'Flexione controladamente', 'Contraia o bíceps'],
        sets: 4,
        reps: 12,
        weight: 18,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'arms2',
        name: 'Tríceps Pulley',
        category: 'Tríceps',
        muscle: 'Tríceps',
        equipment: 'Polia Alta',
        difficulty: 'beginner',
        instructions: ['Segure a corda', 'Cotovelos fixos', 'Estenda os braços', 'Contraia o tríceps'],
        sets: 4,
        reps: 12,
        weight: 35,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'arms3',
        name: 'Rosca Martelo',
        category: 'Bíceps',
        muscle: 'Bíceps e Antebraços',
        equipment: 'Halteres',
        difficulty: 'beginner',
        instructions: ['Pegada neutra', 'Flexione alternadamente', 'Mantenha os cotovelos fixos', 'Controle o movimento'],
        sets: 3,
        reps: 12,
        weight: 16,
        rest: 90,
        location: 'gym'
      },
      {
        id: 'arms4',
        name: 'Tríceps Francês',
        category: 'Tríceps',
        muscle: 'Tríceps',
        equipment: 'Halter',
        difficulty: 'intermediate',
        instructions: ['Halter com ambas as mãos', 'Braços estendidos acima da cabeça', 'Flexione apenas os cotovelos', 'Estenda controladamente'],
        sets: 3,
        reps: 12,
        weight: 20,
        rest: 90,
        location: 'gym'
      }
    ]
  },
  'Sábado': {
    name: 'Cardio e Core',
    focus: ['Cardiovascular', 'Abdômen'],
    exercises: [
      {
        id: 'cardio1',
        name: 'Esteira',
        category: 'Cardio',
        muscle: 'Cardiovascular',
        equipment: 'Esteira',
        difficulty: 'beginner',
        instructions: ['Aquecimento 5 min', 'Velocidade moderada', 'Mantenha ritmo constante', 'Resfriamento 5 min'],
        duration: 30,
        rest: 0,
        location: 'gym'
      },
      {
        id: 'core1',
        name: 'Prancha',
        category: 'Core',
        muscle: 'Abdômen',
        equipment: 'Peso Corporal',
        difficulty: 'beginner',
        instructions: ['Apoie antebraços e pés', 'Mantenha corpo reto', 'Contraia o abdômen', 'Respire normalmente'],
        sets: 3,
        duration: 45,
        rest: 60,
        location: 'gym'
      },
      {
        id: 'core2',
        name: 'Abdominal Supra',
        category: 'Core',
        muscle: 'Abdômen Superior',
        equipment: 'Peso Corporal',
        difficulty: 'beginner',
        instructions: ['Deite de costas', 'Joelhos flexionados', 'Eleve o tronco', 'Contraia o abdômen'],
        sets: 3,
        reps: 15,
        rest: 60,
        location: 'gym'
      },
      {
        id: 'core3',
        name: 'Elevação de Pernas',
        category: 'Core',
        muscle: 'Abdômen Inferior',
        equipment: 'Peso Corporal',
        difficulty: 'intermediate',
        instructions: ['Deite de costas', 'Mãos ao lado do corpo', 'Eleve as pernas', 'Desça controladamente'],
        sets: 3,
        reps: 12,
        rest: 60,
        location: 'gym'
      }
    ]
  },
  'Domingo': {
    name: 'Descanso Ativo',
    focus: ['Recuperação', 'Mobilidade'],
    exercises: [
      {
        id: 'recovery1',
        name: 'Caminhada Leve',
        category: 'Recuperação',
        muscle: 'Geral',
        equipment: 'Nenhum',
        difficulty: 'beginner',
        instructions: ['Caminhada em ritmo leve', 'Respire profundamente', 'Relaxe os músculos', 'Hidrate-se bem'],
        duration: 20,
        rest: 0,
        location: 'outdoor'
      },
      {
        id: 'recovery2',
        name: 'Alongamento Geral',
        category: 'Mobilidade',
        muscle: 'Todos os Grupos',
        equipment: 'Nenhum',
        difficulty: 'beginner',
        instructions: ['Alongue cada grupo muscular', 'Mantenha 30s cada posição', 'Respire profundamente', 'Não force'],
        duration: 15,
        rest: 0,
        location: 'any'
      }
    ]
  }
}

const sampleWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino de Peito e Tríceps',
    category: 'Força',
    duration: 60,
    difficulty: 'intermediate',
    location: 'gym',
    exercises: [
      {
        id: '1',
        name: 'Supino Reto',
        category: 'Peito',
        muscle: 'Peitoral',
        equipment: 'Barra',
        difficulty: 'intermediate',
        instructions: ['Deite no banco', 'Segure a barra', 'Desça controladamente', 'Empurre para cima'],
        sets: 4,
        reps: 12,
        weight: 80,
        rest: 90,
        location: 'gym'
      },
      {
        id: '2',
        name: 'Flexão de Braço',
        category: 'Peito',
        muscle: 'Peitoral',
        equipment: 'Peso Corporal',
        difficulty: 'beginner',
        instructions: ['Posição de prancha', 'Desça o corpo', 'Empurre para cima'],
        sets: 3,
        reps: 15,
        rest: 60,
        location: 'any'
      }
    ]
  },
  {
    id: '2',
    name: 'Cardio HIIT',
    category: 'Cardio',
    duration: 30,
    difficulty: 'advanced',
    location: 'outdoor',
    exercises: [
      {
        id: '3',
        name: 'Burpees',
        category: 'Cardio',
        muscle: 'Corpo Todo',
        equipment: 'Peso Corporal',
        difficulty: 'advanced',
        instructions: ['Agache', 'Salte para prancha', 'Flexão', 'Salte para cima'],
        sets: 5,
        reps: 10,
        rest: 30,
        location: 'any'
      }
    ]
  },
  {
    id: '3',
    name: 'Treino em Casa - Corpo Todo',
    category: 'Funcional',
    duration: 45,
    difficulty: 'beginner',
    location: 'home',
    exercises: [
      {
        id: '4',
        name: 'Agachamento',
        category: 'Pernas',
        muscle: 'Quadríceps',
        equipment: 'Peso Corporal',
        difficulty: 'beginner',
        instructions: ['Pés na largura dos ombros', 'Desça como se fosse sentar', 'Suba controladamente'],
        sets: 3,
        reps: 15,
        rest: 45,
        location: 'home'
      },
      {
        id: '5',
        name: 'Prancha',
        category: 'Core',
        muscle: 'Abdômen',
        equipment: 'Peso Corporal',
        difficulty: 'beginner',
        instructions: ['Apoie antebraços e pés', 'Mantenha corpo reto', 'Contraia o abdômen'],
        duration: 30,
        rest: 30,
        location: 'home'
      }
    ]
  }
]

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Frango Grelhado com Batata Doce',
    category: 'Almoço',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 12,
    ingredients: [
      '200g peito de frango',
      '1 batata doce média',
      'Temperos a gosto',
      '1 colher de azeite'
    ],
    instructions: [
      'Tempere o frango',
      'Corte a batata doce',
      'Grelhe o frango por 8 minutos cada lado',
      'Asse a batata doce por 20 minutos'
    ],
    difficulty: 'easy',
    tags: ['proteína', 'carboidrato', 'saudável']
  },
  {
    id: '2',
    name: 'Smoothie Proteico',
    category: 'Lanche',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 280,
    protein: 25,
    carbs: 30,
    fat: 8,
    ingredients: [
      '1 banana',
      '1 scoop whey protein',
      '200ml leite desnatado',
      '1 colher de pasta de amendoim'
    ],
    instructions: [
      'Adicione todos os ingredientes no liquidificador',
      'Bata por 1 minuto',
      'Sirva gelado'
    ],
    difficulty: 'easy',
    tags: ['proteína', 'rápido', 'pós-treino']
  }
]

const calisthenicChallenge: Challenge = {
  id: 'calisthenics-30',
  name: 'Desafio Calistênico 30 Dias',
  description: 'Transforme seu corpo em 30 dias usando apenas o peso corporal',
  duration: 30,
  currentDay: 1,
  progress: 3,
  completed: false,
  exercises: [
    {
      id: 'c1',
      name: 'Flexões',
      category: 'Peito',
      muscle: 'Peitoral',
      equipment: 'Peso Corporal',
      difficulty: 'beginner',
      instructions: ['Posição de prancha', 'Desça controladamente', 'Empurre para cima'],
      reps: 10,
      location: 'any'
    },
    {
      id: 'c2',
      name: 'Agachamentos',
      category: 'Pernas',
      muscle: 'Quadríceps',
      equipment: 'Peso Corporal',
      difficulty: 'beginner',
      instructions: ['Pés na largura dos ombros', 'Desça como se fosse sentar', 'Suba controladamente'],
      reps: 15,
      location: 'any'
    },
    {
      id: 'c3',
      name: 'Prancha',
      category: 'Core',
      muscle: 'Abdômen',
      equipment: 'Peso Corporal',
      difficulty: 'beginner',
      instructions: ['Apoie antebraços e pés', 'Mantenha corpo reto', 'Contraia o abdômen'],
      duration: 30,
      location: 'any'
    }
  ]
}

export default function FitnessApp() {
  const [currentView, setCurrentView] = useState('landing')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showProOffer, setShowProOffer] = useState(false)
  const [showPlanSelection, setShowPlanSelection] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [darkMode, setDarkMode] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  
  // Timer states
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerType, setTimerType] = useState<'workout' | 'rest'>('workout')
  
  // Workout states
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([])
  const [selectedWorkoutLocation, setSelectedWorkoutLocation] = useState<'outdoor' | 'home' | 'gym' | ''>('')
  const [showMedicalQuestionnaire, setShowMedicalQuestionnaire] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Segunda')
  const [workoutProgress, setWorkoutProgress] = useState<{[key: string]: {[key: string]: {completed: boolean, actualWeight?: number, actualReps?: number, actualSets?: number}}}>({})
  
  // Nutrition states
  const [dailyCalories, setDailyCalories] = useState(0)
  const [dailyMacros, setDailyMacros] = useState({ protein: 0, carbs: 0, fat: 0 })
  const [mealPlan, setMealPlan] = useState<Recipe[]>([])
  const [shoppingList, setShoppingList] = useState<string[]>([])
  
  // Progress states
  const [weightHistory, setWeightHistory] = useState<{ date: string, weight: number }[]>([])
  const [bodyMeasurements, setBodyMeasurements] = useState({
    chest: 0,
    waist: 0,
    hips: 0,
    arms: 0,
    thighs: 0
  })
  
  // Challenge states
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(calisthenicChallenge)
  
  // Photo analysis states
  const [photoAnalysis, setPhotoAnalysis] = useState<{
    estimatedBodyFat: number
    recommendations: string[]
    confidence: number
  } | null>(null)

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    avatar: '/api/placeholder/150/150',
    isPremium: false,
    streak: 0,
    level: 1,
    totalWorkouts: 0,
    currentWeight: 70,
    targetWeight: 65,
    height: 170,
    age: 25,
    gender: 'female',
    createdAt: new Date().toISOString(),
    phone: '',
    bio: '',
    activityLevel: 'moderate',
    goal: 'lose_weight',
    emailVerified: false,
    loginAttempts: 0,
    accountLocked: false,
    workoutLocation: undefined,
    medicalHistory: {
      hasConditions: false,
      conditions: [],
      medications: [],
      allergies: [],
      injuries: [],
      doctorApproval: false
    }
  })

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  })

  // Local Storage Management
  const saveUserData = (userData: User) => {
    try {
      localStorage.setItem('fitpro_user', JSON.stringify(userData))
      localStorage.setItem('fitpro_last_save', new Date().toISOString())
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error)
    }
  }

  const loadUserData = (): User | null => {
    try {
      const savedUser = localStorage.getItem('fitpro_user')
      if (savedUser) {
        return JSON.parse(savedUser)
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
    return null
  }

  const saveUserSession = (email: string) => {
    try {
      localStorage.setItem('fitpro_session', JSON.stringify({
        email,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      }))
    } catch (error) {
      console.error('Erro ao salvar sessão:', error)
    }
  }

  const clearUserSession = () => {
    try {
      localStorage.removeItem('fitpro_session')
      localStorage.removeItem('fitpro_user')
    } catch (error) {
      console.error('Erro ao limpar sessão:', error)
    }
  }

  // Validation Functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (password.length < 8) {
      errors.push({ field: 'password', message: 'Senha deve ter pelo menos 8 caracteres' })
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push({ field: 'password', message: 'Senha deve conter pelo menos uma letra minúscula' })
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push({ field: 'password', message: 'Senha deve conter pelo menos uma letra maiúscula' })
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push({ field: 'password', message: 'Senha deve conter pelo menos um número' })
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push({ field: 'password', message: 'Senha deve conter pelo menos um caractere especial (@$!%*?&)' })
    }
    
    return errors
  }

  const validateRegistrationForm = (): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (!registerForm.name.trim()) {
      errors.push({ field: 'name', message: 'Nome é obrigatório' })
    } else if (registerForm.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Nome deve ter pelo menos 2 caracteres' })
    }
    
    if (!registerForm.email.trim()) {
      errors.push({ field: 'email', message: 'Email é obrigatório' })
    } else if (!validateEmail(registerForm.email)) {
      errors.push({ field: 'email', message: 'Email inválido' })
    }
    
    const passwordErrors = validatePassword(registerForm.password)
    errors.push(...passwordErrors)
    
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Senhas não coincidem' })
    }
    
    if (registerForm.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(registerForm.phone)) {
      errors.push({ field: 'phone', message: 'Telefone deve estar no formato (11) 99999-9999' })
    }
    
    if (!registerForm.acceptTerms) {
      errors.push({ field: 'acceptTerms', message: 'Você deve aceitar os termos de uso' })
    }
    
    return errors
  }

  const checkAccountLock = (email: string): boolean => {
    try {
      const lockData = localStorage.getItem(`fitpro_lock_${email}`)
      if (lockData) {
        const { lockUntil, attempts } = JSON.parse(lockData)
        if (new Date() < new Date(lockUntil) && attempts >= 5) {
          return true
        }
      }
    } catch (error) {
      console.error('Erro ao verificar bloqueio da conta:', error)
    }
    return false
  }

  const updateLoginAttempts = (email: string, success: boolean) => {
    try {
      const lockKey = `fitpro_lock_${email}`
      let lockData = { attempts: 0, lockUntil: null }
      
      const existingData = localStorage.getItem(lockKey)
      if (existingData) {
        lockData = JSON.parse(existingData)
      }
      
      if (success) {
        localStorage.removeItem(lockKey)
      } else {
        lockData.attempts += 1
        if (lockData.attempts >= 5) {
          lockData.lockUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
        }
        localStorage.setItem(lockKey, JSON.stringify(lockData))
      }
    } catch (error) {
      console.error('Erro ao atualizar tentativas de login:', error)
    }
  }

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendVerificationEmail = (email: string, code: string) => {
    // Simular envio de email
    console.log(`Código de verificação enviado para ${email}: ${code}`)
    // Em produção, aqui seria feita a integração com serviço de email
  }

  // Calculations
  const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female') => {
    // Mifflin-St Jeor Equation
    const bmr = gender === 'male' 
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161
    return Math.round(bmr)
  }

  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return Math.round(bmr * multipliers[activityLevel as keyof typeof multipliers])
  }

  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100
    return Number((weight / (heightInM * heightInM)).toFixed(1))
  }

  const calculateBMIPrime = (bmi: number) => {
    return Number((bmi / 25).toFixed(2))
  }

  const calculateMacros = (calories: number, goal: string) => {
    let proteinRatio = 0.3
    let fatRatio = 0.25
    let carbRatio = 0.45

    if (goal === 'build_muscle') {
      proteinRatio = 0.35
      fatRatio = 0.25
      carbRatio = 0.4
    } else if (goal === 'lose_weight') {
      proteinRatio = 0.35
      fatRatio = 0.3
      carbRatio = 0.35
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4),
      carbs: Math.round((calories * carbRatio) / 4),
      fat: Math.round((calories * fatRatio) / 9),
      calories
    }
  }

  // Workout Progress Functions
  const updateExerciseProgress = (day: string, exerciseId: string, data: {completed?: boolean, actualWeight?: number, actualReps?: number, actualSets?: number}) => {
    setWorkoutProgress(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [exerciseId]: {
          ...prev[day]?.[exerciseId],
          ...data
        }
      }
    }))
  }

  const getExerciseProgress = (day: string, exerciseId: string) => {
    return workoutProgress[day]?.[exerciseId] || { completed: false }
  }

  const getDayProgress = (day: string) => {
    const dayWorkout = weeklyGymPlan[day]
    if (!dayWorkout) return 0
    
    const totalExercises = dayWorkout.exercises.length
    const completedExercises = dayWorkout.exercises.filter(exercise => 
      getExerciseProgress(day, exercise.id).completed
    ).length
    
    return totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0
  }

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds - 1)
      }, 1000)
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false)
      // Play sound or notification
    }
    return () => clearInterval(interval)
  }, [timerActive, timerSeconds])

  // Load user data on component mount
  useEffect(() => {
    const savedUser = loadUserData()
    if (savedUser) {
      setUser(savedUser)
      setIsAuthenticated(true)
      setCurrentView('dashboard')
    }
  }, [])

  // Auto-save user data when user state changes
  useEffect(() => {
    if (isAuthenticated && user.id) {
      saveUserData(user)
    }
  }, [user, isAuthenticated])

  // Save workout progress
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('fitpro_workout_progress', JSON.stringify(workoutProgress))
    }
  }, [workoutProgress, isAuthenticated])

  // Load workout progress
  useEffect(() => {
    if (isAuthenticated) {
      const savedProgress = localStorage.getItem('fitpro_workout_progress')
      if (savedProgress) {
        setWorkoutProgress(JSON.parse(savedProgress))
      }
    }
  }, [isAuthenticated])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = (duration: number, type: 'workout' | 'rest' = 'workout') => {
    setTimerSeconds(duration)
    setTimerType(type)
    setTimerActive(true)
  }

  const pauseTimer = () => {
    setTimerActive(!timerActive)
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimerSeconds(0)
  }

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setValidationErrors([])

    try {
      // Verificar se a conta está bloqueada
      if (checkAccountLock(loginForm.email)) {
        setValidationErrors([{ field: 'general', message: 'Conta temporariamente bloqueada devido a muitas tentativas de login. Tente novamente em 30 minutos.' }])
        setIsLoading(false)
        return
      }

      // Validar campos
      const errors: ValidationError[] = []
      if (!loginForm.email) {
        errors.push({ field: 'email', message: 'Email é obrigatório' })
      } else if (!validateEmail(loginForm.email)) {
        errors.push({ field: 'email', message: 'Email inválido' })
      }
      
      if (!loginForm.password) {
        errors.push({ field: 'password', message: 'Senha é obrigatória' })
      }

      if (errors.length > 0) {
        setValidationErrors(errors)
        setIsLoading(false)
        return
      }

      // Simular verificação de credenciais
      // Em produção, aqui seria feita a verificação no backend
      const savedUsers = JSON.parse(localStorage.getItem('fitpro_users') || '[]')
      const existingUser = savedUsers.find((u: any) => u.email === loginForm.email)

      if (!existingUser || existingUser.password !== loginForm.password) {
        updateLoginAttempts(loginForm.email, false)
        setValidationErrors([{ field: 'general', message: 'Email ou senha incorretos' }])
        setIsLoading(false)
        return
      }

      // Login bem-sucedido
      updateLoginAttempts(loginForm.email, true)
      
      const updatedUser = {
        ...existingUser,
        lastLogin: new Date().toISOString(),
        loginAttempts: 0,
        accountLocked: false
      }

      setUser(updatedUser)
      setIsAuthenticated(true)
      saveUserSession(loginForm.email)
      setShowLogin(false)
      setCurrentView('dashboard')
      
      // Limpar formulário
      setLoginForm({ email: '', password: '' })
      
    } catch (error) {
      console.error('Erro no login:', error)
      setValidationErrors([{ field: 'general', message: 'Erro interno. Tente novamente.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setValidationErrors([])

    try {
      // Validar formulário
      const errors = validateRegistrationForm()
      if (errors.length > 0) {
        setValidationErrors(errors)
        setIsLoading(false)
        return
      }

      // Verificar se email já existe
      const savedUsers = JSON.parse(localStorage.getItem('fitpro_users') || '[]')
      const existingUser = savedUsers.find((u: any) => u.email === registerForm.email)

      if (existingUser) {
        setValidationErrors([{ field: 'email', message: 'Este email já está cadastrado' }])
        setIsLoading(false)
        return
      }

      // Gerar código de verificação
      const code = generateVerificationCode()
      setGeneratedCode(code)
      sendVerificationEmail(registerForm.email, code)
      
      setShowRegister(false)
      setShowEmailVerification(true)
      
    } catch (error) {
      console.error('Erro no registro:', error)
      setValidationErrors([{ field: 'general', message: 'Erro interno. Tente novamente.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setValidationErrors([])

    try {
      if (verificationCode !== generatedCode) {
        setValidationErrors([{ field: 'verificationCode', message: 'Código de verificação incorreto' }])
        setIsLoading(false)
        return
      }

      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        avatar: '/api/placeholder/150/150',
        isPremium: false,
        streak: 0,
        level: 1,
        totalWorkouts: 0,
        currentWeight: 70,
        targetWeight: 65,
        height: 170,
        age: 25,
        gender: 'female',
        createdAt: new Date().toISOString(),
        bio: '',
        activityLevel: 'moderate',
        goal: 'lose_weight',
        emailVerified: true,
        lastLogin: new Date().toISOString(),
        loginAttempts: 0,
        accountLocked: false,
        workoutLocation: undefined,
        medicalHistory: {
          hasConditions: false,
          conditions: [],
          medications: [],
          allergies: [],
          injuries: [],
          doctorApproval: false
        }
      }

      // Salvar usuário
      const savedUsers = JSON.parse(localStorage.getItem('fitpro_users') || '[]')
      savedUsers.push({
        ...newUser,
        password: registerForm.password // Em produção, seria hash da senha
      })
      localStorage.setItem('fitpro_users', JSON.stringify(savedUsers))

      setUser(newUser)
      setIsAuthenticated(true)
      saveUserSession(registerForm.email)
      setShowEmailVerification(false)
      setShowOnboarding(true)
      
      // Limpar formulários
      setRegisterForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        acceptTerms: false
      })
      setVerificationCode('')
      setGeneratedCode('')
      
    } catch (error) {
      console.error('Erro na verificação:', error)
      setValidationErrors([{ field: 'general', message: 'Erro interno. Tente novamente.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearUserSession()
    setUser({
      id: '',
      name: '',
      email: '',
      avatar: '/api/placeholder/150/150',
      isPremium: false,
      streak: 0,
      level: 1,
      totalWorkouts: 0,
      currentWeight: 70,
      targetWeight: 65,
      height: 170,
      age: 25,
      gender: 'female',
      createdAt: new Date().toISOString(),
      phone: '',
      bio: '',
      activityLevel: 'moderate',
      goal: 'lose_weight',
      emailVerified: false,
      loginAttempts: 0,
      accountLocked: false,
      workoutLocation: undefined,
      medicalHistory: {
        hasConditions: false,
        conditions: [],
        medications: [],
        allergies: [],
        injuries: [],
        doctorApproval: false
      }
    })
    setCurrentView('landing')
  }

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId)
    setShowPlanSelection(true)
  }

  const handlePurchase = () => {
    setUser(prev => ({ ...prev, isPremium: true }))
    setShowPlanSelection(false)
    setShowProOffer(false)
    setCurrentView('dashboard')
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const getFieldError = (field: string): string | undefined => {
    const error = validationErrors.find(e => e.field === field)
    return error?.message
  }

  // Update user calculations when relevant data changes
  useEffect(() => {
    if (user.currentWeight && user.height && user.age) {
      const bmr = calculateBMR(user.currentWeight, user.height, user.age, user.gender)
      const tdee = calculateTDEE(bmr, user.activityLevel)
      const bmi = calculateBMI(user.currentWeight, user.height)
      const bmiPrime = calculateBMIPrime(bmi)
      const macros = calculateMacros(tdee, user.goal)

      setUser(prev => ({
        ...prev,
        bmr,
        tdee,
        bmi,
        bmiPrime,
        macros
      }))
    }
  }, [user.currentWeight, user.height, user.age, user.gender, user.activityLevel, user.goal])

  const renderLandingPage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                BetterLife Gyn
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setDarkMode(!darkMode)}
                className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowLogin(true)}
                className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className={`${darkMode ? 'bg-green-900 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-300'} mb-6`}>
              🚀 Transforme seu corpo em 30 dias
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Sua Jornada
              </span>
              <br />
              <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Fitness Começa Aqui</span>
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
              Plataforma completa com treinos personalizados, dieta com IA, produtos de emagrecimento 
              e acompanhamento profissional. Mais de 10.000 pessoas já transformaram suas vidas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => setShowRegister(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} text-lg px-8 py-4`}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">10K+</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Exercícios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Tudo que você precisa para <span className="text-green-400">transformar seu corpo</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Recursos premium desenvolvidos por especialistas para acelerar seus resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Treinos com Vídeos HD</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Mais de 500 exercícios em vídeo com instruções detalhadas para cada parte do corpo
                </p>
                <Badge className={`${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>Premium</Badge>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Dieta Personalizada</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  IA avançada cria planos nutricionais específicos para seu biotipo e objetivos
                </p>
                <Badge className={`${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>IA Powered</Badge>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Produto Emagrecimento</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Suplemento natural premium para acelerar metabolismo e queima de gordura
                </p>
                <Badge className={`${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}>Exclusivo</Badge>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Analytics Avançado</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Acompanhe cada progresso com métricas detalhadas e relatórios personalizados
                </p>
                <Badge className={`${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>Pro Analytics</Badge>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Suporte Premium</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Chat direto com personal trainers e nutricionistas certificados 24/7
                </p>
                <Badge className={`${darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>24/7</Badge>
              </CardContent>
            </Card>

            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Comunidade VIP</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Acesso exclusivo à comunidade de membros premium com desafios especiais
                </p>
                <Badge className={`${darkMode ? 'bg-pink-900 text-pink-300' : 'bg-pink-100 text-pink-800'}`}>Exclusivo</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Planos que se adaptam ao seu <span className="text-green-400">orçamento</span>
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-12`}>
            Comece gratuitamente ou escolha um plano premium com desconto
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardContent className="p-8 text-center">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Gratuito</h3>
                <div className="text-4xl font-bold text-green-400 mb-6">R$ 0</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>3 treinos básicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cálculo de IMC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cronômetro simples</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setShowRegister(true)}
                  variant="outline"
                  className={`w-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900 to-emerald-900 border-green-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                  MAIS POPULAR
                </Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">R$ 39,90</div>
                <div className="text-gray-300 mb-6">por mês</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">+500 vídeos de exercícios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Dieta personalizada com IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Produto de emagrecimento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Suporte 24/7</span>
                  </li>
                </ul>
                <Button
                  onClick={() => setShowRegister(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Começar Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Junte-se a milhares de pessoas que já alcançaram seus objetivos
          </p>
          <Button
            size="lg"
            onClick={() => setShowRegister(true)}
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Criar Conta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BetterLife Gyn</h3>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Transformando vidas através do fitness e bem-estar.
              </p>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Produto</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Treinos</li>
                <li>Nutrição</li>
                <li>Suplementos</li>
                <li>Comunidade</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Suporte</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>FAQ</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Empresa</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Privacidade</li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} mt-8 pt-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2024 FitPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderOnboarding = () => {
    const steps = [
      {
        title: 'Bem-vindo ao FitPro!',
        description: 'Vamos configurar seu perfil para criar a melhor experiência personalizada',
        content: (
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Prepare-se para transformar sua vida com treinos personalizados, 
              dieta inteligente e acompanhamento profissional.
            </p>
          </div>
        )
      },
      {
        title: 'Informações Básicas',
        description: 'Conte-nos um pouco sobre você',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Idade</Label>
                <Input
                  type="number"
                  value={user.age}
                  onChange={(e) => setUser(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div>
                <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gênero</Label>
                <Select value={user.gender} onValueChange={(value: 'male' | 'female') => setUser(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="male">Masculino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Altura (cm)</Label>
                <Input
                  type="number"
                  value={user.height}
                  onChange={(e) => setUser(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div>
                <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Peso Atual (kg)</Label>
                <Input
                  type="number"
                  value={user.currentWeight}
                  onChange={(e) => setUser(prev => ({ ...prev, currentWeight: parseFloat(e.target.value) }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Seus Objetivos',
        description: 'O que você quer alcançar?',
        content: (
          <div className="space-y-6">
            <div>
              <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 block`}>Objetivo Principal</Label>
              <RadioGroup value={user.goal} onValueChange={(value: any) => setUser(prev => ({ ...prev, goal: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lose_weight" id="lose_weight" />
                  <Label htmlFor="lose_weight" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Perder peso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gain_weight" id="gain_weight" />
                  <Label htmlFor="gain_weight" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ganhar peso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="build_muscle" id="build_muscle" />
                  <Label htmlFor="build_muscle" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ganhar massa muscular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain" id="maintain" />
                  <Label htmlFor="maintain" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Manter peso atual</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Peso Meta (kg)</Label>
              <Input
                type="number"
                value={user.targetWeight}
                onChange={(e) => setUser(prev => ({ ...prev, targetWeight: parseFloat(e.target.value) }))}
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
        )
      },
      {
        title: 'Nível de Atividade',
        description: 'Como é sua rotina atual?',
        content: (
          <div className="space-y-4">
            <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 block`}>Nível de Atividade Física</Label>
            <RadioGroup value={user.activityLevel} onValueChange={(value: any) => setUser(prev => ({ ...prev, activityLevel: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedentary" id="sedentary" />
                <Label htmlFor="sedentary" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sedentário (pouco ou nenhum exercício)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Levemente ativo (exercício leve 1-3 dias/semana)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Moderadamente ativo (exercício moderado 3-5 dias/semana)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Muito ativo (exercício intenso 6-7 dias/semana)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very_active" id="very_active" />
                <Label htmlFor="very_active" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Extremamente ativo (exercício muito intenso, trabalho físico)
                </Label>
              </div>
            </RadioGroup>
          </div>
        )
      },
      {
        title: 'Tudo Pronto!',
        description: 'Seu perfil foi configurado com sucesso',
        content: (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Seus Dados Calculados:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>IMC:</span>
                    <span className={`ml-2 font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {user.bmi?.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>BMR:</span>
                    <span className={`ml-2 font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {user.bmr} kcal
                    </span>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TDEE:</span>
                    <span className={`ml-2 font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {user.tdee} kcal
                    </span>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>BMI Prime:</span>
                    <span className={`ml-2 font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {user.bmiPrime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]

    const currentStep = steps[onboardingStep]

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} flex items-center justify-center p-4`}>
        <Card className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= onboardingStep 
                        ? 'bg-green-500' 
                        : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentStep.title}
            </CardTitle>
            <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentStep.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep.content}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setOnboardingStep(Math.max(0, onboardingStep - 1))}
                disabled={onboardingStep === 0}
                className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              
              {onboardingStep < steps.length - 1 ? (
                <Button
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowOnboarding(false)
                    setCurrentView('plans')
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Finalizar
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderLoginModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Entrar</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowLogin(false)
                setValidationErrors([])
                setLoginForm({ email: '', password: '' })
              }}
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validationErrors.some(e => e.field === 'general') && (
            <Alert className="mb-4 border-red-500 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                {getFieldError('general')}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${
                  getFieldError('email') ? 'border-red-500' : ''
                }`}
                required
              />
              {getFieldError('email') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} pr-10 ${
                    getFieldError('password') ? 'border-red-500' : ''
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {getFieldError('password') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('password')}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Não tem uma conta?{' '}
              <Button
                variant="link"
                onClick={() => {
                  setShowLogin(false)
                  setShowRegister(true)
                  setValidationErrors([])
                }}
                className="text-green-400 hover:text-green-300 p-0"
              >
                Criar conta
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRegisterModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Criar Conta</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowRegister(false)
                setValidationErrors([])
                setRegisterForm({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  phone: '',
                  acceptTerms: false
                })
              }}
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Crie sua conta gratuita para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validationErrors.some(e => e.field === 'general') && (
            <Alert className="mb-4 border-red-500 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                {getFieldError('general')}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nome Completo</Label>
              <Input
                id="name"
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${
                  getFieldError('name') ? 'border-red-500' : ''
                }`}
                required
              />
              {getFieldError('name') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('name')}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</Label>
              <Input
                id="email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${
                  getFieldError('email') ? 'border-red-500' : ''
                }`}
                required
              />
              {getFieldError('email') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Telefone (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))}
                placeholder="(11) 99999-9999"
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${
                  getFieldError('phone') ? 'border-red-500' : ''
                }`}
              />
              {getFieldError('phone') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} pr-10 ${
                    getFieldError('password') ? 'border-red-500' : ''
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {getFieldError('password') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('password')}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} pr-10 ${
                    getFieldError('confirmPassword') ? 'border-red-500' : ''
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {getFieldError('confirmPassword') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('confirmPassword')}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={registerForm.acceptTerms}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="acceptTerms" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Aceito os <span className="text-green-400 underline cursor-pointer">termos de uso</span> e <span className="text-green-400 underline cursor-pointer">política de privacidade</span>
              </Label>
            </div>
            {getFieldError('acceptTerms') && (
              <p className="text-red-500 text-sm">{getFieldError('acceptTerms')}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando conta...
                </div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar Conta
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Já tem uma conta?{' '}
              <Button
                variant="link"
                onClick={() => {
                  setShowRegister(false)
                  setShowLogin(true)
                  setValidationErrors([])
                }}
                className="text-green-400 hover:text-green-300 p-0"
              >
                Fazer login
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmailVerificationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Verificar Email</CardTitle>
          <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enviamos um código de verificação para<br />
            <strong>{registerForm.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validationErrors.some(e => e.field === 'general') && (
            <Alert className="mb-4 border-red-500 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                {getFieldError('general')}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleEmailVerification} className="space-y-4">
            <div>
              <Label htmlFor="verificationCode" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Código de Verificação
              </Label>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Digite o código de 6 dígitos"
                maxLength={6}
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} text-center text-lg tracking-widest ${
                  getFieldError('verificationCode') ? 'border-red-500' : ''
                }`}
                required
              />
              {getFieldError('verificationCode') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('verificationCode')}</p>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verificando...
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verificar Email
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Não recebeu o código?{' '}
              <Button
                variant="link"
                onClick={() => {
                  const newCode = generateVerificationCode()
                  setGeneratedCode(newCode)
                  sendVerificationEmail(registerForm.email, newCode)
                }}
                className="text-green-400 hover:text-green-300 p-0 text-sm"
              >
                Reenviar
              </Button>
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
              Código para teste: <strong>{generatedCode}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlansPage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} flex items-center justify-center p-4`}>
      <Card className={`w-full max-w-6xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <CardHeader className="text-center pb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            BetterLife Gyn Premium
          </CardTitle>
          <CardDescription className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Transforme sua jornada fitness com recursos exclusivos e resultados comprovados
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Planos de Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'border-2 border-green-500 bg-gradient-to-br from-green-900 to-emerald-900' 
                    : darkMode ? 'border border-gray-600 bg-gray-800' : 'border border-gray-300 bg-white'
                } hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
                onClick={() => handlePlanSelection(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-400">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                      <span className={`text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>/{plan.duration}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                        R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                      </div>
                    )}
                    {plan.discount && (
                      <div className="text-sm text-green-400 font-semibold">{plan.discount}</div>
                    )}
                  </div>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                        : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlanSelection(plan.id)
                    }}
                  >
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão Continuar Gratuito */}
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentView('dashboard')}
              className={`px-8 py-4 text-lg border-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Continuar com Versão Gratuita
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlanSelection = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan)
    if (!plan) return null

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} flex items-center justify-center p-4`}>
        <Card className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="text-center">
            <Button
              variant="ghost"
              onClick={() => setShowPlanSelection(false)}
              className={`absolute top-4 left-4 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Finalizar Assinatura
            </CardTitle>
            <CardDescription className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Você selecionou o plano {plan.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Resumo do Plano */}
            <Card className="bg-gradient-to-br from-green-900 to-emerald-900 border-green-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-green-200">Plano Premium BetterLife Gyn</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-gray-300">por {plan.duration}</div>
                    {plan.discount && (
                      <Badge className="bg-green-800 text-green-200 mt-2">
                        {plan.discount}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-green-300 mb-3">Recursos inclusos:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-green-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informações de Pagamento */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardNumber" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="Seu Nome Completo"
                      className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardExpiry" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Validade</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/AA"
                      className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>CVV</Label>
                    <Input
                      id="cardCvv"
                      placeholder="123"
                      className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handlePurchase}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Confirmar Pagamento
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentView('dashboard')}
                className={`px-8 py-4 text-lg ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Continuar Gratuito
              </Button>
            </div>

            {/* Garantia */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Garantia de 30 dias</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Cancele a qualquer momento. Reembolso total em até 30 dias.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderWorkoutsPage = () => {
    const filteredWorkouts = selectedWorkoutLocation 
      ? sampleWorkouts.filter(workout => workout.location === selectedWorkoutLocation || workout.location === 'any')
      : sampleWorkouts

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} p-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => setCurrentView('dashboard')}
              className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setDarkMode(!darkMode)}
                className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              {!user.isPremium && (
                <Button
                  onClick={() => setCurrentView('plans')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Premium
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Dumbbell className="w-6 h-6 text-green-400" />
                Treinos Personalizados
              </CardTitle>
              <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Escolha onde você prefere treinar e encontre os exercícios perfeitos para você
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Seleção de Local de Treino */}
              <div className="mb-8">
                <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 block text-lg font-semibold`}>
                  Onde você prefere treinar?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedWorkoutLocation === 'outdoor' 
                        ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : darkMode ? 'border border-gray-600 hover:border-green-400' : 'border border-gray-300 hover:border-green-400'
                    }`}
                    onClick={() => setSelectedWorkoutLocation(selectedWorkoutLocation === 'outdoor' ? '' : 'outdoor')}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TreePine className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Ao Ar Livre
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Parques, praias, ruas e espaços abertos
                      </p>
                      {selectedWorkoutLocation === 'outdoor' && (
                        <Badge className="mt-3 bg-green-600 text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Selecionado
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedWorkoutLocation === 'home' 
                        ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : darkMode ? 'border border-gray-600 hover:border-green-400' : 'border border-gray-300 hover:border-green-400'
                    }`}
                    onClick={() => setSelectedWorkoutLocation(selectedWorkoutLocation === 'home' ? '' : 'home')}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Em Casa
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Sala, quarto, varanda ou qualquer espaço em casa
                      </p>
                      {selectedWorkoutLocation === 'home' && (
                        <Badge className="mt-3 bg-green-600 text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Selecionado
                        </Badge>
                      )}
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedWorkoutLocation === 'gym' 
                        ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : darkMode ? 'border border-gray-600 hover:border-green-400' : 'border border-gray-300 hover:border-green-400'
                    }`}
                    onClick={() => setSelectedWorkoutLocation(selectedWorkoutLocation === 'gym' ? '' : 'gym')}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Na Academia
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Equipamentos completos e ambiente dedicado
                      </p>
                      {selectedWorkoutLocation === 'gym' && (
                        <Badge className="mt-3 bg-green-600 text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Selecionado
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Plano Semanal de Academia */}
              {selectedWorkoutLocation === 'gym' && (
                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Plano Semanal de Academia
                  </h3>
                  
                  {/* Seletor de Dias */}
                  <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
                    <TabsList className={`grid w-full grid-cols-7 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {Object.keys(weeklyGymPlan).map((day) => (
                        <TabsTrigger 
                          key={day} 
                          value={day}
                          className={`text-xs ${darkMode ? 'data-[state=active]:bg-green-600' : 'data-[state=active]:bg-green-500'} data-[state=active]:text-white`}
                        >
                          {day.slice(0, 3)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(weeklyGymPlan).map(([day, workout]) => (
                      <TabsContent key={day} value={day} className="mt-6">
                        <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {workout.name}
                                </CardTitle>
                                <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Foco: {workout.focus.join(', ')}
                                </CardDescription>
                              </div>
                              <div className="text-right">
                                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                  {getDayProgress(day)}%
                                </div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Completo
                                </div>
                              </div>
                            </div>
                            <Progress 
                              value={getDayProgress(day)} 
                              className={`mt-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} 
                            />
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {workout.exercises.map((exercise, index) => {
                                const progress = getExerciseProgress(day, exercise.id)
                                const repsRange = user.goal === 'build_muscle' ? '8-10' : 
                                                user.goal === 'lose_weight' ? '12-15' : '10-12'
                                
                                return (
                                  <Card key={exercise.id} className={`${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'}`}>
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-full ${progress.completed ? 'bg-green-600' : darkMode ? 'bg-gray-500' : 'bg-gray-300'} flex items-center justify-center`}>
                                            {progress.completed ? (
                                              <Check className="w-4 h-4 text-white" />
                                            ) : (
                                              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {index + 1}
                                              </span>
                                            )}
                                          </div>
                                          <div>
                                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                              {exercise.name}
                                            </h4>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                              {exercise.muscle} • {exercise.equipment}
                                            </p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => updateExerciseProgress(day, exercise.id, { completed: !progress.completed })}
                                          className={`${progress.completed ? 'text-green-600 hover:text-green-700' : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                        >
                                          <CheckCircle2 className="w-5 h-5" />
                                        </Button>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Séries Sugeridas
                                          </Label>
                                          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {exercise.sets || '-'}
                                          </div>
                                        </div>
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Reps Sugeridas
                                          </Label>
                                          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {exercise.reps ? repsRange : exercise.duration ? `${exercise.duration}s` : '-'}
                                          </div>
                                        </div>
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Peso Sugerido
                                          </Label>
                                          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {exercise.weight ? `${exercise.weight}kg` : '-'}
                                          </div>
                                        </div>
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Descanso
                                          </Label>
                                          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {exercise.rest ? `${exercise.rest}s` : '-'}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Registro de Performance */}
                                      <div className="grid grid-cols-3 gap-2 mb-3">
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Peso Usado
                                          </Label>
                                          <Input
                                            type="number"
                                            placeholder="kg"
                                            value={progress.actualWeight || ''}
                                            onChange={(e) => updateExerciseProgress(day, exercise.id, { actualWeight: parseFloat(e.target.value) })}
                                            className={`h-8 text-xs ${darkMode ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                          />
                                        </div>
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Reps Feitas
                                          </Label>
                                          <Input
                                            type="number"
                                            placeholder="reps"
                                            value={progress.actualReps || ''}
                                            onChange={(e) => updateExerciseProgress(day, exercise.id, { actualReps: parseInt(e.target.value) })}
                                            className={`h-8 text-xs ${darkMode ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                          />
                                        </div>
                                        <div>
                                          <Label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Séries Feitas
                                          </Label>
                                          <Input
                                            type="number"
                                            placeholder="sets"
                                            value={progress.actualSets || ''}
                                            onChange={(e) => updateExerciseProgress(day, exercise.id, { actualSets: parseInt(e.target.value) })}
                                            className={`h-8 text-xs ${darkMode ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* Timer de Descanso */}
                                      {exercise.rest && (
                                        <div className="flex items-center gap-2">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => startTimer(exercise.rest!, 'rest')}
                                            className={`text-xs ${darkMode ? 'border-gray-500 text-gray-300 hover:bg-gray-500' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                          >
                                            <Timer className="w-3 h-3 mr-1" />
                                            Iniciar Descanso
                                          </Button>
                                          {timerActive && timerType === 'rest' && (
                                            <div className={`text-sm font-mono ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                              {formatTime(timerSeconds)}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              )}

              {/* Questionário Médico */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg font-semibold`}>
                    Histórico de Saúde
                  </Label>
                  <Button
                    variant="outline"
                    onClick={() => setShowMedicalQuestionnaire(!showMedicalQuestionnaire)}
                    className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {showMedicalQuestionnaire ? 'Ocultar' : 'Preencher'} Questionário
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showMedicalQuestionnaire ? 'rotate-180' : ''}`} />
                  </Button>
                </div>

                {showMedicalQuestionnaire && (
                  <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <CardContent className="p-6 space-y-6">
                      <Alert className={`${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className={`${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                          <strong>Importante:</strong> Estas informações são essenciais para sua segurança durante os exercícios. 
                          Sempre consulte um médico antes de iniciar qualquer programa de exercícios.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div>
                          <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 block font-medium`}>
                            Você possui alguma condição médica ou problema de saúde?
                          </Label>
                          <RadioGroup 
                            value={user.medicalHistory?.hasConditions ? 'yes' : 'no'} 
                            onValueChange={(value) => setUser(prev => ({
                              ...prev,
                              medicalHistory: {
                                ...prev.medicalHistory!,
                                hasConditions: value === 'yes'
                              }
                            }))}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no_conditions" />
                              <Label htmlFor="no_conditions" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Não, não possuo nenhuma condição médica
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="has_conditions" />
                              <Label htmlFor="has_conditions" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Sim, possuo condições médicas
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {user.medicalHistory?.hasConditions && (
                          <div className="space-y-4 pl-6 border-l-2 border-yellow-400">
                            <div>
                              <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block`}>
                                Quais condições médicas você possui?
                              </Label>
                              <Textarea
                                placeholder="Ex: Hipertensão, diabetes, problemas cardíacos, artrite..."
                                value={user.medicalHistory?.conditions.join(', ') || ''}
                                onChange={(e) => setUser(prev => ({
                                  ...prev,
                                  medicalHistory: {
                                    ...prev.medicalHistory!,
                                    conditions: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                                  }
                                }))}
                                className={`${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>

                            <div>
                              <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block`}>
                                Medicamentos em uso
                              </Label>
                              <Textarea
                                placeholder="Liste todos os medicamentos que você toma regularmente..."
                                value={user.medicalHistory?.medications.join(', ') || ''}
                                onChange={(e) => setUser(prev => ({
                                  ...prev,
                                  medicalHistory: {
                                    ...prev.medicalHistory!,
                                    medications: e.target.value.split(',').map(m => m.trim()).filter(m => m)
                                  }
                                }))}
                                className={`${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>

                            <div>
                              <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block`}>
                                Alergias conhecidas
                              </Label>
                              <Textarea
                                placeholder="Alergias a medicamentos, alimentos, materiais..."
                                value={user.medicalHistory?.allergies.join(', ') || ''}
                                onChange={(e) => setUser(prev => ({
                                  ...prev,
                                  medicalHistory: {
                                    ...prev.medicalHistory!,
                                    allergies: e.target.value.split(',').map(a => a.trim()).filter(a => a)
                                  }
                                }))}
                                className={`${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block`}>
                            Lesões ou cirurgias recentes
                          </Label>
                          <Textarea
                            placeholder="Descreva qualquer lesão, cirurgia ou limitação física..."
                            value={user.medicalHistory?.injuries.join(', ') || ''}
                            onChange={(e) => setUser(prev => ({
                              ...prev,
                              medicalHistory: {
                                ...prev.medicalHistory!,
                                injuries: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                              }
                            }))}
                            className={`${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                          />
                        </div>

                        <div>
                          <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block`}>
                            Data do último check-up médico
                          </Label>
                          <Input
                            type="date"
                            value={user.medicalHistory?.lastCheckup || ''}
                            onChange={(e) => setUser(prev => ({
                              ...prev,
                              medicalHistory: {
                                ...prev.medicalHistory!,
                                lastCheckup: e.target.value
                              }
                            }))}
                            className={`${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="doctorApproval"
                            checked={user.medicalHistory?.doctorApproval || false}
                            onChange={(e) => setUser(prev => ({
                              ...prev,
                              medicalHistory: {
                                ...prev.medicalHistory!,
                                doctorApproval: e.target.checked
                              }
                            }))}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="doctorApproval" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Tenho aprovação médica para praticar exercícios físicos
                          </Label>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            setUser(prev => ({ ...prev, workoutLocation: selectedWorkoutLocation }))
                            setShowMedicalQuestionnaire(false)
                          }}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Informações
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Lista de Treinos */}
              {selectedWorkoutLocation !== 'gym' && (
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedWorkoutLocation 
                      ? `Treinos para ${selectedWorkoutLocation === 'outdoor' ? 'Ar Livre' : selectedWorkoutLocation === 'home' ? 'Casa' : 'Academia'}`
                      : 'Todos os Treinos'
                    }
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                      <Card key={workout.id} className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:border-green-400' : 'bg-white border-gray-200 hover:border-green-400'} transition-colors cursor-pointer`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className={`${
                              workout.location === 'outdoor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              workout.location === 'home' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            }`}>
                              {workout.location === 'outdoor' ? '🌳 Ar Livre' : 
                               workout.location === 'home' ? '🏠 Casa' : '🏋️ Academia'}
                            </Badge>
                            <Badge variant="outline" className={`${darkMode ? 'border-gray-500 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                              {workout.difficulty === 'beginner' ? 'Iniciante' : 
                               workout.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                            </Badge>
                          </div>
                          
                          <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {workout.name}
                          </h4>
                          
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                            {workout.category} • {workout.duration} min • {workout.exercises.length} exercícios
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            {workout.exercises.slice(0, 2).map((exercise, index) => (
                              <div key={exercise.id} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                • {exercise.name}
                              </div>
                            ))}
                            {workout.exercises.length > 2 && (
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                +{workout.exercises.length - 2} exercícios
                              </div>
                            )}
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            onClick={() => {
                              setCurrentWorkout(workout)
                              // Aqui você pode adicionar lógica para iniciar o treino
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredWorkouts.length === 0 && selectedWorkoutLocation && (
                    <div className="text-center py-12">
                      <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Search className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nenhum treino encontrado
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        Não encontramos treinos para o local selecionado. Tente escolher outro local ou remover o filtro.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedWorkoutLocation('')}
                        className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        Ver Todos os Treinos
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'} p-6`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Olá, {user.name}! 👋
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.isPremium ? 'Premium Ativo' : 'Versão Gratuita'}
                {user.emailVerified && (
                  <span className="ml-2 inline-flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">Verificado</span>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            {!user.isPremium && (
              <Button
                onClick={() => setCurrentView('plans')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Premium
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setCurrentView('profile')}
              className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Streak</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.streak}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>dias consecutivos</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Treinos</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.totalWorkouts}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>completados</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>IMC</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.bmi?.toFixed(1)}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {user.bmi && user.bmi < 18.5 ? 'Abaixo do peso' : 
                     user.bmi && user.bmi < 25 ? 'Normal' : 
                     user.bmi && user.bmi < 30 ? 'Sobrepeso' : 'Obesidade'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nível</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.level}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>fitness level</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => setCurrentView('workouts')}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-center gap-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <Dumbbell className="w-6 h-6 text-green-400" />
            <span>Treinos</span>
          </Button>
          <Button
            onClick={() => setCurrentView('nutrition')}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-center gap-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <UtensilsCrossed className="w-6 h-6 text-green-400" />
            <span>Nutrição</span>
          </Button>
          <Button
            onClick={() => setCurrentView('challenge')}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-center gap-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <Target className="w-6 h-6 text-green-400" />
            <span>Desafio</span>
          </Button>
          <Button
            onClick={() => setCurrentView('progress')}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-center gap-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span>Progresso</span>
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Workout */}
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Dumbbell className="w-5 h-5 text-green-400" />
                Treino de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.isPremium ? (
                <div className="space-y-4">
                  <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Treino de Peito e Tríceps</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>60 minutos • Intermediário</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Progress value={0} className={`flex-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>0/8 exercícios</span>
                    </div>
                    <Button 
                      onClick={() => setCurrentView('workouts')}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Treino
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Treinos Premium</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
                    Desbloqueie treinos personalizados com upgrade
                  </p>
                  <Button
                    onClick={() => setCurrentView('plans')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Premium
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Nutrition Summary */}
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <UtensilsCrossed className="w-5 h-5 text-green-400" />
                Nutrição Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.isPremium ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {dailyCalories}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        / {user.tdee} kcal
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-green-400`}>
                        {dailyMacros.protein}g
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Proteína
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-blue-400`}>
                        {dailyMacros.carbs}g
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Carbos
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Meta Calórica</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {Math.round((dailyCalories / (user.tdee || 1)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.round((dailyCalories / (user.tdee || 1)) * 100)} 
                      className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} 
                    />
                  </div>
                  <Button 
                    onClick={() => setCurrentView('nutrition')}
                    variant="outline" 
                    className={`w-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Refeição
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Dieta Personalizada</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
                    Plano nutricional com IA disponível no Premium
                  </p>
                  <Button
                    onClick={() => setCurrentView('plans')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Premium
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Challenge Section */}
        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Target className="w-5 h-5 text-green-400" />
              Desafio Calistênico 30 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentChallenge.currentDay}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      / {currentChallenge.duration} dias
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Progresso</span>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentChallenge.progress}%
                      </span>
                    </div>
                    <Progress 
                      value={currentChallenge.progress} 
                      className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} 
                    />
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {currentChallenge.description}
                </p>
                <Button 
                  onClick={() => setCurrentView('challenge')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continuar Desafio
                </Button>
              </div>
              <div className="space-y-3">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Exercícios de Hoje:</h4>
                {currentChallenge.exercises.slice(0, 3).map((exercise, index) => (
                  <div key={exercise.id} className={`flex items-center gap-3 p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
                      <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {exercise.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exercise.reps ? `${exercise.reps} repetições` : `${exercise.duration}s`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Renderização principal baseada no estado atual
  if (showOnboarding) {
    return renderOnboarding()
  }

  if (!isAuthenticated) {
    return (
      <>
        {renderLandingPage()}
        {showLogin && renderLoginModal()}
        {showRegister && renderRegisterModal()}
        {showEmailVerification && renderEmailVerificationModal()}
      </>
    )
  }

  if (currentView === 'plans') {
    return renderPlansPage()
  }

  if (showPlanSelection) {
    return renderPlanSelection()
  }

  if (currentView === 'dashboard') {
    return renderDashboard()
  }

  if (currentView === 'workouts') {
    return renderWorkoutsPage()
  }

  // Placeholder para outras views
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentView('dashboard')}
            className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            {!user.isPremium && (
              <Button
                onClick={() => setCurrentView('plans')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Premium
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentView === 'nutrition' && 'Nutrição'}
              {currentView === 'challenge' && 'Desafio Calistênico'}
              {currentView === 'progress' && 'Progresso'}
              {currentView === 'profile' && 'Perfil'}
              {currentView === 'payments' && 'Pagamentos'}
              {currentView === 'admin' && 'Administração'}
            </CardTitle>
            <CardDescription className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Esta seção será expandida com recursos completos em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Você está visualizando a seção: <strong className="text-green-400">{currentView}</strong>
            </p>
            {!user.isPremium && currentView !== 'profile' && (
              <div className={`mt-4 p-4 ${darkMode ? 'bg-green-900 border border-green-700' : 'bg-green-50 border border-green-200'} rounded-lg`}>
                <div className="flex items-center gap-2 text-green-600">
                  <Lock className="w-4 h-4" />
                  <span className="font-medium">Recursos limitados na versão gratuita</span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-green-200' : 'text-green-700'} mt-1`}>
                  Faça upgrade para Premium e tenha acesso completo a todos os recursos
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}