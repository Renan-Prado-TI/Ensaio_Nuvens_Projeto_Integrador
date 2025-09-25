import React from 'react';
import { UserIcon, EnvelopeIcon, LinkedinIcon, GithubIcon } from './Icons';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  email: string;
  linkedin?: string;
  github?: string;
  image?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  description,
  email, 
  linkedin, 
  github,
  image 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-6">
        <div className="flex flex-col items-center">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-100"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <UserIcon className="w-16 h-16 text-purple-600" />
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-purple-600 font-medium">{role}</p>
          <p className="text-sm text-gray-500 text-center mt-2 mb-4">{description}</p>
          
          <div className="flex space-x-4">
            <a 
              href={`mailto:${email}`}
              className="text-gray-500 hover:text-purple-600 transition-colors"
              aria-label="Email"
            >
              <EnvelopeIcon className="w-6 h-6" />
            </a>
            
            {linkedin && (
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            )}
            
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
