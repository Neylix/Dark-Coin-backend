import PropTypes from 'prop-types';
import React, { useContext, createContext, useState } from 'react';

const defaultEventContext = {
	events: undefined,
	selectedEvent: undefined,
	items: undefined
}

const eventContext = createContext(defaultEventContext);

export default function useEvent() {
	return useContext(eventContext);
}

function useProvideEvent() {
  const [events, setEvents] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [items, setItems] = useState(null);

  return {
    events,
		setEvents,
    selectedEvent,
    setSelectedEvent,
		items,
		setItems
  };
}

export function ProvideEvent ({ children }) {
	const event = useProvideEvent();

	return (
		<eventContext.Provider value={event}>
				{children}
		</eventContext.Provider>
	)
}

ProvideEvent.propTypes = {
	children: PropTypes.object
}