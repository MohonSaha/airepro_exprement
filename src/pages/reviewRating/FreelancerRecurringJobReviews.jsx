// import { useState, useEffect } from "react";
// import {
//   Edit,
//   ChevronRight,
//   Clock,
//   Award,
//   MessageCircle,
//   Star,
//   TrendingUp,
//   User,
//   ChevronDown,
//   BarChart3,
//   ArrowUp,
//   ArrowDown,
//   Calendar,
//   CheckCircle2,
//   XCircle,
//   ChevronUp,
// } from "lucide-react";
// import Rating from "../../components/shared/Rating";
// import { reviewDataByJobId } from "@/data/review/reviewByUserIdAndJobId";

// export default function FreelancerRecurringJobReviews() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [animateIn, setAnimateIn] = useState(false);
//   const [showAllMilestones, setShowAllMilestones] = useState(false);
//   const [selectedTimeframe, setSelectedTimeframe] = useState("all");

//   const jobInfo = reviewDataByJobId.jobInfo;

//   useEffect(() => {
//     setAnimateIn(true);
//   }, []);

//   const calculateStats = () => {
//     if (!jobInfo?.milestones?.length) return null;

//     let totalRating = 0;
//     let count = 0;
//     const highestRated = { score: 0, name: "" };
//     const lowestRated = { score: 5, name: "" };
//     const categories = {};
//     const trends = { improving: [], declining: [] };
//     let onTimeCount = 0;
//     // eslint-disable-next-line no-unused-vars
//     let lateCount = 0;
//     let clientSatisfaction = 0;
//     let clientCount = 0;
//     let freelancerSatisfaction = 0;
//     let freelancerCount = 0;

//     const sortedMilestones = [...jobInfo.milestones].sort(
//       (a, b) =>
//         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     );

//     const ratingHistory = [];

//     sortedMilestones.forEach((milestone) => {
//       const dueDate = new Date(milestone.dateLine);
//       const completedDate = new Date(
//         milestone.completedAt || milestone.updatedAt || Date.now()
//       );
//       const isOnTime = completedDate <= dueDate;

//       if (isOnTime) onTimeCount++;
//       else lateCount++;

//       if (milestone.freelancerReview?.averageRating) {
//         const rating = parseFloat(milestone.freelancerReview.averageRating);
//         totalRating += rating;
//         count++;
//         freelancerSatisfaction += rating;
//         freelancerCount++;

//         ratingHistory.push({
//           milestone: milestone.description,
//           rating,
//           type: "freelancer",
//         });

//         if (rating > highestRated.score) {
//           highestRated.score = rating;
//           highestRated.name = milestone.description;
//         }

//         if (rating < lowestRated.score) {
//           lowestRated.score = rating;
//           lowestRated.name = milestone.description;
//         }

//         const categoryScores = {
//           recommendation: milestone.freelancerReview.recommendationScore,
//           communication: milestone.freelancerReview.communicationScore,
//           availability: milestone.freelancerReview.availabilityScore,
//           cooperation: milestone.freelancerReview.cooperationScore,
//           payment: milestone.freelancerReview.paymentClearScore,
//         };

//         Object.entries(categoryScores).forEach(([key, value]) => {
//           if (!value) return;
//           categories[key] = categories[key] || { total: 0, count: 0 };
//           categories[key].total += parseFloat(value);
//           categories[key].count++;
//         });
//       }

//       if (milestone.clientReview?.averageRating) {
//         const rating = parseFloat(milestone.clientReview.averageRating);
//         totalRating += rating;
//         count++;
//         clientSatisfaction += rating;
//         clientCount++;

//         ratingHistory.push({
//           milestone: milestone.description,
//           rating,
//           type: "client",
//         });

//         if (rating > highestRated.score) {
//           highestRated.score = rating;
//           highestRated.name = milestone.description;
//         }

//         if (rating < lowestRated.score) {
//           lowestRated.score = rating;
//           lowestRated.name = milestone.description;
//         }

//         const categoryScores = {
//           recommendation: milestone.clientReview.recommendationScore,
//           skill: milestone.clientReview.skillScore,
//           communication: milestone.clientReview.communicationScore,
//           availability: milestone.clientReview.availabilityScore,
//           deadline: milestone.clientReview.meetDeadlineScore,
//           cooperation: milestone.clientReview.cooperationScore,
//           requirements: milestone.clientReview.requirementsScore,
//         };

//         Object.entries(categoryScores).forEach(([key, value]) => {
//           if (!value) return;
//           categories[key] = categories[key] || { total: 0, count: 0 };
//           categories[key].total += parseFloat(value);
//           categories[key].count++;
//         });
//       }
//     });

//     if (ratingHistory.length >= 2) {
//       const freelancerRatings = ratingHistory.filter(
//         (item) => item.type === "freelancer"
//       );
//       const clientRatings = ratingHistory.filter(
//         (item) => item.type === "client"
//       );

//       if (freelancerRatings.length >= 2) {
//         const firstRating = freelancerRatings[0].rating;
//         const lastRating =
//           freelancerRatings[freelancerRatings.length - 1].rating;
//         if (lastRating > firstRating) {
//           trends.improving.push("freelancer");
//         } else if (lastRating < firstRating) {
//           trends.declining.push("freelancer");
//         }
//       }

//       if (clientRatings.length >= 2) {
//         const firstRating = clientRatings[0].rating;
//         const lastRating = clientRatings[clientRatings.length - 1].rating;
//         if (lastRating > firstRating) {
//           trends.improving.push("client");
//         } else if (lastRating < firstRating) {
//           trends.declining.push("client");
//         }
//       }
//     }

//     const processedCategories = {};
//     Object.entries(categories).forEach(([key, data]) => {
//       processedCategories[key] = (data.total / data.count).toFixed(1);
//     });

//     const sortedCategories = Object.entries(processedCategories)
//       .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
//       .reduce((obj, [key, value]) => {
//         obj[key] = value;
//         return obj;
//       }, {});

//     return {
//       average: count > 0 ? (totalRating / count).toFixed(1) : 0,
//       highestRated,
//       lowestRated,
//       categories: sortedCategories,
//       topCategories: Object.entries(sortedCategories).slice(0, 3),
//       bottomCategories: Object.entries(sortedCategories).slice(-2),
//       trends,
//       onTimeRate:
//         jobInfo.milestones.length > 0
//           ? ((onTimeCount / jobInfo.milestones.length) * 100).toFixed(0)
//           : 0,
//       clientSatisfaction:
//         clientCount > 0 ? (clientSatisfaction / clientCount).toFixed(1) : 0,
//       freelancerSatisfaction:
//         freelancerCount > 0
//           ? (freelancerSatisfaction / freelancerCount).toFixed(1)
//           : 0,
//       totalReviews: count,
//       ratingHistory,
//     };
//   };

//   const stats = calculateStats();
//   const displayedMilestones = showAllMilestones
//     ? jobInfo?.milestones
//     : jobInfo?.milestones?.slice(0, 3);

//   return (
//     <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen p-6 border border-gray-400">
//       <div className="max-w-6xl mx-auto">
//         {/* Stats Dashboard */}
//         <div
//           className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-700 transform ${
//             animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           {/* Main Stats Card */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-2">
//             <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 flex justify-between items-center">
//               <h2 className="text-white text-xl font-bold">
//                 Performance Overview
//               </h2>
//               <div className="flex space-x-2">
//                 <button
//                   className={`px-2 py-1 text-xs rounded-md transition-colors ${
//                     selectedTimeframe === "all"
//                       ? "bg-white text-purple-600"
//                       : "bg-purple-400 text-white hover:bg-purple-300"
//                   }`}
//                   onClick={() => setSelectedTimeframe("all")}
//                 >
//                   All Time
//                 </button>
//                 <button
//                   className={`px-2 py-1 text-xs rounded-md transition-colors ${
//                     selectedTimeframe === "recent"
//                       ? "bg-white text-purple-600"
//                       : "bg-purple-400 text-white hover:bg-purple-300"
//                   }`}
//                   onClick={() => setSelectedTimeframe("recent")}
//                 >
//                   Recent
//                 </button>
//               </div>
//             </div>
//             <div className="p-5">
//               <div className="flex flex-wrap md:flex-nowrap gap-4">
//                 <div className="w-full md:w-1/2">
//                   <p className="text-gray-500 text-sm">Overall Rating</p>
//                   <div className="flex items-center mt-1">
//                     <span className="text-3xl font-bold text-gray-800 mr-2">
//                       {stats?.average || "N/A"}
//                     </span>
//                     {stats?.average && (
//                       <Rating rating={parseFloat(stats.average)} />
//                     )}
//                     ho
//                   </div>

//                   <div className="mt-3 grid grid-cols-2 gap-2">
//                     <div>
//                       <p className="text-xs text-gray-500">
//                         Client Satisfaction
//                       </p>
//                       <div className="flex items-center">
//                         <span className="text-lg font-bold text-gray-800 mr-1">
//                           {stats?.clientSatisfaction || "N/A"}
//                         </span>
//                         {stats?.trends?.improving.includes("client") && (
//                           <ArrowUp className="h-4 w-4 text-green-500" />
//                         )}
//                         {stats?.trends?.declining.includes("client") && (
//                           <ArrowDown className="h-4 w-4 text-red-500" />
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">
//                         Freelancer Satisfaction
//                       </p>
//                       <div className="flex items-center">
//                         <span className="text-lg font-bold text-gray-800 mr-1">
//                           {stats?.freelancerSatisfaction || "N/A"}
//                         </span>
//                         {stats?.trends?.improving.includes("freelancer") && (
//                           <ArrowUp className="h-4 w-4 text-green-500" />
//                         )}
//                         {stats?.trends?.declining.includes("freelancer") && (
//                           <ArrowDown className="h-4 w-4 text-red-500" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full md:w-1/2 flex flex-col justify-between">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-xs text-gray-500">
//                         On-Time Completion
//                       </p>
//                       <p className="text-lg font-bold text-gray-800">
//                         {stats?.onTimeRate || 0}%
//                       </p>
//                     </div>
//                     <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
//                       <BarChart3 className="h-6 w-6 text-purple-500" />
//                     </div>
//                   </div>

//                   <div className="mt-3 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
//                         <CheckCircle2 className="h-4 w-4 text-green-500" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Total Reviews</p>
//                         <p className="text-base font-bold text-gray-800">
//                           {stats?.totalReviews || 0}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//                         <Calendar className="h-4 w-4 text-blue-500" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Recurrings</p>
//                         <p className="text-base font-bold text-gray-800">
//                           {jobInfo?.milestones?.length || 0}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {stats?.topCategories && stats.topCategories.length > 0 && (
//                 <div className="mt-6">
//                   <div className="flex justify-between items-center mb-3">
//                     <p className="text-gray-500 text-sm">Strongest Areas</p>
//                     <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
//                       <Star className="h-3 w-3 text-green-500" />
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {stats.topCategories.map(([key, value]) => (
//                       <div
//                         key={key}
//                         className="flex items-center justify-between"
//                       >
//                         <span className="text-gray-600 text-sm capitalize">
//                           {key}
//                         </span>
//                         <div className="flex items-center">
//                           <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mr-2">
//                             <div
//                               className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
//                               style={{
//                                 width: `${(parseFloat(value) / 5) * 100}%`,
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-gray-800 text-sm font-medium">
//                             {value}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {stats?.bottomCategories && stats.bottomCategories.length > 0 && (
//                 <div className="mt-6">
//                   <div className="flex justify-between items-center mb-3">
//                     <p className="text-gray-500 text-sm">
//                       Areas for Improvement
//                     </p>
//                     <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
//                       <XCircle className="h-3 w-3 text-amber-500" />
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {stats.bottomCategories.map(([key, value]) => (
//                       <div
//                         key={key}
//                         className="flex items-center justify-between"
//                       >
//                         <span className="text-gray-600 text-sm capitalize">
//                           {key}
//                         </span>
//                         <div className="flex items-center">
//                           <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mr-2">
//                             <div
//                               className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
//                               style={{
//                                 width: `${(parseFloat(value) / 5) * 100}%`,
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-gray-800 text-sm font-medium">
//                             {value}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Timeline Navigation Card */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
//               <h2 className="text-white text-xl font-bold">Timeline</h2>
//             </div>
//             <div className="p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-gray-500 text-sm">Milestone Progress</p>
//                 <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
//                   <TrendingUp className="h-4 w-4 text-blue-500" />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {displayedMilestones?.map((milestone, i) => (
//                   <button
//                     key={i}
//                     className={`w-full text-left p-3 rounded-xl transition-all ${
//                       activeIndex === i
//                         ? "bg-blue-50 border-l-4 border-blue-500"
//                         : "bg-gray-50 hover:bg-gray-100"
//                     }`}
//                     onClick={() => setActiveIndex(i)}
//                   >
//                     <p className="font-medium text-gray-800 truncate">
//                       {milestone.description}
//                     </p>
//                     <div className="flex items-center text-xs text-gray-500 mt-1">
//                       <Clock className="h-3 w-3 mr-1" />
//                       <span>
//                         {new Date(milestone?.dateLine).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </button>
//                 ))}

//                 {jobInfo?.milestones?.length > 3 && (
//                   <button
//                     className="w-full text-center text-sm text-blue-500 font-medium py-2 hover:text-blue-700 flex items-center justify-center"
//                     onClick={() => setShowAllMilestones(!showAllMilestones)}
//                   >
//                     {showAllMilestones ? (
//                       <>
//                         <ChevronUp className="h-4 w-4 mr-1" />
//                         Show Less
//                       </>
//                     ) : (
//                       <>
//                         <ChevronDown className="h-4 w-4 mr-1" />
//                         View All Milestones
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               <div className="mt-6 pt-4 border-t border-gray-100">
//                 <p className="text-gray-500 text-xs mb-3">Quick Stats</p>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-xs">Completed</span>
//                     <span className="text-gray-800 text-xs font-medium">
//                       {jobInfo?.milestones?.filter(
//                         (m) => m.status === "completed"
//                       ).length || 0}{" "}
//                       / {jobInfo?.milestones?.length || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-xs">Reviewed</span>
//                     <span className="text-gray-800 text-xs font-medium">
//                       {jobInfo?.milestones?.filter(
//                         (m) => m.freelancerReview || m.clientReview
//                       ).length || 0}{" "}
//                       / {jobInfo?.milestones?.length || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 text-xs">Pending</span>
//                     <span className="text-gray-800 text-xs font-medium">
//                       {jobInfo?.milestones?.filter(
//                         (m) => m.status !== "completed"
//                       ).length || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Timeline */}
//         <div className="relative">
//           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

//           <div className="space-y-6">
//             {jobInfo?.milestones?.map((milestone, i) => (
//               <div
//                 key={i}
//                 className={`transition-all duration-500 transform ${
//                   animateIn
//                     ? "translate-x-0 opacity-100"
//                     : "translate-x-10 opacity-0"
//                 } ${activeIndex === i ? "scale-105 z-10" : "scale-100 z-0"}`}
//                 style={{ transitionDelay: `${i * 150}ms` }}
//               >
//                 <TimelineCard
//                   milestone={milestone}
//                   index={i}
//                   isActive={activeIndex === i}
//                   onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
//                 />
//               </div>
//             ))}

//             {jobInfo?.milestones?.length === 0 && (
//               <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//                 <div className="h-20 w-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
//                   <MessageCircle className="h-10 w-10 text-gray-300" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">
//                   No Reviews Yet
//                 </h3>
//                 <p className="text-gray-500">
//                   There are no reviews available for this job at the moment.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TimelineCard({ milestone, index, isActive, onToggle }) {
//   const calculateRatings = () => {
//     const freelancerRating = milestone?.freelancerReview?.averageRating
//       ? parseFloat(milestone.freelancerReview.averageRating)
//       : null;

//     const clientRating = milestone?.clientReview?.averageRating
//       ? parseFloat(milestone.clientReview.averageRating)
//       : null;

//     const combined = [];
//     if (freelancerRating) combined.push(freelancerRating);
//     if (clientRating) combined.push(clientRating);

//     const average =
//       combined.length > 0
//         ? (combined.reduce((a, b) => a + b, 0) / combined.length).toFixed(1)
//         : null;

//     return { freelancerRating, clientRating, average };
//   };

//   const ratings = calculateRatings();

//   return (
//     <div className={`md:ml-10 relative ${isActive ? "z-10" : "z-0"}`}>
//       <div className="absolute -left-14 top-6 hidden md:flex">
//         <div
//           className={`h-8 w-8 rounded-full border-4 border-white flex items-center justify-center ${
//             isActive ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"
//           }`}
//         >
//           {index + 1}
//         </div>
//       </div>

//       <div
//         className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
//           isActive ? "shadow-xl" : "hover:shadow-xl cursor-pointer"
//         }`}
//         onClick={() => !isActive && onToggle()}
//       >
//         <div
//           className={`p-5 flex items-center justify-between border-b ${
//             isActive ? "bg-gradient-to-r from-violet-50 to-purple-50" : ""
//           }`}
//         >
//           <div>
//             <h3 className="font-bold text-gray-800 text-lg">
//               {milestone.description}
//             </h3>
//             <div className="flex items-center text-sm text-gray-500 mt-1">
//               <Clock className="h-3.5 w-3.5 mr-1.5" />
//               <span>
//                 Due: {new Date(milestone?.dateLine).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {ratings.average && (
//               <div className="flex items-center">
//                 <span className="text-xl font-bold text-gray-800 mr-2">
//                   {ratings.average}
//                 </span>
//                 <Rating rating={parseFloat(ratings.average)} />
//               </div>
//             )}

//             <button
//               className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
//                 isActive
//                   ? "bg-purple-100 text-purple-500"
//                   : "bg-gray-100 text-gray-400 hover:bg-gray-200"
//               }`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onToggle();
//               }}
//             >
//               <ChevronRight
//                 className={`h-5 w-5 transition-transform duration-300 ${
//                   isActive ? "rotate-90" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {isActive && (
//           <div className="p-5">
//             <div className="grid md:grid-cols-2 gap-6">
//               {milestone?.freelancerReview ? (
//                 <ReviewPanel
//                   type="freelancer"
//                   review={milestone.freelancerReview}
//                   name={
//                     milestone?.freelancerInfo?.firstName +
//                     " " +
//                     milestone?.freelancerInfo?.lastName
//                   }
//                 />
//               ) : (
//                 <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
//                   <User className="h-8 w-8 text-gray-300 mb-2" />
//                   <p className="text-gray-500 text-sm">
//                     No freelancer review yet
//                   </p>
//                 </div>
//               )}

//               {milestone?.clientReview ? (
//                 <ReviewPanel
//                   type="client"
//                   review={milestone.clientReview}
//                   name={
//                     milestone?.clientInfo?.firstName +
//                     " " +
//                     milestone?.clientInfo?.lastName
//                   }
//                 />
//               ) : (
//                 <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
//                   <User className="h-8 w-8 text-gray-300 mb-2" />
//                   <p className="text-gray-500 text-sm">No client review yet</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ReviewPanel({ type, review, name }) {
//   const [expanded, setExpanded] = useState(false);

//   const scoreItems =
//     type === "freelancer"
//       ? [
//           { label: "Recommendation", score: review?.recommendationScore },
//           { label: "Communication", score: review?.communicationScore },
//           { label: "Availability", score: review?.availabilityScore },
//           { label: "Cooperation", score: review?.cooperationScore },
//           { label: "Payment", score: review?.paymentClearScore },
//         ]
//       : [
//           { label: "Recommendation", score: review?.recommendationScore },
//           { label: "Skill", score: review?.skillScore },
//           { label: "Communication", score: review?.communicationScore },
//           { label: "Availability", score: review?.availabilityScore },
//           { label: "Meet Deadline", score: review?.meetDeadlineScore },
//           { label: "Cooperation", score: review?.cooperationScore },
//           { label: "Requirements", score: review?.requirementsScore },
//         ];

//   const colors =
//     type === "freelancer"
//       ? {
//           bg: "bg-violet-50",
//           accent: "bg-violet-500",
//           text: "text-violet-600",
//           hover: "hover:bg-violet-100",
//         }
//       : {
//           bg: "bg-emerald-50",
//           accent: "bg-emerald-500",
//           text: "text-emerald-600",
//           hover: "hover:bg-emerald-100",
//         };

//   return (
//     <div className={`rounded-xl overflow-hidden shadow-sm ${colors.bg}`}>
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <div
//               className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 bg-white ${colors.text}`}
//             >
//               <Award className="h-5 w-5" />
//             </div>
//             <div>
//               <h4 className="font-bold text-gray-800">{name}</h4>
//               <p className="text-xs text-gray-500 capitalize">{type}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <span className="text-2xl font-bold text-gray-800 mr-2">
//               {review?.averageRating}
//             </span>
//             <Rating rating={parseFloat(review?.averageRating || 0)} />
//           </div>

//           <button
//             className={`px-3 py-1 rounded-full text-xs font-medium ${colors.text} bg-white`}
//             onClick={() => setExpanded(!expanded)}
//           >
//             {expanded ? "Hide details" : "View details"}
//           </button>
//         </div>

//         {expanded && (
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             {scoreItems.map((item, index) => (
//               <div key={index} className="bg-white/60 rounded-lg p-2">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="text-xs text-gray-600">{item.label}</span>
//                   <span className="text-xs font-bold text-gray-800">
//                     {item.score}
//                   </span>
//                 </div>
//                 <div className="h-1.5 bg-white rounded-full overflow-hidden">
//                   <div
//                     className={`h-full rounded-full ${colors.accent}`}
//                     style={{ width: `${(item.score / 5) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {review?.reviewMessage && (
//           <div className="mt-3 bg-white/60 rounded-lg p-3">
//             <div className="flex">
//               <MessageCircle
//                 className={`h-4 w-4 mt-0.5 mr-2 flex-shrink-0 ${colors.text}`}
//               />
//               <p className="text-sm text-gray-700 italic">
//                 &quot;{review.reviewMessage}&quot;
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  Edit,
  ChevronRight,
  Clock,
  Award,
  MessageCircle,
  Star,
  TrendingUp,
  User,
  ChevronDown,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronUp,
} from "lucide-react";
import TimelineCard from "./TimelineCard";
import { reviewDataByJobId } from "@/data/review/reviewByUserIdAndJobId";

export default function FreelancerRecurringJobReviews() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [showAllMilestones, setShowAllMilestones] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");

  const jobInfo = reviewDataByJobId.jobInfo;

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const calculateStats = () => {
    if (!jobInfo?.milestones?.length) return null;

    let totalRating = 0;
    let count = 0;
    const highestRated = { score: 0, name: "" };
    const lowestRated = { score: 5, name: "" };
    const categories = {};
    const trends = { improving: [], declining: [] };
    let onTimeCount = 0;
    // eslint-disable-next-line no-unused-vars
    let lateCount = 0;
    let clientSatisfaction = 0;
    let clientCount = 0;
    let freelancerSatisfaction = 0;
    let freelancerCount = 0;

    const sortedMilestones = [...jobInfo.milestones].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const ratingHistory = [];

    sortedMilestones.forEach((milestone) => {
      const dueDate = new Date(milestone.dateLine);
      const completedDate = new Date(
        milestone.completedAt || milestone.updatedAt || Date.now()
      );
      const isOnTime = completedDate <= dueDate;

      if (isOnTime) onTimeCount++;
      else lateCount++;

      if (milestone.freelancerReview?.averageRating) {
        const rating = parseFloat(milestone.freelancerReview.averageRating);
        totalRating += rating;
        count++;
        freelancerSatisfaction += rating;
        freelancerCount++;

        ratingHistory.push({
          milestone: milestone.description,
          rating,
          type: "freelancer",
        });

        if (rating > highestRated.score) {
          highestRated.score = rating;
          highestRated.name = milestone.description;
        }

        if (rating < lowestRated.score) {
          lowestRated.score = rating;
          lowestRated.name = milestone.description;
        }

        const categoryScores = {
          recommendation: milestone.freelancerReview.recommendationScore,
          communication: milestone.freelancerReview.communicationScore,
          availability: milestone.freelancerReview.availabilityScore,
          cooperation: milestone.freelancerReview.cooperationScore,
          payment: milestone.freelancerReview.paymentClearScore,
        };

        Object.entries(categoryScores).forEach(([key, value]) => {
          if (!value) return;
          categories[key] = categories[key] || { total: 0, count: 0 };
          categories[key].total += parseFloat(value);
          categories[key].count++;
        });
      }

      if (milestone.clientReview?.averageRating) {
        const rating = parseFloat(milestone.clientReview.averageRating);
        totalRating += rating;
        count++;
        clientSatisfaction += rating;
        clientCount++;

        ratingHistory.push({
          milestone: milestone.description,
          rating,
          type: "client",
        });

        if (rating > highestRated.score) {
          highestRated.score = rating;
          highestRated.name = milestone.description;
        }

        if (rating < lowestRated.score) {
          lowestRated.score = rating;
          lowestRated.name = milestone.description;
        }

        const categoryScores = {
          recommendation: milestone.clientReview.recommendationScore,
          skill: milestone.clientReview.skillScore,
          communication: milestone.clientReview.communicationScore,
          availability: milestone.clientReview.availabilityScore,
          deadline: milestone.clientReview.meetDeadlineScore,
          cooperation: milestone.clientReview.cooperationScore,
          requirements: milestone.clientReview.requirementsScore,
        };

        Object.entries(categoryScores).forEach(([key, value]) => {
          if (!value) return;
          categories[key] = categories[key] || { total: 0, count: 0 };
          categories[key].total += parseFloat(value);
          categories[key].count++;
        });
      }
    });

    if (ratingHistory.length >= 2) {
      const freelancerRatings = ratingHistory.filter(
        (item) => item.type === "freelancer"
      );
      const clientRatings = ratingHistory.filter(
        (item) => item.type === "client"
      );

      if (freelancerRatings.length >= 2) {
        const firstRating = freelancerRatings[0].rating;
        const lastRating =
          freelancerRatings[freelancerRatings.length - 1].rating;
        if (lastRating > firstRating) {
          trends.improving.push("freelancer");
        } else if (lastRating < firstRating) {
          trends.declining.push("freelancer");
        }
      }

      if (clientRatings.length >= 2) {
        const firstRating = clientRatings[0].rating;
        const lastRating = clientRatings[clientRatings.length - 1].rating;
        if (lastRating > firstRating) {
          trends.improving.push("client");
        } else if (lastRating < firstRating) {
          trends.declining.push("client");
        }
      }
    }

    const processedCategories = {};
    Object.entries(categories).forEach(([key, data]) => {
      processedCategories[key] = (data.total / data.count).toFixed(1);
    });

    const sortedCategories = Object.entries(processedCategories)
      .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return {
      average: count > 0 ? (totalRating / count).toFixed(1) : 0,
      highestRated,
      lowestRated,
      categories: sortedCategories,
      topCategories: Object.entries(sortedCategories).slice(0, 3),
      bottomCategories: Object.entries(sortedCategories).slice(-2),
      trends,
      onTimeRate:
        jobInfo.milestones.length > 0
          ? ((onTimeCount / jobInfo.milestones.length) * 100).toFixed(0)
          : 0,
      clientSatisfaction:
        clientCount > 0 ? (clientSatisfaction / clientCount).toFixed(1) : 0,
      freelancerSatisfaction:
        freelancerCount > 0
          ? (freelancerSatisfaction / freelancerCount).toFixed(1)
          : 0,
      totalReviews: count,
      ratingHistory,
    };
  };

  const stats = calculateStats();
  const displayedMilestones = showAllMilestones
    ? jobInfo?.milestones
    : jobInfo?.milestones?.slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen p-6 border border-gray-400">
      <div className="max-w-5xl mx-auto">
        {/* Stats Dashboard */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-700 transform ${
            animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Stats Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-2">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">
                Performance Overview
              </h2>
              <div className="flex space-x-2">
                <button
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    selectedTimeframe === "all"
                      ? "bg-white text-purple-600"
                      : "bg-purple-400 text-white hover:bg-purple-300"
                  }`}
                  onClick={() => setSelectedTimeframe("all")}
                >
                  All Time
                </button>
                <button
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    selectedTimeframe === "recent"
                      ? "bg-white text-purple-600"
                      : "bg-purple-400 text-white hover:bg-purple-300"
                  }`}
                  onClick={() => setSelectedTimeframe("recent")}
                >
                  Recent
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-1/2">
                  <p className="text-gray-500 text-sm">Overall Rating</p>
                  <div className="flex items-center mt-1">
                    <span className="text-3xl font-bold text-gray-800 mr-2">
                      {stats?.average || "N/A"}
                    </span>
                    {stats?.average && (
                      <Rating rating={parseFloat(stats.average)} />
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">
                        Client Satisfaction
                      </p>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-800 mr-1">
                          {stats?.clientSatisfaction || "N/A"}
                        </span>
                        {stats?.trends?.improving.includes("client") && (
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        )}
                        {stats?.trends?.declining.includes("client") && (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Freelancer Satisfaction
                      </p>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-800 mr-1">
                          {stats?.freelancerSatisfaction || "N/A"}
                        </span>
                        {stats?.trends?.improving.includes("freelancer") && (
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        )}
                        {stats?.trends?.declining.includes("freelancer") && (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500">
                        On-Time Completion
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {stats?.onTimeRate || 0}%
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Reviews</p>
                        <p className="text-base font-bold text-gray-800">
                          {stats?.totalReviews || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Recurrings</p>
                        <p className="text-base font-bold text-gray-800">
                          {jobInfo?.milestones?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {stats?.topCategories && stats.topCategories.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-500 text-sm">Strongest Areas</p>
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Star className="h-3 w-3 text-green-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {stats.topCategories.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600 text-sm capitalize">
                          {key}
                        </span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mr-2">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                              style={{
                                width: `${(parseFloat(value) / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-800 text-sm font-medium">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {stats?.bottomCategories && stats.bottomCategories.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-500 text-sm">
                      Areas for Improvement
                    </p>
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <XCircle className="h-3 w-3 text-amber-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {stats.bottomCategories.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600 text-sm capitalize">
                          {key}
                        </span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mr-2">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                              style={{
                                width: `${(parseFloat(value) / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-800 text-sm font-medium">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline Navigation Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
              <h2 className="text-white text-xl font-bold">Timeline</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500 text-sm">Milestone Progress</p>
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              <div className="space-y-4">
                {displayedMilestones?.map((milestone, i) => (
                  <button
                    key={i}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      activeIndex === i
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <p className="font-medium text-gray-800 truncate">
                      {milestone.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(milestone?.dateLine).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}

                {jobInfo?.milestones?.length > 3 && (
                  <button
                    className="w-full text-center text-sm text-blue-500 font-medium py-2 hover:text-blue-700 flex items-center justify-center"
                    onClick={() => setShowAllMilestones(!showAllMilestones)}
                  >
                    {showAllMilestones ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        View All Milestones
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-xs mb-3">Quick Stats</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs">Completed</span>
                    <span className="text-gray-800 text-xs font-medium">
                      {jobInfo?.milestones?.filter(
                        (m) => m.status === "completed"
                      ).length || 0}{" "}
                      / {jobInfo?.milestones?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs">Reviewed</span>
                    <span className="text-gray-800 text-xs font-medium">
                      {jobInfo?.milestones?.filter(
                        (m) => m.freelancerReview || m.clientReview
                      ).length || 0}{" "}
                      / {jobInfo?.milestones?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs">Pending</span>
                    <span className="text-gray-800 text-xs font-medium">
                      {jobInfo?.milestones?.filter(
                        (m) => m.status !== "completed"
                      ).length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

          <div className="space-y-6">
            {jobInfo?.milestones?.map((milestone, i) => (
              <div
                key={i}
                className={`transition-all duration-500 transform ${
                  animateIn
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                } ${activeIndex === i ? "scale-105 z-10" : "scale-100 z-0"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <TimelineCard
                  milestone={milestone}
                  index={i}
                  isActive={activeIndex === i}
                  onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
                />
              </div>
            ))}

            {jobInfo?.milestones?.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="h-20 w-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-gray-500">
                  There are no reviews available for this job at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
