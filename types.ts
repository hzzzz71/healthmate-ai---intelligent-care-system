
export enum HealthStatus {
  STABLE = '稳定',
  WARNING = '临界值',
  ALERT = '异常',
  NORMAL = '正常'
}

export interface UserProfile {
  name: string;
  id: string;
  birthday: string;
  avatar: string;
  role: 'doctor' | 'patient';
}

export interface LabResult {
  label: string;
  value: string;
  unit: string;
  status: HealthStatus;
  icon: string;
}

export interface TodoItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'appointment' | 'medication';
  done: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
