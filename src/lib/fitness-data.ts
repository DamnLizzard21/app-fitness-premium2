import { Exercise, Recipe, Challenge, Achievement } from './fitness-types'

// Calisthenics Exercises Database
export const calisthenicsExercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexão de Braço',
    category: 'calisthenics',
    muscleGroups: ['peito', 'tríceps', 'ombros', 'core'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Posicione-se em prancha com as mãos na largura dos ombros',
      'Mantenha o corpo reto da cabeça aos pés',
      'Desça o corpo até o peito quase tocar o chão',
      'Empurre de volta à posição inicial',
      'Mantenha o core contraído durante todo o movimento'
    ],
    tips: [
      'Não deixe os quadris caírem',
      'Mantenha os cotovelos próximos ao corpo',
      'Respire inspirando na descida e expirando na subida'
    ]
  },
  {
    id: '2',
    name: 'Pull-up',
    category: 'calisthenics',
    muscleGroups: ['latíssimo', 'bíceps', 'romboides', 'trapézio'],
    equipment: ['barra fixa'],
    difficulty: 'intermediate',
    instructions: [
      'Segure a barra com pegada pronada, mãos na largura dos ombros',
      'Pendure-se com os braços totalmente estendidos',
      'Puxe o corpo para cima até o queixo passar da barra',
      'Desça controladamente até a posição inicial',
      'Mantenha o core ativado'
    ],
    tips: [
      'Evite balançar o corpo',
      'Foque em puxar com as costas, não apenas com os braços',
      'Se for difícil, use elásticos para assistência'
    ]
  },
  {
    id: '3',
    name: 'Agachamento',
    category: 'calisthenics',
    muscleGroups: ['quadríceps', 'glúteos', 'isquiotibiais', 'panturrilhas'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Fique em pé com os pés na largura dos ombros',
      'Desça como se fosse sentar em uma cadeira',
      'Mantenha o peso nos calcanhares',
      'Desça até as coxas ficarem paralelas ao chão',
      'Suba empurrando pelos calcanhares'
    ],
    tips: [
      'Mantenha o peito erguido',
      'Não deixe os joelhos passarem da ponta dos pés',
      'Mantenha os joelhos alinhados com os pés'
    ]
  },
  {
    id: '4',
    name: 'Dips',
    category: 'calisthenics',
    muscleGroups: ['tríceps', 'peito', 'ombros'],
    equipment: ['barras paralelas'],
    difficulty: 'intermediate',
    instructions: [
      'Segure as barras paralelas e se suspenda',
      'Mantenha o corpo reto e ligeiramente inclinado para frente',
      'Desça flexionando os cotovelos até 90 graus',
      'Empurre de volta à posição inicial',
      'Mantenha os ombros estáveis'
    ],
    tips: [
      'Não desça muito para evitar lesões no ombro',
      'Mantenha os cotovelos próximos ao corpo',
      'Se for difícil, use os pés para apoio'
    ]
  },
  {
    id: '5',
    name: 'Prancha',
    category: 'calisthenics',
    muscleGroups: ['core', 'ombros', 'glúteos'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Posicione-se em prancha sobre os antebraços',
      'Mantenha o corpo reto da cabeça aos pés',
      'Contraia o core e os glúteos',
      'Mantenha a respiração normal',
      'Segure a posição pelo tempo determinado'
    ],
    tips: [
      'Não deixe os quadris caírem ou subirem',
      'Mantenha o pescoço neutro',
      'Comece com 30 segundos e aumente gradualmente'
    ]
  },
  {
    id: '6',
    name: 'Burpee',
    category: 'calisthenics',
    muscleGroups: ['corpo todo'],
    equipment: [],
    difficulty: 'advanced',
    instructions: [
      'Comece em pé',
      'Agache e coloque as mãos no chão',
      'Salte os pés para trás em posição de prancha',
      'Faça uma flexão (opcional)',
      'Salte os pés de volta e pule com os braços para cima'
    ],
    tips: [
      'Mantenha um ritmo constante',
      'Foque na técnica, não na velocidade',
      'Modifique removendo o salto se necessário'
    ]
  },
  {
    id: '7',
    name: 'Pike Push-up',
    category: 'calisthenics',
    muscleGroups: ['ombros', 'tríceps', 'core'],
    equipment: [],
    difficulty: 'intermediate',
    instructions: [
      'Comece em posição de prancha',
      'Levante os quadris formando um V invertido',
      'Desça a cabeça em direção ao chão',
      'Empurre de volta à posição inicial',
      'Mantenha as pernas retas'
    ],
    tips: [
      'Foque no trabalho dos ombros',
      'Mantenha o core contraído',
      'Progressão para handstand push-up'
    ]
  },
  {
    id: '8',
    name: 'Pistol Squat',
    category: 'calisthenics',
    muscleGroups: ['quadríceps', 'glúteos', 'core', 'equilíbrio'],
    equipment: [],
    difficulty: 'advanced',
    instructions: [
      'Fique em pé em uma perna só',
      'Estenda a outra perna para frente',
      'Agache na perna de apoio',
      'Desça o máximo possível mantendo o equilíbrio',
      'Suba de volta à posição inicial'
    ],
    tips: [
      'Use apoio nas mãos se necessário',
      'Trabalhe a mobilidade do tornozelo',
      'Comece com agachamentos em uma perna com apoio'
    ]
  }
]

// Healthy Recipes Database
export const healthyRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Panqueca Proteica de Aveia',
    description: 'Panqueca rica em proteínas, perfeita para o café da manhã pós-treino',
    ingredients: [
      { id: '1', foodId: '1', food: { id: '1', name: 'Aveia em flocos', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, category: 'carbs' }, quantity: 50, unit: 'g' },
      { id: '2', foodId: '2', food: { id: '2', name: 'Whey Protein', calories: 400, protein: 80, carbs: 6, fat: 4, category: 'protein' }, quantity: 30, unit: 'g' },
      { id: '3', foodId: '3', food: { id: '3', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, category: 'fruit' }, quantity: 100, unit: 'g' },
      { id: '4', foodId: '4', food: { id: '4', name: 'Ovo', calories: 155, protein: 13, carbs: 1.1, fat: 11, category: 'protein' }, quantity: 50, unit: 'g' },
      { id: '5', foodId: '5', food: { id: '5', name: 'Canela', calories: 247, protein: 4, carbs: 81, fat: 1.2, category: 'other' }, quantity: 2, unit: 'g' }
    ],
    instructions: [
      'Bata todos os ingredientes no liquidificador até formar uma massa homogênea',
      'Aqueça uma frigideira antiaderente em fogo médio',
      'Despeje a massa na frigideira formando panquecas pequenas',
      'Cozinhe por 2-3 minutos de cada lado até dourar',
      'Sirva com frutas vermelhas ou mel'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: 'easy',
    category: 'breakfast',
    tags: ['proteico', 'pós-treino', 'sem glúten', 'rápido'],
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8,
      fiber: 6
    },
    rating: 4.8
  },
  {
    id: '2',
    name: 'Smoothie Verde Detox',
    description: 'Smoothie nutritivo e refrescante, rico em vitaminas e minerais',
    ingredients: [
      { id: '6', foodId: '6', food: { id: '6', name: 'Espinafre', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'vegetable' }, quantity: 50, unit: 'g' },
      { id: '7', foodId: '7', food: { id: '7', name: 'Abacaxi', calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1, category: 'fruit' }, quantity: 100, unit: 'g' },
      { id: '8', foodId: '8', food: { id: '8', name: 'Gengibre', calories: 80, protein: 1.8, carbs: 18, fat: 0.8, category: 'other' }, quantity: 5, unit: 'g' },
      { id: '9', foodId: '9', food: { id: '9', name: 'Água de coco', calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, category: 'other' }, quantity: 200, unit: 'ml' },
      { id: '10', foodId: '10', food: { id: '10', name: 'Limão', calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, category: 'fruit' }, quantity: 30, unit: 'g' }
    ],
    instructions: [
      'Lave bem o espinafre e o gengibre',
      'Descasque e corte o abacaxi em pedaços',
      'Esprema o limão',
      'Bata todos os ingredientes no liquidificador',
      'Sirva imediatamente com gelo'
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    category: 'snack',
    tags: ['detox', 'vegano', 'antioxidante', 'hidratante'],
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 28,
      fat: 1,
      fiber: 4
    },
    rating: 4.5
  },
  {
    id: '3',
    name: 'Salada de Quinoa com Frango',
    description: 'Salada completa e nutritiva, ideal para almoço ou jantar',
    ingredients: [
      { id: '11', foodId: '11', food: { id: '11', name: 'Quinoa', calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, category: 'carbs' }, quantity: 80, unit: 'g' },
      { id: '12', foodId: '12', food: { id: '12', name: 'Peito de frango', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'protein' }, quantity: 120, unit: 'g' },
      { id: '13', foodId: '13', food: { id: '13', name: 'Tomate cereja', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: 'vegetable' }, quantity: 100, unit: 'g' },
      { id: '14', foodId: '14', food: { id: '14', name: 'Pepino', calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, category: 'vegetable' }, quantity: 80, unit: 'g' },
      { id: '15', foodId: '15', food: { id: '15', name: 'Azeite extra virgem', calories: 884, protein: 0, carbs: 0, fat: 100, category: 'fat' }, quantity: 15, unit: 'ml' }
    ],
    instructions: [
      'Cozinhe a quinoa em água fervente por 15 minutos',
      'Tempere e grelhe o peito de frango',
      'Corte os tomates cereja ao meio',
      'Corte o pepino em cubos',
      'Misture todos os ingredientes e tempere com azeite, sal e limão'
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'medium',
    category: 'lunch',
    tags: ['completo', 'proteico', 'sem glúten', 'nutritivo'],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 38,
      fat: 16,
      fiber: 5
    },
    rating: 4.7
  }
]

// 30-Day Calisthenics Challenge
export const calisthenicsChallenge: Challenge = {
  id: '1',
  name: 'Desafio 30 Dias Calistenia',
  description: 'Transforme seu corpo em 30 dias com exercícios de peso corporal progressivos',
  type: 'workout',
  duration: 30,
  difficulty: 'intermediate',
  exercises: calisthenicsExercises.slice(0, 6), // First 6 exercises
  dailyGoal: 'Complete o treino do dia com foco na técnica perfeita',
  rewards: ['Badge Calistenia Master', '500 pontos XP', '7 dias Premium grátis'],
  participants: 15420
}

// Achievements Database
export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Primeira Semana',
    description: 'Complete 7 dias consecutivos de treino',
    icon: '🏃‍♀️',
    category: 'streak',
    requirement: {
      type: 'streak',
      value: 7,
      unit: 'days'
    },
    reward: {
      type: 'points',
      value: 100
    }
  },
  {
    id: '2',
    name: 'Sequência de Ferro',
    description: 'Mantenha uma sequência de 30 dias',
    icon: '🔥',
    category: 'streak',
    requirement: {
      type: 'streak',
      value: 30,
      unit: 'days'
    },
    reward: {
      type: 'premium_days',
      value: 7
    }
  },
  {
    id: '3',
    name: 'Centurião',
    description: 'Complete 100 treinos',
    icon: '💪',
    category: 'workout',
    requirement: {
      type: 'count',
      value: 100,
      unit: 'workouts'
    },
    reward: {
      type: 'badge',
      value: 1
    }
  },
  {
    id: '4',
    name: 'Primeiro PR',
    description: 'Estabeleça seu primeiro recorde pessoal',
    icon: '🏆',
    category: 'workout',
    requirement: {
      type: 'count',
      value: 1,
      unit: 'personal_records'
    },
    reward: {
      type: 'points',
      value: 200
    }
  },
  {
    id: '5',
    name: 'Nutricionista',
    description: 'Complete 30 dias de registro nutricional',
    icon: '🥗',
    category: 'nutrition',
    requirement: {
      type: 'count',
      value: 30,
      unit: 'nutrition_logs'
    },
    reward: {
      type: 'points',
      value: 300
    }
  },
  {
    id: '6',
    name: 'Transformação',
    description: 'Perca 5kg ou ganhe 3kg de massa muscular',
    icon: '⚖️',
    category: 'progress',
    requirement: {
      type: 'weight',
      value: 5,
      unit: 'kg'
    },
    reward: {
      type: 'premium_days',
      value: 14
    }
  }
]

// Sample workout plans for different levels
export const workoutPlans = {
  beginner: {
    name: 'Iniciante - Fundamentos',
    description: 'Programa de 4 semanas para iniciantes em calistenia',
    exercises: ['Flexão de Braço', 'Agachamento', 'Prancha', 'Caminhada'],
    duration: 4,
    daysPerWeek: 3
  },
  intermediate: {
    name: 'Intermediário - Progressão',
    description: 'Programa de 6 semanas para desenvolvimento',
    exercises: ['Pull-up', 'Dips', 'Pike Push-up', 'Pistol Squat'],
    duration: 6,
    daysPerWeek: 4
  },
  advanced: {
    name: 'Avançado - Maestria',
    description: 'Programa de 8 semanas para atletas experientes',
    exercises: ['Muscle-up', 'Handstand Push-up', 'One Arm Push-up', 'Human Flag'],
    duration: 8,
    daysPerWeek: 5
  }
}

// Nutrition tips and facts
export const nutritionTips = [
  'Beba pelo menos 2 litros de água por dia',
  'Consuma proteína em todas as refeições',
  'Inclua vegetais coloridos no seu prato',
  'Evite alimentos ultraprocessados',
  'Faça refeições a cada 3-4 horas',
  'Consuma carboidratos complexos',
  'Não pule o café da manhã',
  'Mastigue bem os alimentos'
]

// Motivational quotes
export const motivationalQuotes = [
  'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
  'Seu corpo pode fazer isso. É sua mente que você precisa convencer.',
  'A disciplina é escolher entre o que você quer agora e o que você quer mais.',
  'Não se trata de ser perfeito, se trata de ser melhor que ontem.',
  'O único treino ruim é aquele que não aconteceu.',
  'Sua única competição é quem você foi ontem.',
  'Força não vem da capacidade física. Vem da vontade indomável.',
  'O corpo alcança o que a mente acredita.'
]