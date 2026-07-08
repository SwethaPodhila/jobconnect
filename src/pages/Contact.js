import React, { useState } from "react";

const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const socials = [
    { icon: "bi-linkedin", label: "LinkedIn" },
    { icon: "bi-twitter-x", label: "X (Twitter)" },
    { icon: "bi-facebook", label: "Facebook" },
    { icon: "bi-instagram", label: "Instagram" },
];

function validate(values) {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
        errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!values.subject.trim()) {
        errors.subject = "Please enter a subject.";
    }

    if (values.message.trim().length < 10) {
        errors.message = "Your message must be at least 10 characters.";
    }

    return errors;
}

export default function Contact() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            setSubmitted(true);
            setValues(initialValues);

            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        }
    };

    return (
        <div className="jc-page">
            <section className="jc-hero py-5">
                <div className="container text-center py-3">
                    <h1 className="display-5 fw-bold mb-2">Contact Us</h1>

                    <p
                        className="lead mb-0 mx-auto"
                        style={{ maxWidth: "560px", color: "#c7d7f5" }}
                    >
                        Have a question, feedback, or partnership idea? Send us a message.
                    </p>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-4">
                    {/* Contact Form */}
                    <div className="col-12 col-lg-7">
                        <div className="card jc-card p-4 p-md-5">
                            <h4 className="fw-bold mb-4">Send Us a Message</h4>

                            {submitted && (
                                <div
                                    className="alert alert-success d-flex align-items-center gap-2"
                                    role="alert"
                                >
                                    <i className="bi bi-check-circle-fill"></i>
                                    <div>
                                        Thank you! Your message has been sent. We'll get back to you
                                        shortly.
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""
                                                }`}
                                            placeholder="Jane Doe"
                                            value={values.name}
                                            onChange={(e) =>
                                                handleChange("name", e.target.value)
                                            }
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""
                                                }`}
                                            placeholder="jane@example.com"
                                            value={values.email}
                                            onChange={(e) =>
                                                handleChange("email", e.target.value)
                                            }
                                        />

                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control ${errors.subject ? "is-invalid" : ""
                                                }`}
                                            placeholder="How can we help?"
                                            value={values.subject}
                                            onChange={(e) =>
                                                handleChange("subject", e.target.value)
                                            }
                                        />

                                        {errors.subject && (
                                            <div className="invalid-feedback">
                                                {errors.subject}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium">
                                            Message
                                        </label>

                                        <textarea
                                            rows="5"
                                            className={`form-control ${errors.message ? "is-invalid" : ""
                                                }`}
                                            placeholder="Tell us more..."
                                            value={values.message}
                                            onChange={(e) =>
                                                handleChange("message", e.target.value)
                                            }
                                        ></textarea>

                                        {errors.message && (
                                            <div className="invalid-feedback">
                                                {errors.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-pill px-5"
                                        >
                                            <i className="bi bi-send me-2"></i>
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <aside className="col-12 col-lg-5">
                        <div className="card jc-card p-4 mb-4">
                            <h5 className="fw-bold mb-3">
                                Contact Information
                            </h5>

                            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                                <li className="d-flex gap-3">
                                    <span
                                        className="jc-icon-circle"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        <i className="bi bi-geo-alt"></i>
                                    </span>

                                    <div>
                                        <div className="fw-semibold">
                                            Office Address
                                        </div>

                                        <span className="jc-meta">
                                            500 Market Street, Suite 900, San Francisco,
                                            CA 94105
                                        </span>
                                    </div>
                                </li>

                                <li className="d-flex gap-3">
                                    <span
                                        className="jc-icon-circle"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        <i className="bi bi-envelope"></i>
                                    </span>

                                    <div>
                                        <div className="fw-semibold">Email Us</div>

                                        <a
                                            href="mailto:hello@jobconnect.com"
                                            className="jc-meta jc-hover-link"
                                        >
                                            hello@jobconnect.com
                                        </a>
                                    </div>
                                </li>

                                <li className="d-flex gap-3">
                                    <span
                                        className="jc-icon-circle"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        <i className="bi bi-telephone"></i>
                                    </span>

                                    <div>
                                        <div className="fw-semibold">Call Us</div>

                                        <a
                                            href="tel:+14155550134"
                                            className="jc-meta jc-hover-link"
                                        >
                                            +1 (415) 555-0134
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="card jc-card p-4">
                            <h5 className="fw-bold mb-3">Follow Us</h5>

                            <p className="jc-meta">
                                Stay up to date with the latest jobs and
                                career tips.
                            </p>

                            <div className="d-flex gap-2">
                                {socials.map((social) => (
                                    <a
                                        href="/"
                                        key={social.icon}
                                        className="jc-icon-circle text-decoration-none"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            fontSize: "1.1rem",
                                        }}
                                        aria-label={social.label}
                                    >
                                        <i className={`bi ${social.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}