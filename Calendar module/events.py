# -*- coding: utf-8 -*-
import datetime
from setup import get_service
from calendars import get_calendarid
from dateutil import parser

service = get_service()

#returns the event id for the given event name
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
    
#need to modify the datetime and mail 
def add_event_details():
     title = input(str("Event Title: "))
     descrip = input(str("Description: "))
     #timeZone = input(str("TimeZone: "))
     startdate_string = str(input("Start datetime(yyyy-mm-dd hh:mm): "))
     startTime = datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat()
     enddate_string = str(input("End datetime(yyyy-mm-dd hh:mm): "))
     endTime = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat()
     #mail_id = str(input("Attendees email ID(with space between each id): "))
     #list_of_mail = mail_id.split()
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
     return event

#to add an event to the calendar
def add_event():
    calendar = input(str("Calendar name: "))
    cal_id = get_calendarid(calendar)
    if cal_id == '':
        print('Calendar not found.')
    else:
        entry = add_event_details()
        event = service.events().insert(calendarId=cal_id, body=entry).execute()

#to cancel/remove an event from the calendar
def cancel_event():
    calendar = input(str("Calendar name: "))
    calendar = get_calendarid(calendar)
    if calendar == '':
        print('Calendar not found.')
    else:
        event = input(str("Event name: "))
        event = get_eventid(event,calendar)
        if event == '':
            print('Event not found')
        else:
            service.events().delete(calendarId=calendar, eventId=event).execute()

#to list the events(startTime and name) for specific time under the particular calendars
def list_events(): 
    calendar = input(str("Calendar name: "))
    calendar = get_calendarid(calendar)
    if calendar == '':
        print('Calendar not found.')
    else:   
        startdate_string = str(input("Start datetime(yyyy-mm-dd hh:mm): "))
        time_min= datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat() + 'Z'
        enddate_string = str(input("End datetime(yyyy-mm-dd hh:mm): "))
        time_max = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat() + 'Z'
        events_result = service.events().list(calendarId=calendar, timeMax=time_max, timeMin=time_min)
        events_result = events_result.execute()
        events = events_result.get('items', [])
        if not events:
            print('No upcoming events found.')
            return
        # Prints the start and name of the events
        # add the end time of the event if necessary
        print("\nList of events\n\n\tTime\t\tEvent")
        for event in events:
            start = event['start'].get('dateTime', event['start'].get('dateTime'))               
            start = parser.isoparse(start)
            #need modifcation for the datetime displayed as output
            print(start, event['summary'])

#to update the event timings
def update_event():
    calendar = input(str("Calendar name: "))
    calendar = get_calendarid(calendar)
    if calendar == '':
        print('Calendar not found')
    else:
        event_name = input(str("Event name to be changed: "))
        e_id = get_eventid(event_name, calendar)
        #display the event original details here    
        #to update more than just the title information ask for what field changes are required
        event = service.events().get(calendarId=calendar, eventId=e_id).execute()
        startdate_string = str(input("Start datetime(yyyy-mm-dd hh:mm): "))
        startTime= datetime.datetime.strptime(startdate_string, "%Y-%m-%d %H:%M").isoformat() 
        enddate_string = str(input("End datetime(yyyy-mm-dd hh:mm): "))
        endTime = datetime.datetime.strptime(enddate_string, "%Y-%m-%d %H:%M").isoformat()
        event['start']['dateTime'] = startTime
        event['end']['dateTime'] = endTime
        updated_event = service.events().update(calendarId=calendar, eventId=event['id'], body=event).execute()
        
add_event()
