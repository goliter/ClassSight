import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoProps {
  email: string;
  phone: string;
  office: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone, office }) => {
  return (
    <div className="bg-white dark:bg-[oklch(0.205_0_0)] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">联系方式</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-3" />
          <span>{email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-400 mr-3" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-400 mr-3" />
          <span>{office}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;