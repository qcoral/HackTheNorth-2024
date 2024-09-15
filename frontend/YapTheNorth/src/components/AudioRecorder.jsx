import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder = ({ id, setTeamCount, teamCount, clearMessage, triggerConfetti }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (clearMessage) {
      setResponseMessage('');
    }
  }, [clearMessage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('id', id);

    try {
      const response = await axios.post('http://localhost:3000/npcresponse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
      if (response.data.team > 0.8) {
        console.log("it's a success!!");
        console.log("team count: " + teamCount);
        setTeamCount(parseInt(id)); // Update the team count with the current ID
        triggerConfetti(); // Trigger confetti
      }
      setResponseMessage(response.data.response); // Update the state with the response message
    } catch (err) {
      console.error('Error uploading audio:', err);
    }
  };

  return (
    <div>
      <div style={{background: "lightblue", padding: "20px", margin: "10px", borderRadius: "10px"}}>
         <p>{responseMessage}</p>
      </div>
      
      <button onClick={startRecording} disabled={recording}>
        Say a message..
      </button>
      <button onClick={stopRecording} disabled={!recording} style={{margin: "10px"}}>
        Stop!
      </button>
      <button onClick={uploadAudio} disabled={!audioBlob}>
        Send it to them!
      </button>
    </div>
  );
};

export default AudioRecorder;