import React, { useState, useEffect } from "react";

function Timetable({ tasks }) {
    const defaultHours = Array.from({ length: 16 }, (_, i) => `${7 + i}:00`);
    const [timeSlots, setTimeSlots] = useState(defaultHours);

    useEffect(() => {
        let updatedSlots = new Set(defaultHours);
        Object.values(tasks).flat().forEach(({ start, end }) => {
            updatedSlots.add(start);
            updatedSlots.add(end);
        });
        setTimeSlots([...updatedSlots].sort((a, b) => timeToMinutes(a) - timeToMinutes(b)));
    }, [tasks]);

    function timeToMinutes(time) {
        let [hour, minute = 0] = time.split(":").map(Number);
        return hour * 60 + minute;
    }

    return (
        <div className="timetable">
            <div className="time-column">
                <div className="empty-cell"></div>
                {timeSlots.map((time, index) => (
                    <div key={index} className="time-slot">{time}</div>
                ))}
            </div>
            <div className="task-columns">
                {Object.keys(tasks).map((day, dayIndex) => (
                    <div key={dayIndex} className="task-column">
                        <div className="day-header">{day.slice(0, 3)}</div>
                        <div className="time-rows">
                            {timeSlots.map((time, rowIndex) => (
                                <div key={rowIndex} className="time-row">
                                    {tasks[day].map((task, index) => {
                                        const startMinutes = timeToMinutes(task.start) - timeToMinutes(timeSlots[0]);
                                        return (
                                            <div 
                                                key={index} 
                                                className="task" 
                                                style={{
                                                    top: `${(startMinutes / 60) * 30}px`,
                                                    height: `${(timeToMinutes(task.end) - timeToMinutes(task.start)) / 2}px`
                                                }}
                                            >
                                                {task.name} ({task.start} - {task.end})
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timetable;