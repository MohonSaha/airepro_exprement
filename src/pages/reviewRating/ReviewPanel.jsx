import { useState } from "react";
import { Award, MessageCircle } from "lucide-react";
import Rating from "@/components/shared/Rating";

export default function ReviewPanel({ type, review, name }) {
  const [expanded, setExpanded] = useState(false);

  const scoreItems =
    type === "freelancer"
      ? [
          { label: "Recommendation", score: review?.recommendationScore },
          { label: "Communication", score: review?.communicationScore },
          { label: "Availability", score: review?.availabilityScore },
          { label: "Cooperation", score: review?.cooperationScore },
          { label: "Payment", score: review?.paymentClearScore },
        ]
      : [
          { label: "Recommendation", score: review?.recommendationScore },
          { label: "Skill", score: review?.skillScore },
          { label: "Communication", score: review?.communicationScore },
          { label: "Availability", score: review?.availabilityScore },
          { label: "Meet Deadline", score: review?.meetDeadlineScore },
          { label: "Cooperation", score: review?.cooperationScore },
          { label: "Requirements", score: review?.requirementsScore },
        ];

  const colors =
    type === "freelancer"
      ? {
          bg: "bg-violet-50",
          accent: "bg-violet-500",
          text: "text-violet-600",
          hover: "hover:bg-violet-100",
        }
      : {
          bg: "bg-emerald-50",
          accent: "bg-emerald-500",
          text: "text-emerald-600",
          hover: "hover:bg-emerald-100",
        };

  return (
    <div className={`rounded-xl overflow-hidden shadow-sm ${colors.bg}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 bg-white ${colors.text}`}
            >
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{name}</h4>
              <p className="text-xs text-gray-500 capitalize">{type}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800 mr-2">
              {review?.averageRating}
            </span>
            <Rating rating={parseFloat(review?.averageRating || 0)} />
          </div>

          <button
            className={`px-3 py-1 rounded-full text-xs font-medium ${colors.text} bg-white`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide details" : "View details"}
          </button>
        </div>

        {expanded && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {scoreItems.map((item, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs font-bold text-gray-800">
                    {item.score}
                  </span>
                </div>
                <div className="h-1.5 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colors.accent}`}
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {review?.reviewMessage && (
          <div className="mt-3 bg-white/60 rounded-lg p-3">
            <div className="flex">
              <MessageCircle
                className={`h-4 w-4 mt-0.5 mr-2 flex-shrink-0 ${colors.text}`}
              />
              <p className="text-sm text-gray-700 italic">
                &quot;{review.reviewMessage}&quot;
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
