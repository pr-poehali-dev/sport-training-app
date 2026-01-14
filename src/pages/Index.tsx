import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Exercise {
  id: number;
  name: string;
  weight: number;
  sets: number;
  reps: number;
}

interface WorkoutHistory {
  id: number;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

interface AthleteParams {
  weight: number;
  height: number;
  age: number;
  gender: string;
  chest: number;
  waist: number;
  arm: number;
}

interface NotificationSettings {
  enabled: boolean;
  workoutTime: string;
  motivationalMessages: boolean;
  restDayReminders: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: true,
    workoutTime: '18:00',
    motivationalMessages: true,
    restDayReminders: true,
  });

  const motivationalQuotes = [
    '💪 Сегодня отличный день для тренировки!',
    '🔥 Каждая тренировка приближает тебя к цели!',
    '⚡ Сила не приходит от побед. Она приходит от борьбы!',
    '🎯 Твои мышцы растут, когда ты отдыхаешь, но сила воли — когда ты тренируешься!',
    '🏆 Единственная плохая тренировка — это та, которой не было!',
  ];

  useEffect(() => {
    if (notificationSettings.motivationalMessages && !todayCompleted) {
      const timer = setTimeout(() => {
        setShowMotivation(true);
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        toast.success(randomQuote, {
          duration: 5000,
          position: 'top-center',
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (notificationSettings.enabled) {
      const checkWorkoutTime = setInterval(() => {
        const now = new Date();
        const [hours, minutes] = notificationSettings.workoutTime.split(':');
        if (now.getHours() === parseInt(hours) && now.getMinutes() === parseInt(minutes)) {
          toast('⏰ Время тренировки!', {
            description: 'Не забудь выполнить план на сегодня',
            duration: 10000,
          });
        }
      }, 60000);
      return () => clearInterval(checkWorkoutTime);
    }
  }, [notificationSettings]);

  const [todayWorkout] = useState<Exercise[]>([
    { id: 1, name: 'Жим штанги лежа', weight: 80, sets: 4, reps: 10 },
    { id: 2, name: 'Приседания со штангой', weight: 100, sets: 4, reps: 8 },
    { id: 3, name: 'Становая тяга', weight: 120, sets: 3, reps: 6 },
    { id: 4, name: 'Тяга верхнего блока', weight: 60, sets: 3, reps: 12 },
    { id: 5, name: 'Жим гантелей на наклонной', weight: 30, sets: 3, reps: 10 },
  ]);

  const [workoutHistory] = useState<WorkoutHistory[]>([
    {
      id: 1,
      date: '2026-01-10',
      exercises: [
        { id: 1, name: 'Жим штанги лежа', weight: 75, sets: 4, reps: 10 },
        { id: 2, name: 'Приседания со штангой', weight: 95, sets: 4, reps: 8 },
      ],
      completed: true,
    },
    {
      id: 2,
      date: '2026-01-07',
      exercises: [
        { id: 1, name: 'Становая тяга', weight: 115, sets: 3, reps: 6 },
        { id: 2, name: 'Тяга штанги в наклоне', weight: 60, sets: 4, reps: 10 },
      ],
      completed: true,
    },
  ]);

  const [athleteParams, setAthleteParams] = useState<AthleteParams>({
    weight: 78,
    height: 180,
    age: 28,
    gender: 'male',
    chest: 105,
    waist: 85,
    arm: 38,
  });

  const weightProgressData = [
    { week: 'Нед 1', weight: 82 },
    { week: 'Нед 2', weight: 80 },
    { week: 'Нед 3', weight: 79 },
    { week: 'Нед 4', weight: 78 },
  ];

  const exerciseProgressData = [
    { exercise: 'Жим', weight: 70 },
    { exercise: 'Присед', weight: 90 },
    { exercise: 'Тяга', weight: 110 },
  ];

  const workoutCompletionData = [
    { week: 'Нед 1', completed: 3 },
    { week: 'Нед 2', completed: 4 },
    { week: 'Нед 3', completed: 3 },
    { week: 'Нед 4', completed: 4 },
  ];

  const handleCompleteWorkout = () => {
    setTodayCompleted(true);
    toast.success('🎉 Отличная работа!', {
      description: 'Тренировка завершена. Не забудь восстановиться!',
      duration: 5000,
    });
  };

  const updateAthleteParam = (field: keyof AthleteParams, value: string | number) => {
    setAthleteParams(prev => ({ ...prev, [field]: value }));
  };

  const updateNotificationSetting = (field: keyof NotificationSettings, value: boolean | string) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const totalWorkouts = workoutHistory.filter(w => w.completed).length;
  const weeklyGoal = 4;
  const progress = (totalWorkouts / weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Dumbbell" size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">FitTrack Pro</h1>
            </div>
            <Badge variant="secondary" className="gap-2">
              <Icon name="Trophy" size={16} />
              {totalWorkouts} тренировок
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1">
            <TabsTrigger value="today" className="gap-2 py-2.5">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">План</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2 py-2.5">
              <Icon name="LineChart" size={16} />
              <span className="hidden sm:inline">Отчеты</span>
            </TabsTrigger>
            <TabsTrigger value="params" className="gap-2 py-2.5">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Параметры</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2 py-2.5">
              <Icon name="History" size={16} />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 py-2.5">
              <Icon name="Award" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 py-2.5">
              <Icon name="Bell" size={16} />
              <span className="hidden sm:inline">Уведомления</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">План на сегодня</h2>
                  <p className="text-muted-foreground">14 января 2026</p>
                </div>
                {todayCompleted && (
                  <Badge className="gap-2 bg-green-500 hover:bg-green-600">
                    <Icon name="CheckCircle2" size={16} />
                    Завершено
                  </Badge>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">№</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Упражнение</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">Вес (кг)</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">Подходы</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">Повторения</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayWorkout.map((exercise, index) => (
                      <tr key={exercise.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 text-muted-foreground">{index + 1}</td>
                        <td className="py-4 px-4 font-medium">{exercise.name}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant="outline">{exercise.weight}</Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant="outline">{exercise.sets}</Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant="outline">{exercise.reps}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button 
                  onClick={handleCompleteWorkout} 
                  disabled={todayCompleted}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Icon name="Check" size={20} />
                  {todayCompleted ? 'Тренировка завершена' : 'Завершить тренировку'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Динамика веса тела
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Прогресс рабочего веса
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exerciseProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="exercise" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="weight" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Завершенные тренировки
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="params" className="space-y-4 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Параметры спортсмена</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weight">Масса тела (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={athleteParams.weight}
                    onChange={(e) => updateAthleteParam('weight', parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Рост (см)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={athleteParams.height}
                    onChange={(e) => updateAthleteParam('height', parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Возраст</Label>
                  <Input
                    id="age"
                    type="number"
                    value={athleteParams.age}
                    onChange={(e) => updateAthleteParam('age', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Пол</Label>
                  <Select value={athleteParams.gender} onValueChange={(value) => updateAthleteParam('gender', value)}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Мужской</SelectItem>
                      <SelectItem value="female">Женский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chest">Обхват груди (см)</Label>
                  <Input
                    id="chest"
                    type="number"
                    value={athleteParams.chest}
                    onChange={(e) => updateAthleteParam('chest', parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waist">Обхват талии (см)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={athleteParams.waist}
                    onChange={(e) => updateAthleteParam('waist', parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arm">Обхват руки (см)</Label>
                  <Input
                    id="arm"
                    type="number"
                    value={athleteParams.arm}
                    onChange={(e) => updateAthleteParam('arm', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <Button className="mt-6 w-full gap-2" size="lg">
                <Icon name="Save" size={20} />
                Сохранить параметры
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">История тренировок</h2>
              
              <div className="space-y-4">
                {workoutHistory.map((workout) => (
                  <Card key={workout.id} className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Calendar" size={20} className="text-primary" />
                        <span className="font-medium">{new Date(workout.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      {workout.completed && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Icon name="CheckCircle2" size={14} />
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise) => (
                        <div key={exercise.id} className="text-sm text-muted-foreground">
                          {exercise.name}: {exercise.weight} кг × {exercise.sets} подхода × {exercise.reps} повторений
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={40} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Спортсмен</h2>
                  <p className="text-muted-foreground">{athleteParams.age} лет • {athleteParams.height} см • {athleteParams.weight} кг</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Прогресс недели</span>
                    <span className="text-sm text-muted-foreground">{totalWorkouts}/{weeklyGoal} тренировок</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-muted/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Flame" size={20} className="text-primary" />
                      <span className="text-sm font-medium">Серия</span>
                    </div>
                    <p className="text-2xl font-bold">7 дней</p>
                  </Card>

                  <Card className="p-4 bg-muted/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Target" size={20} className="text-primary" />
                      <span className="text-sm font-medium">Всего</span>
                    </div>
                    <p className="text-2xl font-bold">{totalWorkouts} тренировок</p>
                  </Card>
                </div>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-3">
                    <Icon name="Trophy" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Достижение разблокировано!</p>
                      <p className="text-sm text-muted-foreground">Первая неделя завершена</p>
                    </div>
                  </div>
                </Card>

                {showMotivation && (
                  <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-scale-in">
                    <div className="flex items-center gap-3">
                      <Icon name="Sparkles" size={24} className="text-primary" />
                      <div>
                        <p className="font-semibold">Мотивация дня</p>
                        <p className="text-sm text-muted-foreground">
                          {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 animate-fade-in">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Bell" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Уведомления</h2>
                  <p className="text-muted-foreground">Настройте напоминания о тренировках</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="BellRing" size={18} className="text-primary" />
                      <Label htmlFor="notifications-enabled" className="text-base font-medium cursor-pointer">
                        Включить уведомления
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Получать напоминания о тренировках</p>
                  </div>
                  <Switch
                    id="notifications-enabled"
                    checked={notificationSettings.enabled}
                    onCheckedChange={(checked) => updateNotificationSetting('enabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-time" className="flex items-center gap-2">
                    <Icon name="Clock" size={18} className="text-primary" />
                    Время тренировки
                  </Label>
                  <Input
                    id="workout-time"
                    type="time"
                    value={notificationSettings.workoutTime}
                    onChange={(e) => updateNotificationSetting('workoutTime', e.target.value)}
                    disabled={!notificationSettings.enabled}
                  />
                  <p className="text-sm text-muted-foreground">Ежедневное напоминание в выбранное время</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Sparkles" size={18} className="text-primary" />
                      <Label htmlFor="motivational" className="text-base font-medium cursor-pointer">
                        Мотивационные сообщения
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Получать вдохновляющие цитаты</p>
                  </div>
                  <Switch
                    id="motivational"
                    checked={notificationSettings.motivationalMessages}
                    onCheckedChange={(checked) => updateNotificationSetting('motivationalMessages', checked)}
                    disabled={!notificationSettings.enabled}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Moon" size={18} className="text-primary" />
                      <Label htmlFor="rest-day" className="text-base font-medium cursor-pointer">
                        Напоминания о днях отдыха
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Уведомления о важности восстановления</p>
                  </div>
                  <Switch
                    id="rest-day"
                    checked={notificationSettings.restDayReminders}
                    onCheckedChange={(checked) => updateNotificationSetting('restDayReminders', checked)}
                    disabled={!notificationSettings.enabled}
                  />
                </div>

                <Card className="p-4 bg-muted/30">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Как работают уведомления?</p>
                      <p className="text-sm text-muted-foreground">
                        Напоминания помогут не пропустить тренировку. Мотивационные сообщения появляются случайным образом, чтобы вдохновить вас на новые достижения.
                      </p>
                    </div>
                  </div>
                </Card>

                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={() => toast.success('✅ Настройки сохранены', { duration: 3000 })}
                >
                  <Icon name="Save" size={20} />
                  Сохранить настройки
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;