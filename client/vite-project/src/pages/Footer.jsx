import "../css/footer.css";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section newsletter">
        <h3>📬 Stay Updated</h3>
        <p>Subscribe to our newsletter to never miss an update.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit" disabled>Subscribe</button>
        </form>
      </div>

      <div className="footer-section contact-info">
        <h3>📞 Contact Us</h3>
        <p>
          Phone: <a href="tel:9900099922">99000 99922</a>
        </p>
        <p>
          Email: <a href="mailto:info@agentm.in">info@agentm.in</a>
        </p>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AgentM. All rights reserved.</p>
      </div>
    </footer>
  );
};
