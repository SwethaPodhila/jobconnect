import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Jobs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export default function SiteNavbar() {
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const pathname = location.pathname;

    const isActive = (to) => {
        return to === "/"
            ? pathname === "/"
            : pathname.startsWith(to);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top jc-navbar py-3">
            <div className="container">
                <Link
                    to="/"
                    className="navbar-brand fw-bold d-flex align-items-center gap-2 fs-4"
                    onClick={() => setOpen(false)}
                >
                    <span className="jc-logo">
                        <i className="bi bi-briefcase-fill"></i>
                    </span>

                    <span>
                        Job<span className="text-primary">Connect</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 pt-3 pt-lg-0">
                        {navLinks.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`nav-link fw-medium px-lg-3 ${isActive(link.to)
                                        ? "active text-primary"
                                        : ""
                                        }`}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                            <Link
                                to="/jobs"
                                className="btn btn-primary rounded-pill px-4"
                                onClick={() => setOpen(false)}
                            >
                                Browse Jobs
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}