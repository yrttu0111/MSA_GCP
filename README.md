# MSA_GCP


stack

NestJS, graphQL, RestAPI, MySQL, typeORM, Redis, docker, JWT, passport, GCP(kubernetes, CI/CD, sql, bucket, cloud funcion, DNS), git, jest
chatGPT API, MSA

# 기능 구현
중고 거래몰 backend
#1 소셜로그인 (구글, 네이버, 카카오) , 일반 회원가입
#2 결제 (iamport)
#3 상품 crud
#4 구매 process
#5 게시판
#6 chatGPT 스타일 추천 챗봇

#- testcode
#- 클라우드 배포 GCP 쿠버네티스 CI/CD

04-13
gcp json 파일이 올라가 커밋 전체에서 삭제 과정에서 저장소가 꼬여 pull requests 가 안돼 저장소 교체.. 

04-14
MSA 구조로 변경하기 위한 새 저장소
- socket 을 위한 nodejs 서버 분리 및 개발중 

# 참고 
쿠버네티스 에서 비용 상 간단하게 vm 으로 테스트 용으로만 축소
html 로그인 결제 페이지 등 (MSA NGINX) 생략 graphql 및 socket 만 남김
http://jintakim.shop:3000/graphql

http://jintakim.shop:3002/socket
