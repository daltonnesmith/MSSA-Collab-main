import React, { useState } from "react";

function LoginForm({ Login, error }) {
    const [detail, setDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submithandler = (e) => {
        e.preventDefault();
        Login(detail);
    };

    return (
        <form onSubmit={submithandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {error != "" ? <div className="error">{error}</div> : ""}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) =>
                            setDetails({ ...detail, name: e.target.value })
                        }
                        value={detail.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) =>
                            setDetails({ ...detail, email: e.target.value })
                        }
                        value={detail.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) =>
                            setDetails({ ...detail, password: e.target.value })
                        }
                        value={detail.password}
                    />
                </div>
                <input type="submit" value="LOGIN"></input>
            </div>
        </form>
    );
}

export default LoginForm;
