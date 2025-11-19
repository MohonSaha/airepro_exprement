import { ChevronRight, Clock, User } from "lucide-react";
import ReviewPanel from "./ReviewPanel";
import Rating from "@/components/shared/Rating";

export default function TimelineCard({ milestone, index, isActive, onToggle }) {
  const calculateRatings = () => {
    const freelancerRating = milestone?.freelancerReview?.averageRating
      ? parseFloat(milestone.freelancerReview.averageRating)
      : null;

    const clientRating = milestone?.clientReview?.averageRating
      ? parseFloat(milestone.clientReview.averageRating)
      : null;

    const combined = [];
    if (freelancerRating) combined.push(freelancerRating);
    if (clientRating) combined.push(clientRating);

    const average =
      combined.length > 0
        ? (combined.reduce((a, b) => a + b, 0) / combined.length).toFixed(1)
        : null;

    return { freelancerRating, clientRating, average };
  };

  const ratings = calculateRatings();

  return (
    <div className={`md:ml-10 relative ${isActive ? "z-10" : "z-0"}`}>
      <div className="absolute -left-14 top-6 hidden md:flex">
        <div
          className={`h-8 w-8 rounded-full border-4 border-white flex items-center justify-center ${
            isActive ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {index + 1}
        </div>
      </div>

      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
          isActive ? "shadow-xl" : "hover:shadow-xl cursor-pointer"
        }`}
        onClick={() => !isActive && onToggle()}
      >
        <div
          className={`p-5 flex items-center justify-between border-b ${
            isActive ? "bg-gradient-to-r from-violet-50 to-purple-50" : ""
          }`}
        >
          <div>
            <h3 className="font-bold text-gray-800 text-lg">
              {milestone.description}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>
                Due: {new Date(milestone?.dateLine).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {ratings.average && (
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 mr-2">
                  {ratings.average}
                </span>
                <Rating rating={parseFloat(ratings.average)} />
              </div>
            )}

            <button
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-500"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform duration-300 ${
                  isActive ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {isActive && (
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-6">
              {milestone?.freelancerReview ? (
                <ReviewPanel
                  type="freelancer"
                  review={milestone.freelancerReview}
                  name={
                    milestone?.freelancerInfo?.firstName +
                    " " +
                    milestone?.freelancerInfo?.lastName
                  }
                />
              ) : (
                <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
                  <User className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm">
                    No freelancer review yet
                  </p>
                </div>
              )}

              {milestone?.clientReview ? (
                <ReviewPanel
                  type="client"
                  review={milestone.clientReview}
                  name={
                    milestone?.clientInfo?.firstName +
                    " " +
                    milestone?.clientInfo?.lastName
                  }
                />
              ) : (
                <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center">
                  <User className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm">No client review yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
