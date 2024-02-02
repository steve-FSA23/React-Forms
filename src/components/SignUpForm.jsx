import { useState } from "react";

const SignUpForm = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        // Validate username and password
        if (username.length < 8 || password.length < 8) {
            setError(
                "Username and password must be at least 8 characters long."
            );
            // Clear error after 4 seconds (4000 milliseconds)
            setTimeout(() => {
                setError(null);
            }, 4000);
            return;
        }

        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );
            const result = await response.json();

            console.log(result);
            setToken(result.token);
        } catch (error) {
            console.error("Something went wrong!", error.message);
            setError(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Submit</button>
            </form>
        </div>
    );
};

export default SignUpForm;
