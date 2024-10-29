// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react"; // Import signIn and signOut for session management
// import Swal from "sweetalert2";

// export default function UserProfile() {
//   const { data: session, status, update } = useSession(); // Include update method from useSession
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (status === "loading") return;

//     if (session?.user?.email) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get(`/api/user/${session.user.email}`);
//           const userData = response.data;
//           setUser(userData);
//           setName(userData.name || "");
//           setEmail(userData.email || "");
//           setImage(userData.image || "");
//           setRole(userData.role || "");
//         } catch (error) {
//           console.error("Error fetching user:", error);
//         }
//       };

//       fetchUser();
//     }
//   }, [session, status]);

//   const handlePhotoUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true);
//       const imgbbResponse = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
//         formData
//       );
//       setImage(imgbbResponse.data.data.url);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Update user on the server
//       const response = await axios.put(`/api/user/${session.user.email}`, {
//         name,
//         image,
//       });

//       // If the update is successful, update the session
//       if (response.status === 200) {
//         // Manually update the session with the new data
//         update({
//           ...session,
//           user: {
//             ...session.user,
//             name: name, // Update name
//             image: image, // Update image
//           },
//         });

//         Swal.fire({
//           icon: "success",
//           title: "User Updated",
//           text: "The user has been successfully updated.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (status === "loading") return <p>Loading session...</p>;
//   if (!session) return <p>Please log in to view your profile.</p>;

//   return (
//     <main className="w-full py-1 mx-auto">
//       <div class="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div class="relative z-20 h-35 md:h-65">
//           <Image
//             width={100}
//             height={100}
//             src={""}
//             alt="profile cover"
//             class="h-40 w-full rounded-tl-sm rounded-tr-sm object-cover"
//           />
//           <div class="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
//             <label
//               for="cover"
//               class="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
//             >
//               <input type="file" name="cover" id="cover" class="sr-only" />
//               <span>
//                 <svg
//                   class="fill-current"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
//                     fill="white"
//                   ></path>
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
//                     fill="white"
//                   ></path>
//                 </svg>
//               </span>
//               <span>Edit</span>
//             </label>
//           </div>
//         </div>
//         <div class="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
//           <div class="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
//             <div class="relative drop-shadow-2">
//               <Image
//                 width={100}
//                 height={100}
//                 src={image}
//                 alt="profile"
//                 className="w-40 h-40"
//               />
//               <label
//                 for="profile"
//                 class="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
//               >
//                 <svg
//                   class="fill-current"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
//                     fill=""
//                   ></path>
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
//                     fill=""
//                   ></path>
//                 </svg>
//                 <input
//                   type="file"
//                   name="profile"
//                   id="profile"
//                   class="sr-only"
//                 />
//               </label>
//             </div>
//           </div>
//           <div class="mt-4">
//             <h3 class="mb-1.5 text-2xl font-medium text-black dark:text-white">
//               Danish Heilium
//             </h3>
//             <p class="font-medium">Ui/Ux Designer</p>
//             <div class="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
//               <div class="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
//                 <span class="font-semibold text-black dark:text-white">
//                   259
//                 </span>
//                 <span class="text-sm">Posts</span>
//               </div>
//               <div class="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
//                 <span class="font-semibold text-black dark:text-white">
//                   129K
//                 </span>
//                 <span class="text-sm">Followers</span>
//               </div>
//               <div class="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
//                 <span class="font-semibold text-black dark:text-white">2K</span>
//                 <span class="text-sm">Following</span>
//               </div>
//             </div>

//             <div class="mx-auto max-w-180">
//               <h4 class="font-medium text-black dark:text-white">About Me</h4>
//               <p class="mt-4.5 text-sm font-normal">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Pellentesque posuere fermentum urna, eu condimentum mauris
//                 tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
//                 ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
//                 pharetra ligula sed, aliquam lacus.
//               </p>
//             </div>

//             <div class="mt-6.5">
//               <h4 class="mb-3.5 font-medium text-black dark:text-white">
//                 Follow me on
//               </h4>
//               <div class="flex items-center justify-center gap-3.5">
//                 <a
//                   href="#"
//                   class="hover:text-primary"
//                   name="social-icon"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     class="fill-current"
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_30_966)">
//                       <path
//                         d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_966">
//                         <rect width="22" height="22" fill="white"></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   class="hover:text-primary"
//                   name="social-icon"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     class="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_30_970)">
//                       <path
//                         d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_970">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.666138)"
//                         ></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   class="hover:text-primary"
//                   name="social-icon"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     class="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_30_974)">
//                       <path
//                         d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_974">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.333862)"
//                         ></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   class="hover:text-primary"
//                   name="social-icon"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     class="fill-current"
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_30_978)">
//                       <path
//                         d="M18.3233 10.6077C18.2481 9.1648 17.7463 7.77668 16.8814 6.61929C16.6178 6.90312 16.3361 7.16951 16.038 7.41679C15.1222 8.17748 14.0988 8.79838 13.0011 9.25929C13.1542 9.58013 13.2945 9.89088 13.4182 10.1842V10.187C13.4531 10.2689 13.4867 10.3514 13.519 10.4345C14.9069 10.2786 16.3699 10.3355 17.788 10.527C17.9768 10.5527 18.1546 10.5802 18.3233 10.6077ZM9.72038 3.77854C10.6137 5.03728 11.4375 6.34396 12.188 7.69271C13.3091 7.25088 14.2359 6.69354 14.982 6.07296C15.2411 5.8595 15.4849 5.62824 15.7117 5.38088C14.3926 4.27145 12.7237 3.66426 11 3.66671C10.5711 3.66641 10.1429 3.70353 9.72038 3.77762V3.77854ZM3.89862 9.16396C4.52308 9.1482 5.1468 9.11059 5.76863 9.05121C7.27163 8.91677 8.7618 8.66484 10.2255 8.29771C9.46051 6.96874 8.63463 5.67578 7.75046 4.42296C6.80603 4.89082 5.97328 5.55633 5.30868 6.37435C4.64409 7.19236 4.16319 8.14374 3.89862 9.16396ZM5.30113 15.6155C5.65679 15.0957 6.12429 14.5109 6.74488 13.8747C8.07771 12.5089 9.65071 11.4455 11.4712 10.8589L11.528 10.8424C11.3768 10.5087 11.2347 10.2108 11.0917 9.93029C9.40871 10.4207 7.63588 10.7269 5.86946 10.8855C5.00779 10.9634 4.23504 10.9973 3.66671 11.0028C3.66509 12.6827 4.24264 14.3117 5.30204 15.6155H5.30113ZM13.7546 17.7971C13.4011 16.0144 12.9008 14.2641 12.2586 12.5639C10.4235 13.2303 8.96138 14.2047 7.83113 15.367C7.375 15.8276 6.97021 16.3362 6.62388 16.8841C7.88778 17.8272 9.42308 18.3356 11 18.3334C11.9441 18.3347 12.8795 18.1533 13.7546 17.799V17.7971ZM15.4715 16.8117C16.9027 15.7115 17.8777 14.1219 18.2096 12.3475C17.898 12.2696 17.5029 12.1917 17.0684 12.1312C16.1023 11.9921 15.1221 11.9819 14.1534 12.101C14.6988 13.6399 15.1392 15.2141 15.4715 16.8126V16.8117ZM11 20.1667C5.93729 20.1667 1.83337 16.0628 1.83337 11C1.83337 5.93729 5.93729 1.83337 11 1.83337C16.0628 1.83337 20.1667 5.93729 20.1667 11C20.1667 16.0628 16.0628 20.1667 11 20.1667Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_978">
//                         <rect width="22" height="22" fill="white"></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   class="hover:text-primary"
//                   name="social-icon"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     class="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_30_982)">
//                       <path
//                         d="M11.6662 1.83337C6.6016 1.83337 2.49951 5.93546 2.49951 11C2.49847 12.9244 3.10343 14.8002 4.22854 16.3613C5.35366 17.9225 6.94181 19.0897 8.76768 19.6974C9.22602 19.7771 9.39743 19.5021 9.39743 19.261C9.39743 19.0438 9.38552 18.3224 9.38552 17.5542C7.08285 17.9786 6.48701 16.9932 6.30368 16.4771C6.2001 16.2131 5.75368 15.4 5.3641 15.1819C5.04326 15.0105 4.58493 14.586 5.35218 14.575C6.07451 14.5631 6.58968 15.2396 6.76201 15.5146C7.58701 16.9006 8.90518 16.511 9.43135 16.2709C9.51202 15.675 9.75218 15.2745 10.0162 15.0453C7.9766 14.8161 5.84535 14.025 5.84535 10.5188C5.84535 9.52146 6.2001 8.69737 6.78493 8.05479C6.69326 7.82562 6.37243 6.88604 6.8766 5.62562C6.8766 5.62562 7.64385 5.38546 9.39743 6.56612C10.1437 6.35901 10.9147 6.25477 11.6891 6.25629C12.4683 6.25629 13.2474 6.35896 13.9808 6.56521C15.7334 5.37354 16.5016 5.62654 16.5016 5.62654C17.0058 6.88696 16.6849 7.82654 16.5933 8.05571C17.1772 8.69737 17.5329 9.51046 17.5329 10.5188C17.5329 14.037 15.3906 14.8161 13.351 15.0453C13.6829 15.3313 13.9698 15.8813 13.9698 16.7411C13.9698 17.9667 13.9579 18.9521 13.9579 19.262C13.9579 19.5021 14.1302 19.7881 14.5885 19.6965C16.4081 19.0821 17.9893 17.9126 19.1094 16.3526C20.2296 14.7926 20.8323 12.9206 20.8329 11C20.8329 5.93546 16.7308 1.83337 11.6662 1.83337Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_982">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.666138)"
//                         ></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import Swal from "sweetalert2";
// import Loader from "@/app/loading";

// export default function UserProfile() {
//   const { data: session, status, update } = useSession();
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (status === "loading") return;

//     if (session?.user?.email) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get(`/api/user/${session.user.email}`);
//           const userData = response.data;
//           setUser(userData);
//           setName(userData.name || "");
//           setEmail(userData.email || "");
//           setImage(userData.image || "");
//           setRole(userData.role || "");
//         } catch (error) {
//           console.error("Error fetching user:", error);
//         }
//       };
//       fetchUser();
//     }
//   }, [session, status]);

// const handlePhotoUpload = async (event) => {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     setLoading(true);
//     const imgbbResponse = await axios.post(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
//       formData
//     );
//     setImage(imgbbResponse.data.data.url);
//     setLoading(false);

//     // Update the user's image on the server
//     await handleSubmit(null, imgbbResponse.data.data.url);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     setLoading(false);
//   }
// };

//   const handleSubmit = async (event, newImage = null) => {
//     if (event) event.preventDefault();

//     try {
//       // Update user on the server
//       const response = await axios.put(`/api/user/${session.user.email}`, {
//         name,
//         image: newImage || image,
//       });

//       // If the update is successful, update the session
//       if (response.status === 200) {
//         // Manually update the session with the new data
//         update({
//           ...session,
//           user: {
//             ...session.user,
//             name: name,
//             image: newImage || image,
//           },
//         });

//         Swal.fire({
//           icon: "success",
//           title: "User Updated",
//           text: "The user has been successfully updated.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

// const handleImageClick = () => {
//   fileInputRef.current.click();
// };

//   if (status === "loading") return <Loader></Loader>;
//   if (!session) return <p>Please log in to view your profile.</p>;

//   return (
//     <main className=" lg:px-40 py-1 mx-auto ">
//       <div className="overflow-hidden">
//         <div className="relative z-20 h-40 md:h-80">
//           <Image
//             src={image || "/placeholder.svg?height=160&width=160"}
//             alt="profile cover"
//             width={1000}
//             height={1000}
//             className="object-cover w-full h-64 md:h-[350px] lg:h-96"
//           />
//           {/* <div className="absolute bottom-4 right-4">
//             <label
//               htmlFor="cover"
//               className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handlePhotoUpload}
//                 accept="image/*"
//               />
//               <span onClick={handleImageClick}>Edit Cover</span>
//             </label>
//           </div> */}
//           {loading && <Loader></Loader>}
//         </div>
//         <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
//           <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-background p-1 lg:backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
// <div className="relative drop-shadow-2">
//   <Image
//     width={1000}
//     height={1000}
//     src={image || "/placeholder.svg?height=160&width=160"}
//     alt="profile"
//     className="w-40 h-40 rounded-full object-cover cursor-pointer mx-auto"
//     onClick={handleImageClick}
//   />
//   <input
//     type="file"
//     ref={fileInputRef}
//     className="hidden"
//     onChange={handlePhotoUpload}
//     accept="image/*"
//   />
//   {loading && (
//     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//     </div>
//   )}
// </div>
//           </div>
//           <div className="mt-4 text-start md:w-1/3 lg:w-[30%] mx-auto">
//             {/* <h3 className="mb-1.5 text-2xl font-semibold text-foreground">{name}</h3> */}

//             <form
//               className="items-center text-[#202142] w-full mx-auto flex justify-center"
//               onSubmit={handleSubmit}
//             >
//               <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
//                 <div className="w-full">
//                   <label className="mb-8 font-semibold">User Name:</label>
//                   <input
//                     type="text"
//                     id="first_name"
//                     className=" text-black font-medium  text-sm rounded-l-lg focus:[#F65D4E]  focus:border-indigo-500 block w-full p-2.5"
//                     placeholder="Your first name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="">
//                 <button
//                   type="submit"
//                   className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-r-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>

//             <p className="font-medium text-muted-foreground mb-2 -mt-2">
//               <span className="font-semibold mr-2">Email:</span>
//               {email}
//             </p>
//             <p className="font-medium text-muted-foreground">
//               <span className="font-semibold mr-2">Role:</span> {role}
//             </p>
//             {/* <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border py-2.5 shadow-1">
//               <div className="flex flex-col items-center justify-center gap-1 border-r px-4">
//                 <span className="font-semibold text-foreground">259</span>
//                 <span className="text-sm text-muted-foreground">Posts</span>
//               </div>
//               <div className="flex flex-col items-center justify-center gap-1 border-r px-4">
//                 <span className="font-semibold text-foreground">129K</span>
//                 <span className="text-sm text-muted-foreground">Followers</span>
//               </div>
//               <div className="flex flex-col items-center justify-center gap-1 px-4">
//                 <span className="font-semibold text-foreground">2K</span>
//                 <span className="text-sm text-muted-foreground">Following</span>
//               </div>
//             </div> */}

//             {/* <div className="mt-6.5">
//               <h4 className="mb-3.5 font-medium text-foreground">
//                 Follow me on
//               </h4>
//               <div className="flex items-center justify-center gap-3.5">
//                 <a
//                   href="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_966)">
//                       <path
//                         d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_966">
//                         <rect width="22" height="22" fill="white"></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_970)">
//                       <path
//                         d="M20.9813 5.18472C20.2815 5.49427 19.5393 5.69757 18.7795 5.78789C19.5804 5.30887 20.1798 4.55498 20.4661 3.66672C19.7145 4.11405 18.8904 4.42755 18.0315 4.59714C17.4545 3.97984 16.6898 3.57044 15.8562 3.43259C15.0225 3.29474 14.1667 3.43617 13.4218 3.83489C12.6768 4.2336 12.0845 4.86726 11.7368 5.63736C11.3891 6.40746 11.3056 7.27085 11.4993 8.0933C9.97497 8.0169 8.48376 7.62078 7.12247 6.93066C5.76118 6.24054 4.56024 5.27185 3.59762 4.08747C3.25689 4.67272 3.07783 5.33801 3.07879 6.01522C3.07879 7.34439 3.75529 8.51864 4.78379 9.20614C4.17513 9.18697 3.57987 9.0226 3.04762 8.72672V8.77439C3.04781 9.65961 3.35413 10.5175 3.91465 11.2027C4.47517 11.8878 5.2554 12.3581 6.12304 12.5336C5.55802 12.6868 4.96557 12.7093 4.39054 12.5996C4.63517 13.3616 5.11196 14.028 5.75417 14.5055C6.39637 14.983 7.17182 15.2477 7.97196 15.2626C7.17673 15.8871 6.2662 16.3488 5.29243 16.6212C4.31866 16.8936 3.30074 16.9714 2.29688 16.8502C4.04926 17.9772 6.08921 18.5755 8.17271 18.5735C15.2246 18.5735 19.081 12.7316 19.081 7.66522C19.081 7.50022 19.0765 7.33339 19.0691 7.17022C19.8197 6.62771 20.4676 5.95566 20.9822 5.18564L20.9813 5.18472Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_970">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.666138)"
//                         ></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="hover:text-primary"
//                   aria-label="social-icon"
//                 >
//                   <svg
//                     className="fill-current"
//                     width="23"
//                     height="22"
//                     viewBox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_30_974)">
//                       <path
//                         d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288  6.53577 12.5071 9.31327L12.5438 7.77327Z"
//                         fill=""
//                       ></path>
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_30_974">
//                         <rect
//                           width="22"
//                           height="22"
//                           fill="white"
//                           transform="translate(0.333862)"
//                         ></rect>
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </a>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();
  const [user, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  const [showName, setShowName] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            occupation: data.occupation || "",
            location: data.location || "",
            bio: data.bio || "",
            image: image || "",
          });
        });
    }
  }, [session?.user?.email, image]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      // setLoading(true);
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );
      setImage(imgbbResponse?.data?.data?.url);
      // setLoading(false);

      // Update the user's image on the server
      await handleSubmit(null, imgbbResponse.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      // setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  //   const handlePhotoUpload = async (event) => {
  //     const file = event.target.files[0];

  //     if (!file) {
  //         // Handle the case where no file is selected
  //         console.error("No file selected");
  //         return;
  //     }

  //     const formData = new FormData();
  //     formData.append("image", file);

  //     try {
  //         setLoading(true);
  //         const imgbbResponse = await axios.post(
  //             `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
  //             formData
  //         );

  //         // Get the image URL from the response
  //         const uploadedImageUrl = imgbbResponse.data.data.url;
  //         setImage(uploadedImageUrl); // Update the state with the new image URL
  //         setLoading(false);
  //         // Update the user's image on the server
  //         await handleSubmit(null, uploadedImageUrl);
  //     } catch (error) {
  //         console.error("Error uploading image:", error);
  //         setLoading(false);
  //         // Optionally set an error message in state to display to the user
  //     }
  // };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `/api/user/${session?.user?.email}`,
        formData
      ); // Directly pass formData

      if (response.status === 200) {
        // Check for 200 on successful update
        setUsers(response?.data);
        console.log(response?.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${formData.name} added to user!`, // Use formData.name here
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }

    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  if (!user) return null;

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0",
    },
    {
      name: "Twitter",
      icon: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z",
    },
    {
      name: "GitHub",
      icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    },
  ];

  return (
    <div className="lg:h-[80vh] font-sans flex flex-col justify-center items-center antialiased leading-normal tracking-wider">
      <div className="absolute inset-0 bg-userProfileBG opacity-20"></div>
      <div className="max-w-4xl flex items-center flex-wrap mx-auto my-32 lg:my-0 justify-center z-30 ">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white shadow-2xl opacity-100 mx-6 lg:mx-0 z-30 relative"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="absolute right-2 top-12 cursor-pointer"
          >
            <HiPencilAlt size={32} />
          </div>
          <div className="px-12 lg:p-12 text-center lg:text-left z-30">
            <div className="z-50">
              <Image
                src={user?.image}
                width={500}
                height={500}
                alt="Profile"
                className="h-48 w-48 object-cover bg-center block lg:hidden rounded-full shadow-xl mx-auto -mt-16 z-50 border-[10px]"
              />
            </div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user?.name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              What you do
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center  lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Your Location - 25.0000° N, 71.0000° W
            </p>
            <p className="pt-8 text-sm">
              Totally optional short description about yourself, what you do and
              so on.Totally optional short description about yourself, what you
              do and so on.Totally optional short description about yourself,
              what you do and so on.Totally optional short description about
              yourself, what you do and so on.Totally optional short description
              about yourself, what you do and so on.
            </p>
            <div className="mt-8 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center lg:justify-start gap-10">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href="#"
                  className="link"
                  aria-label={link.name}
                >
                  <svg
                    className="h-6 fill-current text-gray-600 hover:text-green-700"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>{link.name}</title>
                    <path d={link.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <Image
            src={image || user?.image}
            width={500}
            height={500}
            alt="Profile"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit profile</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* <div>
                <label className="flex w-full max-w-[380px] md:w-[380px]">
                  <div
                    onClick={handleImageClick}
                    className="w-fit whitespace-nowrap bg-amber-500 px-3 py-2 text-white"
                  >
                    Choose File
                  </div>
                  <div className="flex w-full max-w-[380px] items-center border-b-[2px] border-amber-500 px-2 font-medium text-gray-400">
                    {image ? image.split("/").pop() : "No File Chosen"}
                  </div>
                </label>
                <input
                  name="image"
                  type="text"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div> */}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="occupation" className="text-sm font-medium">
                  Occupation
                </label>
                <input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
