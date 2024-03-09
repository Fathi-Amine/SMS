import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {scheduleData} from "../data/dummy.jsx";
const Calender = () => {
    const eventRender = (info) => {
        if (!info.el) { // Check if the element exists
            return null; // Return null if not available
        }
        const eventEl = document.createElement('div');
        eventEl.classList.add('event-card');

        const title = document.createElement('h3');
        title.textContent = info.event.title;
        eventEl.appendChild(title);

        const time = document.createElement('p');
        const startTime = new Date(info.event.start).toLocaleTimeString();
        const endTime = new Date(info.event.end).toLocaleTimeString();
        time.textContent = `${startTime} - ${endTime}`;
        eventEl.appendChild(time);

        info.el.innerHTML = '';
        info.el.appendChild(eventEl);

        return info.el;
    };
    const events = scheduleData.map((event) => ({
        id: event.Id, // Use a unique identifier for each event
        title: event.Subject,
        start: event.StartTime, // Parse the StartTime string into a valid date object
        end: event.EndTime,   // Parse the EndTime string into a valid date object
        color: event.CategoryColor, // Set the background color for the event
    }));

    return (

        <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-auto"}>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
                /*eventContent={eventRender}*/
            />
        </div>
    );
};

export default Calender;