import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (keyword.trim()) {
            params.append("q", keyword.trim());
        }

        if (location.trim()) {
            params.append("location", location.trim());
        }

        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card jc-search-card border-0 p-2 p-md-3"
        >
            <div className="row g-2 align-items-center">
                <div className="col-12 col-md-5">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-0">
                            <i className="bi bi-search text-primary"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Job title, company, or skills"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-4 border-top border-md-0 pt-2 pt-md-0">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-0">
                            <i className="bi bi-geo-alt text-primary"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="City or Remote"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-3 d-grid">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-3 fw-semibold"
                    >
                        Search Jobs
                    </button>
                </div>
            </div>
        </form>
    );
}