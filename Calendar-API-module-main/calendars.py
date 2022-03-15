# -*- coding: utf-8 -*-

from setup import get_service
service = get_service()

#returns the calendar id for the given calendar name
def get_calendarid(cal_name):
    page_token = None
    calendar_id = ''
    while True:
      calendar_list = service.calendarList().list(pageToken=page_token).execute()
      calendars = calendar_list.get('items', [])
      for calendar_list_entry in calendars:
        if calendar_list_entry['summary'] == cal_name:
            calendar_id = calendar_list_entry['id']
      page_token = calendar_list.get('nextPageToken')
      if not page_token:
        break
    if calendar_id == '':
        return ''
    else:
        return calendar_id
 
#to add a calendar to the calendarlist
def add_calendar():
        calendar= input(str("Calendar: "))
        entry = {
           'summary' : calendar
         }
        request_entry = service.calendars().insert(body= entry)
        response = request_entry.execute()
        print(response)

#to list out the calendars in the calendarlist
def list_calandar():
    page_token = None
    while True:
      calendar_list = service.calendarList().list(pageToken=page_token).execute()
      for calendar_list_entry in calendar_list['items']:
        print(calendar_list_entry['summary'])
      page_token = calendar_list.get('nextPageToken')
      if not page_token:
        break

#to remove a calendar from the calendarlist
def del_calendar():
    cal_name = input(str("Calendar: "))
    calendar = get_calendarid(cal_name)
    if calendar == '':
        print('Calendar not found')
    else:
        service.calendarList().delete(calendarId=calendar).execute()

