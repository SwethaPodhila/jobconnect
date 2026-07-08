import { Link } from "react-router-dom";

const socials = [
    { icon: "bi-linkedin", label: "LinkedIn" },
    { icon: "bi-twitter-x", label: "X (Twitter)" },
    { icon: "bi-facebook", label: "Facebook" },
    { icon: "bi-instagram", label: "Instagram" },
];

export default function Footer() {
    return (
        <footer className="jc-footer pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row g-4 pb-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="jc-logo">
                                <i className="bi bi-briefcase-fill"></i>
                            </span>

                            <span className="fs-4 fw-bold text-white">
                                Job<span style={{ color: "#7db8ff" }}>Connect</span>
                            </span>
                        </div>

                        <p className="small mb-3" style={{ maxWidth: "320px" }}>
                            JobConnect helps thousands of candidates find their dream jobs and
                            connects companies with top talent — fast, simple, and free.
                        </p>

                        <div className="d-flex gap-2">
                            {socials.map((social) => (
                                <a
                                    href="/"
                                    key={social.icon}
                                    className="jc-social"
                                    aria-label={social.label}
                                >
                                    <i className={`bi ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="col-6 col-md-3 col-lg-2">
                        <h6 className="text-white fw-bold mb-3">Quick Links</h6>

                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/jobs">Browse Jobs</Link>
                            </li>

                            <li>
                                <Link to="/about">About Us</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3 col-lg-3">
                        <h6 className="text-white fw-bold mb-3">Categories</h6>

                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/jobs">Software Development</Link>
                            </li>

                            <li>
                                <Link to="/jobs">Design</Link>
                            </li>

                            <li>
                                <Link to="/jobs">Marketing</Link>
                            </li>

                            <li>
                                <Link to="/jobs">Data Science</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <h6 className="text-white fw-bold mb-3">Contact Info</h6>

                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <i className="bi bi-geo-alt me-2"></i>
                                Hyderabad, Telangana, India
                            </li>

                            <li>
                                <i className="bi bi-envelope me-2"></i>
                                careers@jobconnect.com
                            </li>

                            <li>
                                <i className="bi bi-telephone me-2"></i>
                                +91 90000 00000
                            </li>
                        </ul>
                    </div>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.12)" }} />

                <p className="small text-center mb-0 pt-2">
                    © {new Date().getFullYear()} JobConnect. All rights reserved.
                </p>
            </div>
        </footer>
    );
}