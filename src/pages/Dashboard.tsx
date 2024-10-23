import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserPlus, FileCheck, DollarSign } from 'lucide-react';
import { getClients, getProducts } from '../services/airtable';
import type { Client, InsuranceProduct, DashboardStats } from '../types';

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalLeads: 0,
    activeProducts: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clients, products] = await Promise.all([getClients(), getProducts()]);
      
      setStats({
        totalClients: clients.filter(c => c.status === 'active').length,
        totalLeads: clients.filter(c => c.status === 'lead').length,
        activeProducts: products.filter(p => p.status === 'active').length,
        monthlyRevenue: products
          .filter(p => p.status === 'active')
          .reduce((acc, curr) => acc + curr.premium, 0),
      });
    };

    fetchData();
  }, []);

  const cards = [
    { title: 'Total Clientes', value: stats.totalClients, icon: Users, color: 'blue' },
    { title: 'Leads', value: stats.totalLeads, icon: UserPlus, color: 'green' },
    { title: 'Produtos Ativos', value: stats.activeProducts, icon: FileCheck, color: 'purple' },
    { title: 'Receita Mensal', value: `R$ ${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`p-3 bg-${color}-100 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Vendas Mensais</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { month: 'Jan', value: 4000 },
              { month: 'Fev', value: 3000 },
              { month: 'Mar', value: 5000 },
              { month: 'Abr', value: 4500 },
              { month: 'Mai', value: 6000 },
              { month: 'Jun', value: 5500 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;