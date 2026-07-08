import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import { useBookmarks } from "../hooks/useBookmarks";
import { categories, jobs, sortJobs } from "../utils/jobHelpers";

const categoryIcons = {
    "Software Development": "bi-code-slash",
    Design: "bi-palette",
    Marketing: "bi-megaphone",
    "Data Science": "bi-graph-up",
    Finance: "bi-bank",
    Sales: "bi-cart-check",
    "Human Resources": "bi-people",
    "Customer Support": "bi-headset",
    "Product Management": "bi-kanban",
    DevOps: "bi-cloud-check",
};

const whyChooseUs = [
    {
        icon: "bi-lightning-charge",
        title: "Fast & Easy Applications",
        text: "Apply to your favorite roles in just a few clicks with a streamlined, distraction-free experience.",
    },
    {
        icon: "bi-patch-check",
        title: "Verified Companies",
        text: "Every employer on JobConnect is vetted, so you spend time on real opportunities — not spam.",
    },
    {
        icon: "bi-sliders",
        title: "Smart Search & Filters",
        text: "Filter by type, experience, category, location, and salary to find exactly what fits you.",
    },
    {
        icon: "bi-shield-check",
        title: "100% Free for Candidates",
        text: "Searching, bookmarking, and applying are completely free. Your dream job shouldn't cost a thing.",
    },
];

export default function HomePage() {
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const featuredJobs = sortJobs(jobs, "latest").slice(0, 6);
    console.log("Jobs:", jobs);
    console.log("Featured:", featuredJobs);

    const companyCount = new Set(jobs.map((job) => job.company)).size;

    return (
        <div className="jc-page">
            <Hero />

            {/* Featured Jobs */}
            <section className="py-5">
                <div className="container py-3">
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
                        <div>
                            <h2 className="fw-bold mb-1">Featured Jobs</h2>
                            <p className="text-secondary mb-0">
                                The latest opportunities, hand-picked for you
                            </p>
                        </div>

                        <Link
                            to="/jobs"
                            className="btn btn-outline-primary rounded-pill px-4"
                        >
                            View All Jobs
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>

                    <div className="row g-4">
                        {featuredJobs.map((job) => (
                            <div className="col-12 col-md-6 col-xl-4" key={job.id}>
                                <JobCard
                                    job={job}
                                    isBookmarked={isBookmarked(job.id)}
                                    onToggleBookmark={toggleBookmark}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-5 jc-section-light">
                <div className="container py-3">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-1">Browse by Category</h2>
                        <p className="text-secondary">
                            Explore roles across every field
                        </p>
                    </div>

                    <div className="row g-3">
                        {categories.map((category) => {
                            const count = jobs.filter(
                                (job) => job.category === category
                            ).length;

                            return (
                                <div
                                    className="col-6 col-md-4 col-lg-3"
                                    key={category}
                                >
                                    <Link
                                        to={`/jobs?category=${encodeURIComponent(category)}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="card jc-card jc-category-card h-100 text-center p-3">
                                            <span className="jc-icon-circle mx-auto mb-2">
                                                <i
                                                    className={`bi ${categoryIcons[category] || "bi-briefcase"
                                                        }`}
                                                ></i>
                                            </span>

                                            <h6 className="fw-bold mb-1 text-dark">
                                                {category}
                                            </h6>

                                            <span className="jc-meta">
                                                {count} open roles
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-5">
                <div className="container py-3">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-1">
                            Why Choose JobConnect?
                        </h2>

                        <p className="text-secondary">
                            Everything you need to land your next role
                        </p>
                    </div>

                    <div className="row g-4">
                        {whyChooseUs.map((item) => (
                            <div
                                className="col-12 col-md-6 col-lg-3"
                                key={item.title}
                            >
                                <div className="card jc-card h-100 p-4 text-center">
                                    <span className="jc-icon-circle mx-auto mb-3">
                                        <i className={`bi ${item.icon}`}></i>
                                    </span>

                                    <h5 className="fw-bold">{item.title}</h5>

                                    <p className="text-secondary small mb-0">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="pb-5">
                <div className="container">
                    <div className="jc-stats p-4 p-md-5">
                        <div className="row text-center g-4">
                            <div className="col-12 col-md-4">
                                <h2 className="display-5 fw-bold mb-0">
                                    {jobs.length}+
                                </h2>

                                <p
                                    className="mb-0 fw-medium"
                                    style={{ opacity: 0.9 }}
                                >
                                    Active Job Listings
                                </p>
                            </div>

                            <div className="col-12 col-md-4">
                                <h2 className="display-5 fw-bold mb-0">
                                    {companyCount}+
                                </h2>

                                <p
                                    className="mb-0 fw-medium"
                                    style={{ opacity: 0.9 }}
                                >
                                    Trusted Companies
                                </p>
                            </div>

                            <div className="col-12 col-md-4">
                                <h2 className="display-5 fw-bold mb-0">
                                    12k+
                                </h2>

                                <p
                                    className="mb-0 fw-medium"
                                    style={{ opacity: 0.9 }}
                                >
                                    Happy Candidates
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-5">
                <div className="container">
                    <div className="jc-cta p-4 p-md-5 text-center">
                        <h2 className="fw-bold mb-2">
                            Ready to Take the Next Step?
                        </h2>

                        <p
                            className="mb-4 mx-auto"
                            style={{
                                maxWidth: "520px",
                                color: "#c7d7f5",
                            }}
                        >
                            Join thousands of professionals who found their dream
                            jobs through JobConnect. Your next opportunity is one
                            search away.
                        </p>

                        <Link
                            to="/jobs"
                            className="btn btn-light btn-lg rounded-pill px-5 fw-semibold text-primary"
                        >
                            Explore Jobs Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}