import cv2
import numpy as np
from os import listdir
from os.path import isfile, join

# 데이터 경로 설정
data_path = 'D:/kopo/attending/POLYS/faces/'

# 'data_path' 디렉토리에 있는 모든 파일 목록 가져오기
onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path, f))]

# 데이터 및 레이블 초기화
Training_Data, Labels = [], []

# 각 이미지에 대한 레이블 생성 및 데이터 수집
for i, files in enumerate(onlyfiles):
    image_path = data_path + onlyfiles[i]
    images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # 이미지 데이터와 해당 레이블을 리스트에 추가
    Training_Data.append(np.asarray(images, dtype=np.uint8))
    Labels.append(i)

# 레이블 데이터를 NumPy 배열로 변환
Labels = np.asarray(Labels, dtype=np.int32)

# LBPH 얼굴 인식 모델 생성
#model = cv2.face_LBPHFaceRecognizer_create()
model = cv2.face.LBPHFaceRecognizer.create()
# 모델 훈련
model.train(np.asarray(Training_Data), np.asarray(Labels))

print("Model Training Complete!!!!!")
