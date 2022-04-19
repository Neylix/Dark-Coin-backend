import PropTypes from 'prop-types';
import React, { useContext, createContext, useState } from 'react';
import * as api from './backend';

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
  const [selectedIndex, setSelectedIndex] = useState(null);
	const [items, setItems] = useState(null);

  const loadEvents = async () => {
    return new Promise((resolve, reject) => {
      api.getEvents().then(res => {
        setEvents(res);
        resolve(res);
      }).catch(() => reject())
    })
  }

  const selectEvent = (event) => {
    return new Promise((resolve, reject) => {
      api.getEventDatas(event).then( res => {
        setItems(res.items);
        event.roles = res.roles;
        setSelectedEvent(event);
        setSelectedIndex(events && events.indexOf(event) || 0)
        resolve()
      }).catch(() => reject())
    })
  }

  const cleanContext = () => {
    setEvents(null);
    setSelectedEvent(null);
    setItems(null);
  }

  const createItem = (item) => {
    return new Promise((resolve, reject) => {
      api.createItem(item).then(itemId => {
        item.uniqueId = itemId
        item.itemStatistics = []

        const tempItems = [...items]
        tempItems.push(item)
        setItems(tempItems)
        resolve()
      }).catch(() => reject())
    })
  }

  const deleteItem = (item) => {
    return new Promise((resolve, reject) => {
      api.deleteItem(item.uniqueId).then(() => {
        const event = {...selectedEvent}
        event.roles.forEach(role => {
          const index = role.items.indexOf(item.uniqueId);
          if (index > -1 ) {
            role.items.splice(index, 1);
          }
        })
    
        setSelectedEvent(event);
    
        const tempItems = [...items]
        const index = tempItems.indexOf(item);
        if (index > -1) {
          tempItems.splice(index, 1);
          setItems(tempItems);
        }
        resolve()
      }).catch(() => reject())
    })
  }

  const updateItem = (item) => {
    return new Promise((resolve, reject) => {
      api.updateItem(item).then(() => {
        const tempItems = [...items]
        const updatedItem = tempItems.find(it => it.uniqueId === item.uniqueId)
        const index = tempItems.indexOf(updatedItem)
        tempItems[index] = item
        setItems(tempItems)
        resolve()
      }).catch(() => reject())
    })
  }

  const createEvent = (event) => {
    return new Promise((resolve, reject) => {
      api.createEvent(event).then(eventId => {
        event.uniqueId = eventId
        event.roles = []
        const tempEvents = [...events]
        tempEvents.push(event)
        setEvents(tempEvents)
        setSelectedEvent(event)
        setSelectedIndex(tempEvents.indexOf(event))
        resolve()
      }).catch(() => reject())
    })
  }

  const updateEvent = (event) => {
    return new Promise((resolve, reject) => {
      api.updateEvent(event).then(() => {
        const tempEvents = [...events]
        const updatedEvent = tempEvents.find(ev => ev.uniqueId === event.uniqueId)
        const index = tempEvents.indexOf(updatedEvent)
        tempEvents[index] = event
        setEvents(tempEvents)
        setSelectedEvent(event)
        resolve()
      }).catch(() => reject())
    })
  }

  return {
    loadEvents,
    events,
    selectedEvent,
    selectEvent,
		items,
		cleanContext,
    createItem,
    deleteItem,
    updateItem,
    createEvent,
    updateEvent,
    selectedIndex
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