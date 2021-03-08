# 카드 만들기 사이트

간단하게 카드를 만들고 이미지파일로 저장할 수 있는 사이트입니다.

- [사이트 링크](https://danbi-lee.github.io/portfolio_mkCard/)

## 사용된 기술 스택

- <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" alt="HTML5"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white" alt="Sass"/>
- <img src="https://img.shields.io/badge/Gulp-CF4647?style=for-the-badge&logo=Gulp&logoColor=white" alt="gulp"/>

## 프로젝트 화면 및 소개

- 메인 페이지

  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/50724377/109950431-d838ee80-7d1f-11eb-8888-f27227a1af7e.gif)

  - 패럴랙스 효과 적용

- 서브 페이지

  > 이미지 카드에 필요한 데이터를 입력하면 다운로드 할 수 있는 기능

  1. 텍스트 입력

     ![image](https://user-images.githubusercontent.com/50724377/110287513-fce7db80-8029-11eb-9f86-226c11ad7bbd.png)

  2. 이미지 선택

     ![image](https://user-images.githubusercontent.com/50724377/110287674-40424a00-802a-11eb-89fb-ec0fbbfca72f.png)

     - 이미지 파일 직접 업로드
     - 이미지 파일 검색
       - fixabay API를 통한 이미지 검색 기능 구현
       - `IntersectionObserver`을 활용하여 무한 스크롤 기능 구현

  3. 폰트 선택

     ![image](https://user-images.githubusercontent.com/50724377/110287782-6a940780-802a-11eb-84cb-8daf294184bb.png)

     - 폰트 선택 DOM은 json파일을 불러와 동적으로 생성

  4. 꾸미기

     ![image](https://user-images.githubusercontent.com/50724377/110287968-a8912b80-802a-11eb-86a9-998a0fdb219b.png)

     - 색상 필터 등 조작 가능

  5. 다운로드

     ![image](https://user-images.githubusercontent.com/50724377/110288114-dc6c5100-802a-11eb-8f33-ea3f3743d83c.png)

     - 비동기 방식으로 이미지가 다운로드 되기 전 이미지 데이터를 생성
     - 다운로드 중에는 유저가 알 수 있도록 Loading 모달 UI 생성

## 사용한 라이브러리

- dom-to-image : (https://github.com/tsayen/dom-to-image)
- FileSaver : (https://github.com/eligrey/FileSaver.js/)

## 업데이트 기록

- 2020년 : jQuery문법으로 제작
- 2021-03-04(목) : jQuery를 ES6 최신 문법으로 수정
