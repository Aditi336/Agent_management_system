import { useState } from "react";
import { Navbar } from "./Navbar";
import "../css/home.css";

const slides = [
  {
    id: 1,
    image: "https://www.shutterstock.com/shutterstock/photos/662072797/display_1500/stock-vector-unhappy-sleepy-sad-office-worker-business-woman-character-has-lot-of-hard-work-vector-flat-cartoon-662072797.jpg",
    heading: "Too many tasks to manage?",
    subheading: "Why fear? When AgentM is here!",
    divimg:"section-1-divimg",
    img:"section-1-img",
    home:"section-1-home",
    mainheading_id:"section-1-mainheading",
    subheading_id:"section-1-subheading",
    sub:"section-1-sub"
  },
  {
    id: 2,
    image: "https://empmonitor.com/blog/wp-content/uploads/2024/05/how-is-workload-measured-1024x576.webp",
    heading: "AgentM",
    subheading: "AgentM is a smart, intuitive platform built to simplify task distribution and management for field teams and agents.",
    divimg:"section-2-divimg",
    img:"section-2-img",
    home:"section-2-home",
    mainheading_id:"section-2-mainheading",
    subheading_id:"section-2-subheading",
    sub:"section-2-sub"

  },
];

export const Sample = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <Navbar />
      <div className="carousel-container">
        <div className="carousel-slide"  id={slides[currentSlide].home} onClick={handleNext}>
          <div id={slides[currentSlide].divimg}>
            <img id={slides[currentSlide].img} src={slides[currentSlide].image} alt={`Slide ${currentSlide + 1}`} />
          </div>
          <div id={slides[currentSlide].sub}>
            <div id={slides[currentSlide].mainheading_id}>{slides[currentSlide].heading}</div>
            <div id={slides[currentSlide].subheading_id}>{slides[currentSlide].subheading}</div>
          </div>
        </div>
        <div className="slide-indicator">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={idx === currentSlide ? "dot active" : "dot"}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
