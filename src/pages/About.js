import { Link } from "react-router-dom";
import { jobs } from "../utils/jobHelpers";

const values = [
    {
        icon: "bi-people",
        title: "People First",
        text: "We build every feature with candidates and employers in mind — simple, transparent, and human.",
    },
    {
        icon: "bi-lightbulb",
        title: "Innovation",
        text: "We constantly improve our search, filters, and matching so the right role finds you faster.",
    },
    {
        icon: "bi-shield-lock",
        title: "Trust & Quality",
        text: "Every listing is reviewed and every company is verified. No spam, no fake postings — ever.",
    },
];

export default function About() {
    const companyCount = new Set(jobs.map((job) => job.company)).size;

    return (
        <div className="jc-page">
            <section className="jc-hero py-5">
                <div className="container text-center py-3">
                    <h1 className="display-5 fw-bold mb-2">About JobConnect</h1>

                    <p
                        className="lead mb-0 mx-auto"
                        style={{ maxWidth: "620px", color: "#c7d7f5" }}
                    >
                        We're on a mission to make finding your dream job simple, fast,
                        and enjoyable.
                    </p>
                </div>
            </section>

            <section className="py-5">
                <div className="container py-3">
                    <div className="row g-5 align-items-center">
                        <div className="col-12 col-lg-6">
                            <h2 className="fw-bold mb-3">Our Story</h2>

                            <p className="text-secondary">
                                JobConnect was founded on a simple idea: job searching
                                shouldn't feel like a full-time job. Traditional job boards
                                are cluttered, slow, and full of outdated listings.
                            </p>

                            <p className="text-secondary">
                                Today, JobConnect features {jobs.length}+ curated roles from{" "}
                                {companyCount}+ verified companies across software, design,
                                data, marketing, and more.
                            </p>

                            <Link
                                to="/jobs"
                                className="btn btn-primary rounded-pill px-4 mt-2"
                            >
                                Explore Open Roles
                            </Link>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="card jc-card p-4 text-center">
                                        <h3 className="fw-bold text-primary">
                                            {jobs.length}+
                                        </h3>
                                        <span className="jc-meta">Live Jobs</span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="card jc-card p-4 text-center">
                                        <h3 className="fw-bold text-primary">
                                            {companyCount}+
                                        </h3>
                                        <span className="jc-meta">Companies</span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="card jc-card p-4 text-center">
                                        <h3 className="fw-bold text-primary">12K+</h3>
                                        <span className="jc-meta">Candidates</span>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="card jc-card p-4 text-center">
                                        <h3 className="fw-bold text-primary">95%</h3>
                                        <span className="jc-meta">Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 jc-section-light">
                <div className="container py-3">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Our Values</h2>
                        <p className="text-secondary">
                            What drives everything we do
                        </p>
                    </div>

                    <div className="row g-4">
                        {values.map((value) => (
                            <div
                                className="col-12 col-md-4"
                                key={value.title}
                            >
                                <div className="card jc-card h-100 p-4 text-center">
                                    <span className="jc-icon-circle mx-auto mb-3">
                                        <i className={`bi ${value.icon}`}></i>
                                    </span>

                                    <h5 className="fw-bold">{value.title}</h5>

                                    <p className="text-secondary small mb-0">
                                        {value.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="jc-cta p-4 p-md-5 text-center">
                        <h2 className="fw-bold mb-2">
                            Join the JobConnect Community
                        </h2>

                        <p
                            className="mb-4 mx-auto"
                            style={{ maxWidth: "520px", color: "#c7d7f5" }}
                        >
                            Have questions or want to partner with us?
                            We'd love to hear from you.
                        </p>

                        <Link
                            to="/contact"
                            className="btn btn-light btn-lg rounded-pill px-5 fw-semibold text-primary"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}