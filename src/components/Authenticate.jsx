import { useState } from "react";

const Authenticate = ({ token }) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/authenticate",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();
            setSuccessMessage(`Welcome, ${result.data.username}!`);
        } catch (error) {
            console.log(error.message);
            setError(
                "Need a token to be verified! Sign up first.",
                error.message
            );
            // Clear error after 4 seconds (4000 milliseconds)
            setTimeout(() => {
                setError(null);
            }, 4000);
        }
    }

    return (
        <div className="container">
            <h2>Authenticate!</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
};

export default Authenticate;
