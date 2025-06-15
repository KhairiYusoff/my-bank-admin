'use client'

import React from 'react'

interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No data available',
  className = '',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 flex justify-center items-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-w-full bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={keyExtractor(row)}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}
                >
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
