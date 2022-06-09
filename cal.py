import datetime
from setup import get_service
from calendars import get_calendarid
from dateutil import parser

service = get_service()

#we need event id to perform event operations
#get_eventid fetchs the event id with the help of the eventname and calendarname
def get_eventid(name, calendar):
    page_token = None
    eventid = ''
    while True:
      events = service.events().list(calendarId=calendar, pageToken=page_token).execute()
      for event in events['items']:
         if event['summary'] == name:
             eventid = event['id']
      page_token = events.get('nextPageToken')
      if not page_token:
        break
    if eventid == '':
        return ''
    else:
        return eventid

#dis fn() creates an event; inputs calendarname, event title, descrip/agenda of event
#begin is the starting time of the event - str
#end is the ending time of the event - str
def create_event(calendarName, title, descrip, begin, end):
     startdate_string = begin 
     #timestr is converted into datetime format
     startTime = datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat()
     enddate_string = end
     endTime = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat()
     event = {
      'summary': title,
      'description': descrip,
      'start': {
        'dateTime': startTime,
        'timeZone': 'Asia/Kolkata',
      },
      'end': {
        'dateTime': endTime,
        'timeZone': 'Asia/Kolkata',
      }
     }
     #fetching calendar id using calendarName
     cal_id = get_calendarid(calendarName)
     if cal_id == '':
        return('Calendar not found.')
     else:
        #service variable is the one that connects you with the google calendar
        #adding an event using the events().insert() function
        #parameters calendar id and event details & that's executed
        entry = service.events().insert(calendarId=cal_id, body=event).execute()


#dis fun() delete an event in the calendar;
#inputs calendarname, eventname
#the calendar id and event id is later fetched for usage
def delete_event(calendarName, eventName):
    calendar = get_calendarid(calendarName)
    if calendar == '':
        return('Calendar not found.')
    else:
        event = get_eventid(eventName,calendar)
        if event == '':
            return('Event not found')
        else:
            #events().delete() is the fn() that deletes your event from the associated calendar
            service.events().delete(calendarId=calendar, eventId=event).execute()

#dis fn() lists the events between a particular start time and end time
#inputs calendarname, start time - begin, end time - end
#the begin & end parameter are timestr which will be later converted before use
#need to edit the display statement of the list of events
def list_events(calendarName, begin, end):
    calendar = get_calendarid(calendarName)
    if calendar == '':
        return('Calendar not found.')
    else:   
        startdate_string = begin
        time_min= datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat() + 'Z'
        enddate_string = end
        time_max = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat() + 'Z'
        events_result = service.events().list(calendarId=calendar, timeMax=time_max, timeMin=time_min)
        events_result = events_result.execute()
        events = events_result.get('items', [])
        if not events:
            return('No upcoming events found.')
        return events
    

#dis fn() updates the time changes in a particular event
#inputs calendarname, eventname, new start time & new end time of the event
# the newStart & newEnd time str will be later converted into datetime format for updating
def update_event(calendarName, eventName, newStart, newEnd):
    calendar = get_calendarid(calendarName)
    if calendar == '':
        return('Calendar not found')
    else:
        e_id = get_eventid(eventName, calendar)
        #display the event original details here    
        #to update more than just the title information ask for what field changes are required
        event = service.events().get(calendarId=calendar, eventId=e_id).execute()
        startdate_string = newStart
        startTime= datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat() 
        enddate_string = newEnd
        endTime = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat()
        event['start']['dateTime'] = startTime
        event['end']['dateTime'] = endTime
        updated_event = service.events().update(calendarId=calendar, eventId=event['id'], body=event).execute()
