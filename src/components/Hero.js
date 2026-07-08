import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { jobs } from "../utils/jobHelpers";

const popularSearches = [
    "React",
    "Designer",
    "Remote",
    "Data Science",
    "Marketing",
];

export default function Hero() {
    const companyCount = new Set(jobs.map((job) => job.company)).size;

    return (
        <section className="jc-hero py-5">
            <div className="container py-4 py-lg-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <span className="badge rounded-pill jc-chip mb-3 px-3 py-2 fw-medium">
                            <i className="bi bi-stars me-1"></i>
                            {jobs.length}+ Open Roles from {companyCount}+ Top Companies
                        </span>

                        <h1 className="display-4 mb-3">
                            Find Your <span className="jc-hero-highlight">Dream Job</span>
                            <br className="d-none d-md-block" />
                            Faster Than Ever
                        </h1>

                        <p className="lead mb-4" style={{ color: "#c7d7f5" }}>
                            Search thousands of hand-picked opportunities from the world's
                            most innovative companies — all in one place.
                        </p>

                        <SearchBar />

                        <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
                            <span
                                className="small"
                                style={{ color: "#9db6e4" }}
                            >
                                Popular:
                            </span>

                            {popularSearches.map((term) => (
                                <Link
                                    key={term}
                                    to="/jobs"
                                    className="badge rounded-pill jc-chip text-decoration-none px-3 py-2"
                                >
                                    {term}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}