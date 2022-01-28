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

  const createItem = (item) => {
    const tempItems = items.slice();
    tempItems.push(item);
    setItems(tempItems);
  }

  const deleteItem = (item) => {
    const event = Object.assign({}, selectedEvent)
    event.roles.forEach(role => {
      const index = role.items.indexOf(item.uniqueId);
      if (index > -1 ) {
        role.items.splice(index, 1);
      }
    })

    setSelectedEvent(event);

    const tempItems = items.slice();
    const index = tempItems.indexOf(item);
    if (index > -1) {
      tempItems.splice(index, 1);
      setItems(tempItems);
    }
  }

  return {
    events,
		setEvents,
    selectedEvent,
    setSelectedEvent,
		items,
		setItems,
    createItem,
    deleteItem
  };
}

export function ProvideEvent ({ children }) {
	const context = useProvideEvent();

	return (
		<eventContext.Provider value={context}>
      {children}
		</eventContext.Provider>
	)
}

ProvideEvent.propTypes = {
	children: PropTypes.object
}