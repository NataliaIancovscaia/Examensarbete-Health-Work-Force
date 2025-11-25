import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Review } from "../types/Review.types";
import { siteReviews } from "../assets/images/assets";

const ReviewSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextCard = () => setIndex((prev) => (prev + 1) % siteReviews.length);

  return (
    <div className="cardstack-container">
      <AnimatePresence initial={false}>
        {siteReviews.map((review: Review, i: number) => {
          
          const rel = (i - index + siteReviews.length) % siteReviews.length;

          const rotate = rel * -4;
          const y = rel * 25;
          const x = rel * 20;
          const scale = 1 - rel * 0.08;
          const opacity = 1 - rel * 0.18;
          const zIndex = 100 - rel;

          return (
            <motion.div
              key={review._id}
              className="card"
              style={{ zIndex }}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ rotate, x, y, scale, opacity }}
              exit={{ opacity: 0, scale: 0.9, y: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              onClick={nextCard}
            >
              <div className="card-header">
                <h3>{review.name || review.employer}</h3>
                <p className="role">{review.role || "Employer"}</p>
              </div>

              <p className="comment">"{review.comment}"</p>
              <div className="rating">{review.rating}</div>
              <p className="date">{review.date}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ReviewSlider;









