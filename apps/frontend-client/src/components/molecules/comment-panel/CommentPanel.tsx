"use client";

import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { CommentResponseType } from "@/libs/types/api-properties/property-response";
import { response } from "express";

const CommentPanel = ({ propertyId }: { propertyId: string }) => {
  const [comments, setComments] = useState<CommentResponseType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Submit new comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      try {
        const response = await axiosInstance.post(`${API_ENDPOINTS.PROPERTIES}/${propertyId}/comment`, {
          comment: newComment,
        });
        console.log("post comment res::", response);
        
        const addedComment: CommentResponseType = response.data;
        setComments([addedComment, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/comment`);
        console.log("Comment Res:::", response);
        
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [propertyId]);

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
          <div key={comment.id} className="flex items-start space-x-4 p-4 rounded-lg shadow-md relative">
            <div className="flex-shrink-0">
              <Image
                src={comment.profile || "/default-avatar.png"} // Add fallback for profile image
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
                <span className="text-gray-600 text-sm">{comment.likeCount || 0}</span>
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
