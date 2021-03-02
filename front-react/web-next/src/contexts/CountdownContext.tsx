import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";


interface CountdownContextData {
    minutes: number
    seconds: number
    isActive: boolean
    hasFinished: boolean
    startCountDown: () => void
    resetCountdown: () => void
}

interface CountodownProviderProps {
    children: ReactNode
}

let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData )

export function CountdownProvider({children}: CountodownProviderProps ) {
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const { startNewChallenge } = useContext(ChallengesContext)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(.05 * 60)
    }

    function startCountDown() {
        setIsActive(true)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }

    }, [isActive, time])

    return(
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                isActive,
                hasFinished,
                startCountDown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
}