// /* eslint-disable @next/next/no-img-element */
// import React, { useState, useRef } from "react";
// import { FaHeart, FaRegHeart, FaComment, FaPaperPlane, FaSave } from "react-icons/fa";

// interface Comment {
//   _id: string;
//   author: { _id: string; userName: string; profileImage: string };
//   content: string;
// }

// interface Post {
//   _id: string;
//   content: string; // Video URL
//   description: string;
//   likes: string[]; // Array of user IDs who liked the post
//   comments: Comment[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   author: { _id: string; profileImage: string; userName: string }; // User info for the post author
// }

// interface VideoPlayProps {
//   post: Post;
//   currentUserId: string;
// }

// const VideoPlay: React.FC<VideoPlayProps> = ({ post, currentUserId }) => {
//   const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
//   const [muted, setMuted] = useState<boolean>(true);
//   const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({}); // Track play state per video
//   const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

//   const handleLike = (postId: string) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [postId]: !prevLikes[postId],
//     }));
//   };

//   const toggleMute = () => {
//     setMuted(!muted);
//   };

//   const handleSave = (postId: string) => {
//     console.log(`Post ${postId} saved`);
//   };

//   const handleShare = (postId: string) => {
//     console.log(`Post ${postId} shared`);
//   };

//   const togglePlay = (postId: string) => {
//     // Debug: Log the videoRefs.current to see if the video element is properly stored
//     console.log(videoRefs.current);
  
//     // Pause all videos except the clicked one
//     Object.keys(videoRefs.current).forEach((id) => {
//       const videoElement = videoRefs.current[id];
//       if (videoElement && id !== postId) {
//         console.log(`Pausing video with postId: ${id}`);
//         videoElement.pause(); // Pause the other videos
//       }
//     });
  
//     // Toggle play/pause for the clicked video
//     const videoElement = videoRefs.current[postId];
//     if (videoElement) {
//       if (isPlaying[postId]) {
//         console.log(`Pausing video with postId: ${postId}`);
//         videoElement.pause(); // Pause if it's already playing
//       } else {
//         console.log(`Playing video with postId: ${postId}`);
//         videoElement.play(); // Play if it's paused
//       }
  
//       // Update the isPlaying state to track the play/pause status
//       setIsPlaying((prevState) => ({
//         ...prevState,
//         [postId]: !prevState[postId], // Toggle the play state for this video
//       }));
//     }
//   };
  

//   return (
//     <div className="relative max-w-sm h-auto max-h-[500px] flex justify-center items-center overflow-hidden mb-8">
//       {/* Video Section */}
//       <div className="relative w-full min-h-[500px] flex justify-center items-center">
//         <video
//           ref={(el) => {
//             if (el) {
//               videoRefs.current[post._id] = el;
//             }
//           }}
//           className="min-h-full object-cover"
//           muted={muted}
//           controls={false}
//           onClick={() => togglePlay(post._id)} // Toggle play/pause on click
//         >
//           <source src={post.content} />
//           Your browser does not support the video tag.
//         </video>

//         {/* Mute/Unmute Button */}
//         <div
//           className="absolute bottom-6 right-6 bg-black bg-opacity-50 p-2 rounded-full text-white cursor-pointer"
//           onClick={toggleMute}
//         >
//           {muted ? "🔇" : "🔊"}
//         </div>
//       </div>

//       {/* Interaction Buttons */}
//       <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col items-center space-y-6">
//         {/* Like Button */}
//         <button
//           className="text-white text-xl flex flex-col items-center"
//           onClick={() => handleLike(post._id)}
//         >
//           {likes[post._id] ? (
//             <FaHeart className="text-red-500" />
//           ) : (
//             <FaRegHeart />
//           )}
//           <span className="block text-xs">{post.likes.length}</span>
//         </button>

//         {/* Comment Button */}
//         <button className="text-white text-xl flex flex-col items-center">
//           <FaComment />
//           <span className="block text-xs">{post.comments.length}</span>
//         </button>

//         {/* Save Button */}
//         <button
//           className="text-white text-xl"
//           onClick={() => handleSave(post._id)}
//         >
//           <FaSave />
//         </button>

//         {/* Share Button */}
//         <button
//           className="text-white text-xl"
//           onClick={() => handleShare(post._id)}
//         >
//           <FaPaperPlane />
//         </button>
//       </div>

//       {/* Video Description and User Details at Bottom */}
//       <div className="absolute bottom-2 left-0 p-4 text-white">
//         <div className="flex items-center space-x-2">
//           <img
//             src={post.author.profileImage}
//             alt={post.author.userName}
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="font-semibold">{post.author.userName}</span>
//         </div>
//         <h3 className="text-sm mt-2">{post.description}</h3>
//       </div>
//     </div>
//   );
// };

// export default VideoPlay;
