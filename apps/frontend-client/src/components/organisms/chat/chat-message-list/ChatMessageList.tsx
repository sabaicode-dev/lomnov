// "use client";
// import Image from "next/image";

// interface ChatMessageProps {
//   message: string;
//   profile: string
//   timestamp: string;
//   isCurrentUser: boolean;
// }

// export function ChatMessageList({ message, timestamp, isCurrentUser , profile }: ChatMessageProps) {
//   return (
//     <div className={`flex ${isCurrentUser ? 'justify-end':  'justify-start'} items-center`}>
//       <div className="pr-2">
//       {!isCurrentUser && <Image src={profile} alt={profile} className="rounded-full object-cover" width={40} height={40} />}
//       </div>
//       <div 
//         className={`
//           max-w-[50%] p-3 rounded-2xl
//           ${isCurrentUser 
//             ?'bg-orange-500 text-white'
//             :'bg-gray-100 text-gray-900 border border-gray-100'}
//           transform transition-all duration-200 hover:scale-[1.02]
//         `}
//       >
//         {message}
//         <div className={`
//           text-xs mt-1 
//           ${isCurrentUser ? 'text-orange-100' : 'text-gray-300'}
//         `}>
//           {new Date(timestamp).toLocaleTimeString()}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";

interface ChatMessageProps {
  message: string;
  profile: string;
  timestamp: string;
  isCurrentUser: boolean;
  type?: 'text' | 'image' | 'video'; // New type
  onClick?: () => void; 
}

export function ChatMessageList({ message, timestamp, isCurrentUser, profile, type = 'text', onClick }: ChatMessageProps) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-start mb-4`} onClick={onClick}>
      {!isCurrentUser && (
        <Image src={profile} alt="User Profile" className="w-10 h-10 rounded-full mr-3 object-cover" width={40} height={40} />
      )}
      <div className={`max-w-xs p-3 rounded-lg shadow-md ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
        {type === 'text' && <p>{message}</p>}
        {type === 'image' && <img src={message} alt="Sent Image" className="rounded-md max-w-full" />}
        {type === 'video' && <video controls className="rounded-md max-w-full" src={message} />}
        <span className={`text-xs mt-1 block ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
