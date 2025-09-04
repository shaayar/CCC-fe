import React from 'react';

const AuthHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="text-center mb-8">
    {Icon && (
      <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#ffa21f' }}>
        <Icon size={32} color="#12122b" />
      </div>
    )}
    <h2 className="text-3xl font-bold text-white">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-white opacity-70">
        {subtitle}
      </p>
    )}
  </div>
);

export default AuthHeader;