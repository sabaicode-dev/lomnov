// "use client";
// import { ChevronLeft } from 'lucide-react';
// import Image from 'next/image';

// interface ChatHeaderProps {
//   name: string;
//   profile: string;
//   onBack: () => void;
//   isOnline: boolean;
// }

// export function ChatHeader({ name, profile, onBack, isOnline }: ChatHeaderProps) {
//   return (
//     <div className="p-3 bg-white border-b flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <button onClick={onBack} className="md:hidden">
//           <ChevronLeft />
//         </button>
//         <div className="relative">
//           <Image src={profile} alt={name} className="rounded-full object-cover"width={40}height={40}/>
//           {isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span> }
//         </div>
//         <div>
//           <h3 className="font-semibold">{name}</h3>
//           {isOnline? <span className="text-xs text-green-500">Online</span>:<span className="text-xs text-gray-500">Offline</span>}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  name: string;
  profile: string;
  onBack: () => void;
  isOnline: boolean;
  onMenuClick?: () => void; // Optional menu handler
}

export function ChatHeader({ name, profile, onBack, isOnline, onMenuClick }: ChatHeaderProps) {
  return (
    <div className="p-3 bg-[#d9d9d9] border-b flex items-center justify-between pt-24">
      <div className="flex items-center space-x-3">
        <button onClick={onBack} className="md:hidden">
          <ChevronLeft />
        </button>
        <div className="relative">
          <Image 
          src={profile} 
          alt={name} 
          onError={() => console.error('Profile load error')} 
          className="rounded-full w-14 h-14 object-cover bg-black" 
          width={40} 
          height={40} />
          {isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
        </div>
        <div>
          <h3 className="font-semibold truncate">{name}</h3>
          <span className={`text-xs ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      {onMenuClick && (
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal />
        </button>
      )}
    </div>
  );
}
