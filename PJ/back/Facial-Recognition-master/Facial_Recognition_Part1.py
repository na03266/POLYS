import cv2
import numpy as np
import os

# 'faces' 디렉토리 생성 (이미 존재하는 경우 에러 없이 진행)
os.makedirs('faces', exist_ok=True)


# 얼굴 인식을 위한 Haar Cascade 분류기 로드
face_classifier = cv2.CascadeClassifier('D:/kopo/attending/POLYS/PJ/back/Facial-Recognition-master/haarcascade_frontalface_default.xml')

# 얼굴 추출 함수 정의
def face_extractor(img):
    # 입력 이미지를 흑백으로 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # 이미지에서 얼굴을 검출
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    # 얼굴이 검출되지 않았을 때, None을 반환
    if faces is ():
        return None

    # 얼굴이 검출되면 감지된 얼굴 영역을 잘라내어 반환
    for (x, y, w, h) in faces:
        cropped_face = img[y:y+h, x:x+w]

    return cropped_face

# 웹캠 캡처 시작
cap = cv2.VideoCapture(0)
count = 0

# 무한 루프: 얼굴을 감지하고 이미지 저장
while True:
    ret, frame = cap.read()
    
    # face_extractor 함수를 통해 얼굴을 검출
    if face_extractor(frame) is not None:
        count += 1

        # 검출된 얼굴을 200x200 크기로 변환
        face = cv2.resize(face_extractor(frame), (200, 200))
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

        # 이미지 파일로 저장
        file_name_path = 'faces/user' + str(count) + '.jpg'
        cv2.imwrite(file_name_path, face)

        # 화면에 얼굴 번호 표시
        cv2.putText(face, str(count), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Face Cropper', face)
    else:
        print("Face not Found")
        pass

    # Enter 키를 누르거나 count가 100이 되면 루프 종료
    if cv2.waitKey(1) == 13 or count == 100:
        break

# 웹캠 캡처 종료
cap.release()
cv2.destroyAllWindows()

# 이미지 수집 완료 메시지 출력
print('Collecting Samples Complete!!!')
