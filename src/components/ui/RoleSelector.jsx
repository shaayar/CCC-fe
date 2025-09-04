import React from 'react';
import { Building, Users, GraduationCap } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'institute', label: 'Institute', icon: Building },
  { id: 'campus_ambassador', label: 'Campus Ambassador', icon: Users }
];

const RoleSelector = ({ selectedRole, onRoleChange, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    <label className="block text-sm font-medium" style={{ color: '#12122b' }}>
      Select Role
    </label>
    <div className="grid grid-cols-1 gap-3">
      {roles.map((role) => {
        const IconComponent = role.icon;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 ${selectedRole === role.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-white hover:border-orange-300'
              }`}
            style={{
              borderColor: selectedRole === role.id ? '#ffa21f' : '#c2c2c2',
              backgroundColor: selectedRole === role.id ? '#fffae5' : 'white'
            }}
          >
            <IconComponent
              size={20}
              style={{ color: selectedRole === role.id ? '#ffa21f' : '#2d2d2d' }}
            />
            <span
              className="font-medium"
              style={{ color: selectedRole === role.id ? '#12122b' : '#2d2d2d' }}
            >
              {role.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default RoleSelector;