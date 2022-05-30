from cgi import test
import face_recognition
import numpy as np
import io, base64
from PIL import Image

#known_image = face_recognition.load_image_file("/home/zeeking99/Pictures/IMG_20210414_090012.jpg")
#unknown_image = face_recognition.load_image_file("/home/zeeking99/Pictures/Screenshot from 2021-03-20 11-46-09.png")
#
#zeeshan_encoding = face_recognition.face_encodings(known_image)[0]
#unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
#
#results = face_recognition.compare_faces([zeeshan_encoding], unknown_encoding)
#
#print(results)
#
#
## This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
## other example, but it includes some basic performance tweaks to make things run a lot faster:
##   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
##   2. Only detect faces in every other frame of video.
#
## PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
## OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
## specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.
#
## Get a reference to webcam #0 (the default one)
#video_capture = cv2.VideoCapture(0)
#
## Load a sample picture and learn how to recognize it.
#obama_image = face_recognition.load_image_file("./obama.jpg")
#obama_face_encoding = face_recognition.face_encodings(obama_image)[0]
#
## Load a second sample picture and learn how to recognize it.
#vc_image = face_recognition.load_image_file("./vc.jpg")
#vc_face_encoding = face_recognition.face_encodings(vc_image)[0]
#
## Load my sample picture and learn how to recognize it.
#my_image = face_recognition.load_image_file("./my.jpg")
#my_face_encoding = face_recognition.face_encodings(my_image)[0]
#
## Create arrays of known face encodings and their names
#known_face_encodings = [
#    obama_face_encoding,
#    vc_face_encoding,
#    my_face_encoding
#]
#known_face_names = [
#    "Barack Obama",
#    "Vice Chancellor",
#    "Zeeshan"
#]
#
## Initialize some variables
#face_locations = []
#face_encodings = []
#face_names = []
#process_this_frame = True
#
#while True:
#    # Grab a single frame of video
#    ret, frame = video_capture.read()
#
#    # Resize frame of video to 1/4 size for faster face recognition processing
#    try:
#      small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
#    except:
#      break
#
#    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
#    rgb_small_frame = small_frame[:, :, ::-1]
#
#    # Only process every other frame of video to save time
#    if process_this_frame:
#        # Find all the faces and face encodings in the current frame of video
#        face_locations = face_recognition.face_locations(rgb_small_frame)
#        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
#
#        face_names = []
#        for face_encoding in face_encodings:
#            # See if the face is a match for the known face(s)
#            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
#            name = "Unknown"
#
#            # # If a match was found in known_face_encodings, just use the first one.
#            # if True in matches:
#            #     first_match_index = matches.index(True)
#            #     name = known_face_names[first_match_index]
#
#            # Or instead, use the known face with the smallest distance to the new face
#            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
#            best_match_index = np.argmin(face_distances)
#            if matches[best_match_index]:
#                name = known_face_names[best_match_index]
#
#            face_names.append(name)
#
#    process_this_frame = not process_this_frame
#
#
#    # Display the results
#    for (top, right, bottom, left), name in zip(face_locations, face_names):
#        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
#        top *= 4
#        right *= 4
#        bottom *= 4
#        left *= 4
#
#        # Draw a box around the face
#        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
#
#        # Draw a label with a name below the face
#        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
#        font = cv2.FONT_HERSHEY_DUPLEX
#        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
#
#    # Display the resulting image
#    cv2.imshow('Video', frame)
#
#    # Hit 'q' on the keyboard to quit!
#    if cv2.waitKey(1) & 0xFF == ord('q'):
#        break
#
## Release handle to the webcam
#video_capture.release()
#cv2.destroyAllWindows()

def frfunction(image_base64):
    pass

    #image = Image.open(io.BytesIO(base64.decodebytes(bytes(image_base64, "utf-8"))))    

    with open("savedImage.png", "wb") as testImage:
        testImage.write(base64.decodebytes(image_base64))

    return True


encoding = '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'

status = False
status = frfunction(encoding)
print(status)