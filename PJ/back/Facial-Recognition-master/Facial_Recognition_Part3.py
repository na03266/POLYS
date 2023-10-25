import cv2
import numpy as np
from os import listdir
from os.path import isfile, join

# 'faces' 디렉토리에 저장된 이미지 파일 목록을 가져옴
data_path = 'faces/'
onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path, f))]

# 학습 데이터와 레이블을 저장할 리스트 초기화
Training_Data, Labels = [], []

# 이미지 파일과 레이블을 순회하면서 학습 데이터 구축
for i, files in enumerate(onlyfiles):
    image_path = data_path + onlyfiles[i]
    images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    Training_Data.append(np.asarray(images, dtype=np.uint8))
    Labels.append(i)

# Labels 리스트를 NumPy 배열로 변환
Labels = np.asarray(Labels, dtype=np.int32)

# LBPH 얼굴 인식기 생성 및 학습
model = cv2.face_LBPHFaceRecognizer.create()
model.train(np.asarray(Training_Data), np.asarray(Labels))

# 얼굴을 감지하는 Haar Cascade 분류기 로드
face_classifier = cv2.CascadeClassifier('D:/kopo/attending/POLYS/PJ/back/Facial-Recognition-master/haarcascade_frontalface_default.xml')

# 얼굴을 감지하고 인식하는 함수 정의
def face_detector(img, size=0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    if faces is ():
        return img, []

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 255), 2)
        roi = img[y:y + h, x:x + w]
        roi = cv2.resize(roi, (200, 200))

    return img, roi

# 웹캠 열기
cap = cv2.VideoCapture(0)

while True:
    # 웹캠에서 프레임 읽기
    ret, frame = cap.read()

    # 얼굴 감지 함수를 사용하여 얼굴 추출
    image, face = face_detector(frame)

    try:
        # 얼굴 이미지를 회색조로 변환
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

        # 학습된 모델을 사용하여 얼굴 인식 시도
        result = model.predict(face)

        if result[1] < 500:
            confidence = int(100 * (1 - result[1] / 300))
            display_string = str(confidence) + '% Confidence it is user'

        # 화면에 인식 결과 표시
        cv2.putText(image, display_string, (100, 120), cv2.FONT_HERSHEY_COMPLEX, 1, (250, 120, 255), 2)

        if confidence > 75:
            cv2.putText(image, "Unlocked", (250, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow('Face Cropper', image)
        else:
            cv2.putText(image, "Locked", (250, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2)
            cv2.imshow('Face Cropper', image)

    except:
        cv2.putText(image, "Face Not Found", (250, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
        cv2.imshow('Face Cropper', image)
        pass

    # 'Enter' 키를 누르면 루프 종료
    if cv2.waitKey(1) == 13:
        break

# 웹캠 해제 및 창 닫기
cap.release()
cv2.destroyAllWindows()
