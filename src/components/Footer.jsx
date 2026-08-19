import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Globe, HelpCircle } from 'lucide-react';
import { HelpSupportModal } from './HelpSupportModal';

export const Footer = () => {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <footer className="bg-[#1C1917] text-[#A8A29E] pt-16 pb-8 border-t border-[#44403C]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#0D9488] p-2 flex items-center justify-center text-white">
                <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#FAFAF9]">
                Digital Life Lessons
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              A premium wisdom-sharing platform dedicated to preserving personal insights, encouraging mindful reflection, and fostering community growth.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {/* X Logo (New Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#292524] hover:bg-[#059669] text-[#FAFAF9] flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#292524] hover:bg-[#059669] text-[#FAFAF9] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-base">f</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#292524] hover:bg-[#059669] text-[#FAFAF9] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-base">in</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAFAF9] mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#FAFAF9] transition-colors">Home Page</Link></li>
              <li><Link to="/lessons" className="hover:text-[#FAFAF9] transition-colors">Public Lessons</Link></li>
              <li><Link to="/pricing" className="hover:text-[#FAFAF9] transition-colors">Pricing & Membership</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#FAFAF9] transition-colors">User Dashboard</Link></li>
              <li><Link to="/dashboard/add-lesson" className="hover:text-[#FAFAF9] transition-colors">Create Life Lesson</Link></li>
              <li>
                <button
                  onClick={() => setHelpOpen(true)}
                  className="text-left text-[#059669] hover:underline font-semibold flex items-center space-x-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help & Feedback</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAFAF9] mb-4">
              Wisdom Domains
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/lessons?category=Personal+Growth" className="hover:text-[#FAFAF9] transition-colors">Personal Growth</Link></li>
              <li><Link to="/lessons?category=Career" className="hover:text-[#FAFAF9] transition-colors">Career Acceleration</Link></li>
              <li><Link to="/lessons?category=Relationships" className="hover:text-[#FAFAF9] transition-colors">Meaningful Relationships</Link></li>
              <li><Link to="/lessons?category=Mindset" className="hover:text-[#FAFAF9] transition-colors">Mindset & Resilience</Link></li>
              <li><Link to="/lessons?category=Mistakes+Learned" className="hover:text-[#FAFAF9] transition-colors">Mistakes Learned</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAFAF9] mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#059669]" />
                <span>support@digitallifelessons.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#059669]" />
                <span>+880 (1700) 000-000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#059669]" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <div className="pt-4 flex items-center space-x-4 text-xs">
              <span className="hover:text-[#FAFAF9] cursor-pointer">Terms & Conditions</span>
              <span>•</span>
              <span className="hover:text-[#FAFAF9] cursor-pointer">Privacy Policy</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} Digital Life Lessons. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for wisdom seekers worldwide.</span>
          </p>
        </div>

      </div>

      {/* Help & Support Modal */}
      <HelpSupportModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </footer>
  );
};
