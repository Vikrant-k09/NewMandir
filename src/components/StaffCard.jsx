import React from 'react';

const StaffCard = ({ staff }) => {
  return (
    <div className="bg-[#FFF8E7] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#F4C95D] p-6 max-w-xs w-full mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center">
        <img
          src={staff.image}
          alt={staff.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-[#F4C95D] mb-4 shadow-inner"
        />
        <h3 className="text-2xl font-semibold text-[#872341]">{staff.name}</h3>
        <p className="text-sm text-[#E67E22] font-medium">{staff.role}</p>
        <p className="mt-3 text-sm text-[#6B4226]">{staff.description}</p>
      </div>
    </div>
  );
};

export default StaffCard;
