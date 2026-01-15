import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
            <div className="text-center bg-white p-5 rounded-4 shadow" style={{ maxWidth: "500px" }}>
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <h2 className="fw-semibold mb-3">Oops! Page Not Found</h2>
                <p className="text-muted mb-4">
                    The page you're looking for doesn't exist or might have been moved.
                </p>

                <Link to="/" className="btn btn-primary px-4 py-2">
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default Notfound
