# MSA_GCP
https://jintakim.shop/

중고거래몰 API

---
stack

NestJS, graphQL, RestAPI, MySQL, typeORM, Redis, docker, JWT, passport, GCP(kubernetes, CI/CD, sql, bucket, cloud funcion, DNS), git, jest
chatGPT API, MSA

# 기능 구현
중고 거래몰 backend
- niginx 를 사용해 reverse proxy 구현
- bcrypt를 이용한 비밀 번호 암호화
- JWT 토큰을 이용한 로그인 인증, OAuth 를 이용한 소셜 로그인
- redis 블랙리스트를 사용한 로그아웃 처리 
- RDBMS (MySQL)
- 중고상품 crud
- 게시판 crud
- 결제 시스템 포트원(아임포트) 이용. 조회 결제 및 환불 
- Chat gpt API (옷을 추천해주는 챗봇)  
- GCP Cloud storage 에 이미지 업로드 (GCP Cloud Function 사용해 이미지 사이즈 관리)
- Socket.IO 
- ![image](https://user-images.githubusercontent.com/76115198/235073422-4a0fbeda-f045-43bc-b1aa-db92f3db56e5.png)

#- testcode


# 참고 
쿠버네티스 에서 비용 상 간단하게 vm 으로 테스트 용으로만 축소

# test
https://jintakim.shop/graphql
- graphql 사용방법
- query 와 mutation이 있음
- query -> get
- mutation -> post update delete 모두
- ![image](https://user-images.githubusercontent.com/76115198/234874445-e957164c-6532-45d3-8220-de530175915c.png)
- docs에서 api 확인 가능



- 그리고 오른쪽 위에 세팅에서
- "request.credentials": "same-origin",
- 이 설정을 넣어줘야 로그인이 가능하다 (쿠키에 리프레시 토큰 등록)


- tip
- ctrl+i 누르면 입력가능한 것들이 나온다!
- https://blog.naver.com/terry0222/223087247238

- 채팅 noom 클론코딩
- https://jintakim.shop/socket/



04-13
gcp json 파일이 올라가 커밋 전체에서 삭제 과정에서 저장소가 꼬여 pull requests 가 안돼 저장소 교체.. 

04-14
nginx reverse proxy 구조로 변경하기 위한 새 저장소
- socket 을 위한 nodejs 서버 분리 및 개발중 

- 복구 완료
임시 - 현재 gcp 이슈로 서버다운 새로운 서버 만들었으나 ssh 인증 중 시간이 걸릴거 같음 - 네임서버 변경 중(다소시간 소요 될 듯)
- 로드벨런서 dns 연결 해놔서 ssh 인증 되면 바로 연결 될거같음 
05-02일 10시 33분 gcp메일 -> 12시 33 분 해결 및 대기중
8시 네임서버 변경 완료 dns 연결 성공 복구 완료 
