import React from 'react';
import { XCircle } from 'lucide-react';

const RoleSelector = ({ value, onChange, error }) => {
  const roles = [
    { value: 'student', label: 'Student', description: 'Access courses and learning materials' },
    { value: 'campus_ambassador', label: 'Campus Ambassador', description: 'Represent and promote programs' },
    { value: 'institute', label: 'Institute', description: 'Manage courses and students' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#2d2d2d]">
        Select Your Role
      </label>
      <div className="grid gap-3">
        {roles.map((role) => (
          <div
            key={role.value}
            onClick={() => onChange(role.value)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${value === role.value
                ? 'border-[#ffa21f] bg-[#ffa21f]/5 ring-2 ring-[#ffa21f]/20'
                : 'border-[#c2c2c2] hover:border-[#ffa21f]/50'
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${value === role.value
                    ? 'border-[#ffa21f] bg-[#ffa21f]'
                    : 'border-[#c2c2c2]'
                  }`}
              >
                {value === role.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="font-medium text-[#2d2d2d]">{role.label}</div>
                <div className="text-sm text-[#c2c2c2]">{role.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <XCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default RoleSelector;