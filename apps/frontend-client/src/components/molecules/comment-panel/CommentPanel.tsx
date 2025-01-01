
// //Scrollable Comments List
// "use client";

// import React, { useState } from "react";
// import { CiMenuKebab } from "react-icons/ci";
// import { AiOutlineLike } from "react-icons/ai";
// import Profile from "@/images/imgDev/image.png"
// import Image from "next/image";

// const CommentPanel = () => {
//   const [comments, setComments] = useState([
//     { id: 1, text: "This property looks amazing!",profile: Profile, user: "John Doe", datetime: "3 days ago" },
//     { id: 2, text: "Is the price negotiable?",profile: Profile, user: "Jane Smith", datetime: "3 days ago" },
//     { id: 3, text: "Great location.",profile: Profile, user: "Michael Lee", datetime: "3 days ago" },
//     { id: 4, text: "Great price.",profile: Profile, user: "Sarah Kim", datetime: "3 days ago" },
//     { id: 5, text: "I love the design.",profile: Profile, user: "Emily Carter", datetime: "3 days ago" },
//     { id: 6, text: "I'm interested in this property.",profile: Profile, user: "Michael Lee", datetime: "3 days ago" },
//   ]);
//   const [newComment, setNewComment] = useState("");
//   const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

//   const handleCommentSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newComment.trim() !== "") {
//       const comment = {
//         id: Date.now(),
//       profile: Profile,
//         text: newComment,
//         user: "Anonymous", // Replace with actual user info if available
//         datetime: "Just now",
//       };
//       setComments([comment, ...comments]);
//       setNewComment("");
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-8">
//       <h2 className="text-2xl font-bold mb-4">Comments</h2>
//       <form onSubmit={handleCommentSubmit} className="mb-4">
//         <textarea
//           className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral"
//           placeholder="Write your comments here..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           rows={3}
//         ></textarea>
//         <button
//           type="submit"
//           className="mt-4 bg-olive-drab text-white px-6 py-2 rounded-lg hover:bg-olive-gray transition"
//         >
//           Comment
//         </button>
//       </form>
//       {/* Scrollable Comments List */}
//       <div className="space-y-6 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="relative flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
//           >
//             <div className="flex-shrink-0">
//            <Image
//              src={comment.profile}
//              alt={`${comment.userName}'s profile`}
//              width={48}
//              height={48}
//              className="w-12 h-12 rounded-full object-cover"
//            />
//             </div>
//             <div className="flex-grow">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{comment.user}</p>
//                 <p className="text-sm text-gray-500">{comment.datetime}</p>
//               </div>
//               <p className="text-gray-700 mt-2">{comment.text}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <AiOutlineLike className="text-gray-700 hover:text-blue-500 cursor-pointer" />
//                 <span className="text-gray-600 text-sm">20</span> {/* Example like count */}
//               </div>
//             </div>
//             {/* Menu Icon */}
//             <CiMenuKebab
//               className="text-[16px] text-black cursor-pointer"
//               onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}
//             />
//             {menuOpenId === comment.id && (
//               <div className="absolute w-[150px] top-10 right-0 border border-gray-300 bg-white shadow-md rounded-md py-2 px-2 z-10 transition-all duration-200">
//                 <button
//                   className="block w-full text-center mb-2 text-sm text-white py-1 px-4 bg-olive-green hover:bg-olive-gray rounded-md"
//                   onClick={() => console.log("Edit clicked")}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="block w-full text-center text-sm text-white py-1 px-4 bg-red-500 hover:bg-red-400 rounded-md"
//                   onClick={() => console.log("Delete clicked")}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentPanel;



//View all button
"use client";

import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import Profile from "@/images/imgDev/image.png"
import Image from "next/image";

const CommentPanel = () => {
  const [comments, setComments] = useState([
    { id: 1, text: "This property looks amazing!",profile: Profile, userName: "Teang Smith", datetime: "3 days ago" },
    { id: 2, text: "Is the price negotiable?",profile: Profile, userName: "Smith", datetime: "3 days ago" },
    { id: 3, text: "Great location.",profile: Profile, userName: "sokphol", datetime: "3 days ago" },
    { id: 4, text: "Great price.",profile: Profile, userName: "Sarah Kim", datetime: "3 days ago" },
    { id: 5, text: "I love the design.",profile: Profile, userName: "Emily Carter", datetime: "3 days ago" },
    { id: 6, text: "I'm interested in this property.",profile: Profile, userName: "sokphol", datetime: "3 days ago" },
    { id: 7, text: "This property looks amazing",profile: Profile, userName: "Teang Smith", datetime: "3 days ago" },
    { id: 8, text: "Is the price negotiable?",profile: Profile, userName: "Jane", datetime: "3 days ago" },
    { id: 9, text: "Great location.",profile: Profile, userName: "Michael", datetime: "3 days ago" },
    { id: 10, text: "Great price.",profile: Profile, userName: "Sarah", datetime: "3 days ago" },
    { id: 11, text: "I love the design.",profile: Profile, userName: "Emily", datetime: "3 days ago" },
    { id: 12, text: "I'm interested in this property.",profile: Profile, userName: "Michael", datetime: "3 days ago" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now(),
        text: newComment,
        profile: Profile,
        userName: "Anonymous",
        datetime: "Just now",
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, comments.length));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral"
          placeholder="Write your comments here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        ></textarea>
        <button type="submit" className="mt-4 bg-olive-drab text-white px-6 py-2 rounded-lg hover:bg-olive-gray">
          Comment
        </button>
      </form>
      {/* Comments List */}
      <div className="space-y-6">
        {comments.slice(0, visibleCount).map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm relative">
            <div className="flex-shrink-0">
              <Image
                src={comment.profile}
                alt={`${comment.userName}'s profile`}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">{comment.userName}</p>
                <p className="text-sm text-gray-500">{comment.datetime}</p>
              </div>
              <p className="text-gray-700 mt-2">{comment.text}</p>
              <div className="flex items-center gap-2 mt-2">
                <AiOutlineLike className="text-gray-700 hover:text-blue-500 cursor-pointer" />
                <span className="text-gray-600 text-sm">20</span> {/* Example like count */}
              </div>
            </div>
            {/* Menu Icon */}
            <CiMenuKebab
              className="text-[16px] text-black cursor-pointer"
              onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}
            />
            {menuOpenId === comment.id && (
              <div className="absolute w-[150px] top-10 right-0 border border-slate-300 bg-white/90 shadow-md rounded-[8px] py-2 px-2 z-10 transition duration-700 ease-in-out">
                <button
                  className="border-2 mb-2 border-gray-200 text-center block w-full text-white py-1 px-2 bg-olive-green hover:bg-olive-gray rounded-md text-sm"
                  onClick={() => console.log("Update clicked")}
                >
                  Edit
                </button>
                <button
                  className="block w-full border-2 py-1 px-2 text-center bg-red-500 hover:bg-red-400 rounded-md text-sm text-white"
                  onClick={() => console.log("Delete clicked")}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {visibleCount < comments.length && (
          <button onClick={handleViewMore} className="mt-4 text-black hover:underline">
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentPanel;
