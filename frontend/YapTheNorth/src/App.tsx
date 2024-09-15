import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AudioRecorder from "./components/AudioRecorder.jsx";
import Timer from "./components/Timer.jsx";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [recorderId, setRecorderId] = useState(0); // State variable to store the id
    const [teamCount, setTeamCount] = useState(0);
    const [isTeammate, setIsTeammate] = useState(Array(7).fill(false)); // State variable to track teammates

    const names = [
        "Angeldust",
        "Husk",
        "Charlie",
        "Lute",
        "Alastor",
        "Vox",
        "Carmilla",
    ];

    const increaseId = () => {
        setRecorderId((prevId) => (prevId + 1) % 7); // Increase and loop between 0-6
    };

    const decreaseId = () => {
        setRecorderId((prevId) => (prevId - 1 + 7) % 7); // Decrease and loop between 0-6
    };

    const handleSetTeamCount = (id) => {
        if (!isTeammate[id]) {
            setTeamCount((prevCount) => prevCount + 1);
            setIsTeammate((prevIsTeammate) => {
                const newIsTeammate = [...prevIsTeammate];
                newIsTeammate[id] = true;
                return newIsTeammate;
            });
        }
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <button onClick={decreaseId}>Decrease ID</button>
            <button onClick={increaseId}>Increase ID</button>
            <p className={isTeammate[recorderId] ? "teammate" : ""}>Name: {names[recorderId]}</p>
            <p>Team members: {teamCount}</p>
            <AudioRecorder id={recorderId.toString()} setTeamCount={handleSetTeamCount} teamCount={teamCount} /> {/* Pass the dynamic id and the function to update the team count */}
            <Timer teamCount={teamCount} /> {/* Pass the teamCount to Timer */}
        </>
    );
}

export default App;