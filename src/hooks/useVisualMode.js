import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(newMode, replace = false) {
        if (replace) {
            let newHistory = history;
            newHistory.pop();
            setHistory([...newHistory, newMode])
        } else {
            setHistory([...history, newMode]);
        };
        setMode(newMode);
    };

    function back() {
        setMode(() => history[history.length-2] || history[0]);
        setHistory((oldHistory) => {
            let newHistory = oldHistory;
            newHistory.pop();
            if (newHistory.length === 0) {
                return [initial];
            }
            return newHistory;
        });
    }

    return {mode, transition, back};
}