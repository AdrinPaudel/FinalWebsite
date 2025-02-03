"use client"

import "./Reviews.css";
import { useState, useEffect, useRef } from "react";

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const batchCount = 3;
    const [fade, setFade] = useState("");
    const timerRef = useRef(null);

    const reviews = [
        {
            id: "batch1",
            reviews: [
                {
                    id: "reviewer1",
                    name: "Ayush Lamsal",
                    text: "Best place to compare plans I have ever seen ever (test increase in length)."
                },
                {
                    id: "reviewer2",
                    name: "Adarsha Acharya",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                }
            ]
        },
        {
            id: "batch2",
            reviews: [
                {
                    id: "reviewer3",
                    name: "Adrin Paudel",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                },
                {
                    id: "reviewer4",
                    name: "Abhinav Sharma",
                    text: "Best place to compare plans I have ever seen ever (test increase in length)."
                }
            ]
        },
        {
            id: "batch3",
            reviews: [
                {
                    id: "reviewer5",
                    name: "Krijan Shrestha",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                },
                {
                    id: "reviewer6",
                    name: "Deepak Bajracharya",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                }
            ]
        },
        {
            id: "batch4",
            reviews: [
                {
                    id: "reviewer7",
                    name: "Buddha Shrestha",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                },
                {
                    id: "reviewer8",
                    name: "Pragati Regmi",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                }
            ]
        },
        {
            id: "batch5",
            reviews: [
                {
                    id: "reviewer9",
                    name: "Aayush Regmi",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                },
                {
                    id: "reviewer10",
                    name: "Dipson Adhikari",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                }
            ]
        },
        {
            id: "batch6",
            reviews: [
                {
                    id: "reviewer11",
                    name: "Sushant Pokhrel",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                },
                {
                    id: "reviewer12",
                    name: "Karan Dahal",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                }
            ]
        },
        {
            id: "batch7",
            reviews: [
                {
                    id: "reviewer13",
                    name: "Avram Lincon",
                    text: "I got to know there was a plan 30% cheaper plan that fitted all my needs."
                },
                {
                    id: "reviewer14",
                    name: "Safal Yadav",
                    text: "The best insurance comparison website in Nepal (test increase in length)."
                }
            ]
        }
    ];

    const getNextIndex = (index, step) => {
        return (index + step) % reviews.length;
    };

    const getPreviousIndex = (index, step) => {
        return (index - step + reviews.length) % reviews.length;
    };

    const handleLeftArrowClick = () => {
        setFade("fade-out-right");
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = getPreviousIndex(prevIndex, batchCount);
                return newIndex;
            });
            setFade("fade-in-left");
        }, 200); // Duration of the fade-out animation
        setTimeout(() => setFade(""), 1000); // Reset fade state after animations
        resetTimer();
    };

    const handleRightArrowClick = () => {
        setFade("fade-out-left");
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = getNextIndex(prevIndex, batchCount);
                return newIndex;
            });
            setFade("fade-in-right");
        }, 200); // Duration of the fade-out animation
        setTimeout(() => setFade(""), 1000); // Reset fade state after animations
        resetTimer();
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            handleRightArrowClick();
        }, 10000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearTimeout(timerRef.current);
    }, [currentIndex]);

    return (
        <div className="reviews">
            <div className="heading">
                <div className="headingTitle">Reviews</div>
                <div className="arrow">
                    <div className="arrowLeft" onClick={handleLeftArrowClick}>
                    ←
                    </div>
                    <div className="arrowRight" onClick={handleRightArrowClick}>
                    →
                    </div>
                </div>
            </div>
            <div className={`allReviewsContainer ${fade}`}>
                {reviews
                    .slice(currentIndex, currentIndex + batchCount)
                    .concat(reviews.slice(0, Math.max(0, (currentIndex + batchCount) - reviews.length)))
                    .map((batch, idx) => (
                        <div className="reviewBatch" id={batch.id} key={idx}>
                            {batch.reviews.map((review) => (
                                <div className="review" key={review.id}>
                                    <div className="reviewContent">
                                        <div className="reviewHeader">
                                            <div className="reviewerPhoto" id={review.id}></div>
                                            <div className="reviewerName">{review.name}</div>
                                            <div className="reviewQuote">”</div>
                                        </div>
                                        <div className="reviewText">
                                            <p>{review.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}