export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'lead' | 'active' | 'inactive';
  createdAt: string;
}

export interface InsuranceProduct {
  id: string;
  name: string;
  type: 'life' | 'health' | 'auto' | 'property';
  premium: number;
  status: 'active' | 'pending' | 'cancelled';
  clientId: string;
  startDate: string;
  endDate: string;
}

export interface DashboardStats {
  totalClients: number;
  totalLeads: number;
  activeProducts: number;
  monthlyRevenue: number;
}