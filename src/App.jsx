import { useEffect, useRef, useState } from "react";
import "./App.css"

function App() {
  const [tenSecond, setTenSecond] = useState(10)
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const intRef = useRef()
  const videoRef = useRef()
  const imgRef = useRef()

  const In = () => {
    imgRef.current.style.transform = "scale(1.2)"
    imgRef.current.style.transition = "transform 0.3s ease"
  }

  const Out = () => {
    imgRef.current.style.transform = "scale(1)"
  }

  const handlePlay = () => {
    videoRef.current.play()
  }

  const handlePause = () => {
    videoRef.current.pause()
  }

  const handleForward = () => {
    videoRef.current.currentTime += 5
  }

  const handleBackward = () => {
    videoRef.current.currentTime -= 5
  }


   const startTenSecond = () => {
    clearInterval(intRef.current)
    setTenSecond(10)
    setCount(0)
    countRef.current = 0
    intRef.current = setInterval(() => {
      setTenSecond(prev => prev - 1)
    }, 1000)
  }

  useEffect(() => {
    if (tenSecond <= 0) {
      clearInterval(intRef.current)
      alert(`Clicked ${countRef.current}times!`)
    }
  }, [tenSecond])

  useEffect(() => {
    startTenSecond()
    return () => clearInterval(intRef.current)
  }, [])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "30px",
      textAlign: "center",
    }}>
      {/* 1 */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Timer: {tenSecond}</h1>
        <h2>Click Count: {count}</h2>
        <button onClick={() => {
          if (tenSecond > 0) setCount(prev => prev + 1)
          countRef.current += 1
        }}>Click me!</button>
      </div>
      {/* 2 */}
      <img ref={imgRef} onMouseEnter={In} onMouseLeave={Out}
        src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" alt=""
        style={{ borderRadius: "10px" }} />

      {/* 3 */}

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleBackward}>Back 5s</button>
        <button onClick={handleForward}>Forward 5s</button>
      </div>

      <video ref={videoRef} width={500} src="https://www.shutterstock.com/shutterstock/videos/19410358/preview/stock-footage-presentation-title-intro-seconds-loopable-intro-with-cloud-of-smoke-and-rays-of-light.webm"></video>
    </div>
  )
}

export default App
