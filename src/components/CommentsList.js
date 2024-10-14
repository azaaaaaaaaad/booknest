'use client'
import { useState,useEffect } from 'react';
import Comment from './Comment';
import Link from "next/link";
import { useSession  } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommentsList = ({id}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { data: session, status } = useSession();

   const router = useRouter();

  const [visibleCommentCount, setVisibleCommentCount] = useState(2);
  // Load more comments
  const loadMoreComments = () => {
    setVisibleCommentCount(visibleCommentCount + 3); // Show 3 more comments each time
  };


  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${baseUrl}/api/comments?blogId=${id}`);
      const data = await response.json();
      
      setComments(data);
          };
    fetchComments();
  }, [baseUrl,id]);

  const handleCommentSubmit =async (e) => {
    e.preventDefault();
    const commentData = { text: newComment,email:session.user.email,username:session.user.name,blogId:id};
    
    const response = await fetch(`${baseUrl}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    const data = await response.json();
    setComments([...comments, { ...commentData, _id: data._id }]);
    setNewComment('');
    if (response.ok) {
        router.refresh();
        
      } else {
        throw new Error("Failed to create a comment");
      }


  };

  console.log("check-status",status);

  return (
    <div className="comments-list p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="w-full">
      <h1 className="text-xl font-bold mb-4">Comments</h1>

      {!session?.user ? (
          <Link href="/login">
            <button className="btn btn-ghost text-xl">
              login
            </button>
          </Link>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-[200px]"
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Comment
        </button>
      </form>


        )} 
      
      </div>
      <div className="comment-section w-full">
      
      {comments?.length>0 && comments.slice(0, visibleCommentCount).map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}

      {visibleCommentCount < comments.length && (
        <button  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"

        onClick={loadMoreComments}>Load More Comments</button>

        
      )}

    </div>
    </div>
  );
};

export default CommentsList;