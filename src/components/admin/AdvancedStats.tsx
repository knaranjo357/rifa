import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Puesto } from '../../types';

interface AdvancedStatsProps {
  puestos: Puesto[];
  preciosPuesto: number;
}

export function AdvancedStats({ puestos, preciosPuesto }: AdvancedStatsProps) {
  const chartData = useMemo(() => {
    const now = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyData = last30Days.map(date => {
      const dayPuestos = puestos.filter(p => 
        p.fechaVenta && p.fechaVenta.startsWith(date)
      );
      const vendidos = dayPuestos.length;
      const pagados = dayPuestos.filter(p => p.estado === 'pagado').length;

      return {
        date,
        vendidos,
        pagados,
        ingresos: pagados * preciosPuesto
      };
    });

    return dailyData;
  }, [puestos, preciosPuesto]);

  const weeklyData = useMemo(() => {
    const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    return weeks.map((week, index) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (4 - index) * 7);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);

      const weekPuestos = puestos.filter(p => {
        if (!p.fechaVenta) return false;
        const fecha = new Date(p.fechaVenta);
        return fecha >= startDate && fecha < endDate;
      });

      return {
        week,
        vendidos: weekPuestos.length,
        pagados: weekPuestos.filter(p => p.estado === 'pagado').length,
        ingresos: weekPuestos.filter(p => p.estado === 'pagado').length * preciosPuesto
      };
    });
  }, [puestos, preciosPuesto]);

  const pieData = [
    { name: 'Disponibles', value: puestos.filter(p => p.estado === 'disponible').length, color: '#6B7280' },
    { name: 'Vendidos', value: puestos.filter(p => p.estado === 'vendido').length, color: '#F59E0B' },
    { name: 'Pagados', value: puestos.filter(p => p.estado === 'pagado').length, color: '#10B981' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-blue-100">Hoy</p>
              <p className="text-2xl font-bold">
                {chartData[chartData.length - 1]?.vendidos || 0}
              </p>
              <p className="text-sm text-blue-100">Vendidos</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-green-100">Esta Semana</p>
              <p className="text-2xl font-bold">
                {weeklyData[weeklyData.length - 1]?.vendidos || 0}
              </p>
              <p className="text-sm text-green-100">Vendidos</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-purple-100">Total Clientes</p>
              <p className="text-2xl font-bold">
                {new Set(puestos.filter(p => p.cliente).map(p => p.cliente)).size}
              </p>
              <p className="text-sm text-purple-100">Únicos</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-yellow-100">Ingresos Hoy</p>
              <p className="text-2xl font-bold">
                ${(chartData[chartData.length - 1]?.ingresos || 0).toLocaleString()}
              </p>
              <p className="text-sm text-yellow-100">COP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Ventas Diarias (Últimos 30 días)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).getDate().toString()}
                stroke="#6B7280"
              />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="vendidos" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="pagados" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Ventas Semanales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="vendidos" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pagados" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Distribución de Estados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl border">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Ingresos Semanales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="ingresos" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}