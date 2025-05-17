import { useState } from "react";
import "../css/home.css";
import testimonal from "../assets/testimonal"
import slides from "../assets/slides"
export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // console.log(slides[0].divimg);
  };

  return (
    <>
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
      <div id="section-heading_testimonals">What our customers say</div>
      <section id="testimonal_section">
         <ul className="testimonial-list">
          {testimonal.map((item, index) => (
            <li key={index}>
              <div className="card">
                <h4 className="card_h4"> {item.name}</h4>
                <p className ="card_li">{item.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
