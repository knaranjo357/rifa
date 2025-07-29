import React from 'react';
import { Download, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { Puesto } from '../../types';

interface DataManagerProps {
  puestos: Puesto[];
  onImportData: (data: Puesto[]) => void;
}

export function DataManager({ puestos, onImportData }: DataManagerProps) {
  const exportData = () => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: puestos
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rifa-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const importedData = JSON.parse(result);
        
        if (importedData.data && Array.isArray(importedData.data)) {
          onImportData(importedData.data);
          alert('Datos importados exitosamente');
        } else {
          throw new Error('Formato de archivo inválido');
        }
      } catch (error) {
        alert('Error al importar los datos. Verifique el formato del archivo.');
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl border">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Download className="text-blue-600" size={24} />
          Exportar Datos
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="text-blue-800 font-medium">¿Qué se incluye en la exportación?</p>
              <ul className="text-blue-700 text-sm mt-1 space-y-1">
                <li>• Todos los puestos y su estado actual</li>
                <li>• Información de clientes y contactos</li>
                <li>• Fechas de venta y pago</li>
                <li>• Metadatos de respaldo</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={exportData}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Descargar Respaldo Completo
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl border">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Upload className="text-green-600" size={24} />
          Importar Datos
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
            <div>
              <p className="text-yellow-800 font-medium">Advertencia importante</p>
              <p className="text-yellow-700 text-sm mt-1">
                La importación reemplazará todos los datos actuales. Asegúrese de tener un respaldo antes de continuar.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-import"
          />
          <label
            htmlFor="file-import"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload size={20} />
            Seleccionar Archivo de Respaldo
          </label>
        </div>

        <p className="text-gray-500 text-sm mt-3 text-center">
          Solo archivos .json generados por este sistema
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 border">
        <h4 className="font-semibold text-gray-800 mb-3">Estadísticas del Sistema</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total de puestos:</p>
            <p className="font-semibold">100</p>
          </div>
          <div>
            <p className="text-gray-600">Puestos con datos:</p>
            <p className="font-semibold">{puestos.filter(p => p.cliente || p.estado !== 'disponible').length}</p>
          </div>
          <div>
            <p className="text-gray-600">Clientes únicos:</p>
            <p className="font-semibold">{new Set(puestos.filter(p => p.cliente).map(p => p.cliente)).size}</p>
          </div>
          <div>
            <p className="text-gray-600">Última modificación:</p>
            <p className="font-semibold">
              {puestos.find(p => p.fechaVenta || p.fechaPago) 
                ? new Date(Math.max(...puestos.filter(p => p.fechaVenta || p.fechaPago).map(p => new Date(p.fechaVenta || p.fechaPago || 0).getTime()))).toLocaleDateString()
                : 'Sin datos'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}