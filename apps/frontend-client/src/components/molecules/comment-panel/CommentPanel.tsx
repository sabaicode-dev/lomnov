"use client";

import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Image from "next/image";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { CommentResponseType } from "@/libs/types/api-properties/property-response";
import defaultProfile from "@/images/imgDev/default-profile.jpg";
import { formatDistanceToNow, parseISO } from "date-fns";


const CommentPanel = ({ propertyId }: { propertyId: string }) => {
  const [comments, setComments] = useState<CommentResponseType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  //Handle Fetch comment to display
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axiosInstance.get(
          `${API_ENDPOINTS.PROPERTIES}/${propertyId}/get/comment`
        );
        const fetchedComments = commentsResponse.data;

        const enrichedComments = await Promise.all(
          fetchedComments.map(async (comment: any) => {
            try {
              const userInfoResponse = await axiosInstance.get(
                `${API_ENDPOINTS.USER}/profile-info/${comment.cognitoSub}`
              );
              const userInfo = userInfoResponse.data;

              return {
                ...comment,
                userName: userInfo.userName || "Unknown",
                profile: userInfo.profile?.[0] || defaultProfile,
                likedBy: comment.likedBy || [],
              };
            } catch {
              return {
                ...comment,
                userName: "Unknown",
                profile: defaultProfile,
                likedBy: comment.likedBy || [],
              };
            }
          })
        );

        setComments(enrichedComments);
      } catch {
        console.error("Failed to fetch comments.");
      }
    };

    fetchComments();
  }, [propertyId]);

  //Handle button submit comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axiosInstance.post(
          `${API_ENDPOINTS.PROPERTIES}/${propertyId}/comment`,
          { comment: newComment }
        );
        const newCommentData = response.data;
        const userInfoResponse = await axiosInstance.get(
          `${API_ENDPOINTS.USER}/profile-info/${newCommentData.cognitoSub}`
        );
        const userInfo = userInfoResponse.data;

        const enrichedComment = {
          ...newCommentData,
          userName: userInfo.userName || "Unknown",
          profile: userInfo.profile?.[0] || defaultProfile,
        };

        setComments([enrichedComment, ...comments]);
        setNewComment("");
      } catch {
        console.error("Failed to submit comment.");
      }
    }
  };

  //Handle button view more
  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, comments.length));
  };

  const handleDelete = async (commentId: string) => {
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.PROPERTIES}/comment/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch {
      console.error("Failed to delete comment.");
    }
  };

  //format Datetime
  const formatDatetime = (datetime: string) => {
    return `${formatDistanceToNow(parseISO(datetime))}`;
  };

  //Handle like on the comment
  const handleLike = async (commentId: string) => {
    try {
      const comment = comments.find((comment) => comment._id === commentId);
  
      if (!comment) {
        console.error("Comment not found");
        return;
      }
  
      const userId = comment._id; // Replace with actual user ID
      const hasLiked = comment.likedBy?.includes(userId);
  
      const endpoint = `${API_ENDPOINTS.PROPERTIES}/${propertyId}/comment/${commentId}/like`;
      const method = hasLiked ? "DELETE" : "POST";
  
      await axiosInstance.request({
        url: endpoint,
        method: method,
      });
  
      // Update the state to reflect the change in likes and likedBy
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: hasLiked ? (comment.likes ?? 0) - 1 : (comment.likes ?? 0) + 1,
                likedBy: hasLiked
                  ? comment.likedBy?.filter((id) => id !== userId) // Remove user ID
                  : [...(comment.likedBy || []), userId], // Add user ID
              }
            : comment
        )
      );
    } catch (error: any) {
      console.error("Failed to toggle like:", error.response?.data || error.message);
    }
  };


  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral"
          placeholder="Write your comments here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-olive-drab text-white px-6 py-2 rounded-lg hover:bg-olive-gray"
        >
          Comment
        </button>
      </form>
      <div className="space-y-6">
        {comments.slice(0, visibleCount).map((comment) => (
          <div
            key={comment._id}
            className="flex items-start space-x-4 p-4 rounded-lg  shadow-md relative"
          >
            <Image
              src={comment.profile ?? defaultProfile}
              alt={`${comment.userName}'s profile`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-700">{comment.userName}</p>
                <p className="text-sm text-gray-500">{formatDatetime(comment.datetime)}</p>
              </div>
              <p className="mt-1 text-gray-600">{comment.comment}</p>
              <div
                className="flex items-center gap-2 mt-2 text-gray-500 cursor-pointer"
                onClick={() => handleLike(comment._id)}
              >
                {comment.likedBy?.includes(comment._id) ? ( 
                  <AiFillLike className="hover:text-blue-500" />
                ) : (
                  <AiOutlineLike className="hover:text-blue-500" />
                )}
                <span>{comment.likes ?? 0}</span>
              </div>
            </div>
            <CiMenuKebab
              className="text-gray-700 cursor-pointer"
              onClick={() => setMenuOpenId(menuOpenId === comment._id ? null : comment._id)}
            />
            {menuOpenId === comment._id && (
              <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-10">
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => console.log("Edit functionality to be implemented")}
                >
                  Edit
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {visibleCount < comments.length && (
          <button
            onClick={handleViewMore}
            className="mt-4 text-olive-drab hover:underline"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentPanel;


