import "./App.css";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setError("");
      alert("Прекрасный email-адрес");
    } else {
      setError("Введен некорректный email");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Введите email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <button type="submit">Проверить</button>
      {error && (
        <p style={{ color: "rgb(255, 0, 0)", marginTop: "8px" }}>{error}</p>
      )}
    </form>
  );
}

export default App;
