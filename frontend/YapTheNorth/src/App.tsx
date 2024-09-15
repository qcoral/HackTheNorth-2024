import { useState, useEffect } from "react";
import AudioRecorder from "./components/AudioRecorder.jsx";
import Timer from "./components/Timer.jsx";
import "./App.css";

// Correct image imports
import img0 from "./assets/characters/img0.png";
import img1 from "./assets/characters/img1.png";
import img2 from "./assets/characters/img2.png";
import img3 from "./assets/characters/img3.png";
import img4 from "./assets/characters/img4.png";
import img5 from "./assets/characters/img5.png";
import img6 from "./assets/characters/img6.png";

const images = [img0, img1, img2, img3, img4, img5, img6];

function App() {
    const [count, setCount] = useState(0);
    const [recorderId, setRecorderId] = useState(0); // State variable to store the id
    const [teamCount, setTeamCount] = useState(0);
    const [isTeammate, setIsTeammate] = useState(Array(7).fill(false)); // State variable to track teammates
    const [clearMessage, setClearMessage] = useState(false); // State variable to clear message
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const names = [
        "Angeldust",
        "Husk",
        "Charlie",
        "Lute",
        "Alastor",
        "Vox",
        "Carmilla",
    ];

    useEffect(() => {
        setClearMessage(true);
        const timer = setTimeout(() => setClearMessage(false), 100); // Reset clearMessage after a short delay
        return () => clearTimeout(timer);
    }, [recorderId]);

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

    const toggleHowToPlay = () => {
      setShowHowToPlay((prevShow) => !prevShow);
    };

    return (
        <>

        <div>
          <p style={{fontSize: "32px", fontWeight: "bold", color: "#FF037D"}}>yap the north!</p>
        </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                    <button onClick={decreaseId}>previous character</button>
                </div>
                <div style={{ margin: "5px" }}>
                    <button onClick={increaseId}>next character</button>
                </div>
            </div>

            <div style={{width: "800px"}}>
              <div style={{ background: "lightblue", padding: "20px", margin: "10px", borderRadius: "10px" }}>
                <p className={isTeammate[recorderId] ? "teammate" : ""}>Name: {names[recorderId]}</p>
                <img src={images[recorderId]} alt={names[recorderId]} style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
            </div>
            
            <AudioRecorder id={recorderId.toString()} setTeamCount={handleSetTeamCount} teamCount={teamCount} clearMessage={clearMessage} /> 
            </div>
            
            

            <div>
                <Timer teamCount={teamCount} /> 
                <p>Team members: {teamCount} out of 3</p>
            </div>

            <div style={{ position: "fixed", bottom: "10px", left: "10px" }}>
                <button onClick={toggleHowToPlay}>How to Play</button>
            </div>

            {showHowToPlay && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
                    <h2>How to Play</h2>
                    <p>Welcome to Yap the North!</p>
                    <p>You're a hacker trying to find teammates. In order to win, you must convince three people here to join you.</p>
                    <p>In order to start recording, press "Say a Message". After you're done talking, press "Stop!". In order to send it to them, press "Send it to them!". It usually takes a few seconds to respond.</p>
                    <p>Try to minimize your time! There's a speedrun timer that will stop when you successfully find 3 teammates. We've gotten our time to 50 seconds - can you beat that?</p>
                    <p>Refresh the screen to start over.</p>
                    <p>Good luck!!</p>
                    <button onClick={toggleHowToPlay}>Close</button>
                </div>
            )}
        </>
    );
}

export default App;