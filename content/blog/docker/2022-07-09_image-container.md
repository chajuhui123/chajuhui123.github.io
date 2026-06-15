---
title: '도커 시작하기 : 서버 구축을 위한 주요 명령어 및 옵션 정리'
date: 2022-07-09
category: 'Docker'
draft: false
---

# 1. DOCKER 기본 이해

## DOCKER

: 다양한 운영체제와 시스템 환경 상에서, 서버 셋업을 위한 작업이 다르고 복잡하다.

: 도커는 **컨테이너 기반의 가상화 플랫폼**으로, 컨테이너 상에 서버를 셋업해놓을 수 있다.

: 기반 환경이 다르더라도, 언제든 컨테이너 실행하면 동일한 서버 셋업이 가능하다.

### Docker Internals

: Docker는 리눅스 컨테이너부터 시작된 기술이다.

### LXC(Linux Container)

- 단일 컴퓨팅 시스템에 설치된 리눅스 운영체제 상에서, 다른 영역과 분리된 별도의 리눅스 시스템을 운영할 수 있는 리눅스 커널 기술
- 리눅스 운영체제 레벨에서 영역과 자원 할당(CPU, 메모리, 네트워크) 등을 분리하여, 마치 별도의 시스템처럼 사용할 수 있는 기술
- docker는 리눅스 커널에 LXC 기술을 사용해
  → 분리된 공간인 리눅스 컨테이너를 만들고
  → 리눅스 컨테이너 상에 별도로 구성된 파일 시스템에 시스템 설정 및 응용 프로그램을 실행할 수 있도록 하는 기술을 정의한 것이라고 이해하면 된다.
  → **최근에는 별도의 컨테이너 기술**을 구현해 사용한다.

## Docker 주요 구성 요소

### 1. docker Engine

- docker는 서버/클라이언트 구조로 이루어져 있다.
- 서버는 데몬프로세스 형태로 동작한다. (데몬이란 계속 실행 중인 시스템 = 계속 떠있다)
- docker command는 일종의 클라이언트라고 이해하면 좋다.
- docker command를 내리면 내부적으로 REST API를 사용해 docker daemon process 를 호출하는 방식이다

### 2. docker Image

- 도커 이미지를 어떻게 만드는지 학습하자!
- **스크립트의 집합**이라고 정리할 수 있다. (여러 이미지를 Layer로 쌓아 원하는 형태의 이미지를 만드는 것이 일반적이다)
  - EX) ubuntu 이미지에 apache 웹서버 이미지를 얹어서 웹서버 이미지를 만든다.

### 3. docker container

- 만들어진 도커 이미지를 도커 컨테이너로 만들어 실행시키는지 학습하자!
- 이미지를 만들고 컨테이너로 실행

# 2. 이미지를 다루는 다양한 옵션

1. 도커 설치
2. docker image 다운로드
3. 다운로드 받은 image로 docker container 생성 및 실행

```bash
docekr image 명령 옵션 …
```

```bash
docker container 명령 옵션 …
```

이미지 다운 받기 위해 Docker hub 가입하기

- docker 이미지를 직접 작성해 사용 가능
- 파이선/js 라이브러리처럼 미리 작성해놓은 이미지를 다운받을 수 있음

## 명령어

docker 가 떠있는지 확인

```bash
sudo systemctl status docker
```

docker hub 로그인/로그아웃

```bash
docker login
docker logout # 해당 명령을 사용하는 일은 거의 없다.
```

다운로드 받을 이미지 검색

```bash
docker search ubuntu
```

- 이미지 명에 슬래시가 있다면은 `제작한사용자명/이미지이름` 따라서 공식 이미지는 아니다.
- 이미지는 `이미지명[:태그]`로 이루어질 수 있다.
  - 태그는 보통 버전 정보를 넣는 경우가 많다.
  - 만약 태그를 넣지 않는 경우 태그명은 `:latest` 가 된다.

이미지 다운로드 pull

```bash
docker pull ubuntu # 자동으로 latest 버전 다운됨
docker pull ubuntu:20.10
```

다운받은 이미지 확인

```bash
docker images
docekr image ls

# 다운받은 이미지의 IMAGE ID만 출력
docker image ls -q
```

다운받은 이미지 삭제하기

```bash
docker rmi 이미지ID(혹은 이미지 REPO 이름)
docker image rm 이미지ID(혹은 이미지 REPO 이름)
```

# 3. 컨테이너를 다루는 다양한 옵션 (1)

컨테이너 생성

```bash
docker create ubuntu
```

- 각 이미지는 컨테이너로 만들어줘야 실행 가능하다.
- 이미지와 컨테이너는 각각 관리해줘야 한다.
- 컨테이너 생성시, docker 프로그램에서 이름이 자동 부여된다.
- 생성시, 컨테이너 아이디가 나온다. (full id)

실행 중인 컨테이너 확인

```bash
docker ps # 실행 중인 컨테이너
docker ps -a # 실행 중이지 않은 전체 컨테이너 확인
docker ps -a -q # 실행 중이지 않은 전체 컨테이너 중에 CONTAINER ID만 출력
```

- status 로 컨테이너 실행 상태를 알 수 있다
  - `created` 생성
  - `up` 실행중
  - `pause` 중지
  - `existed` 종료
- 도커는 특정 운영체제를 감싸기 보단, 프로그램을 감싸는 것!
- 따라서 컨테이너는 어떤 프로그램을 실행시켜주는 컨테이너! `COMMAND`에서 어떤 프로그램을 실행시켜주는지 알려준다.

컨테이너 삭제

```bash
docker rm 삭제할 컨테이너 아이디
```

원하는 이름으로 컨테이너 생성

```bash
docker create --name 원하는이름 이미지이름
docker create --name myubuntu ubuntu
```

# 4. 컨테이너를 다루는 다양한 옵션 (2)

컨테이너 실행

```bash
docker start 컨테이너이름
```

- 위처럼 실행시, 컨테이너 실행하면 바로 중지된다. (`docekr ps -a` 로 확인가능)
- 계속 실행하기 위해선 `run` 명령어를 활용한다.

표준 스트림

- `STDIN` : 표준입력
- `STDOUT` : 표준출력
- `STDERR` : 표준에러
- fork() 시스템콜을 사용할 경우, 해당 함수를 호출하는 프로그램은 부모 프로세스가 되고, fork()를 통해 실행되는 프로그램은 자식 프로세스가 된다.

# 5. 컨테이너를 다루는 다양한 옵션 (3)

이미지 생성하면서 실행하는 명령어

```bash
docker run
```

- 주요 옵션
  - `-i` : 컨테이너 입력 STDIN 을 열어놓는 옵션
  - `-t` : 가상 터미널(tty : teletypewriter) 를 열어놓는
    - 주로 `-it`로 사용 (**컨테이너 내로 접근해서 키보드 입력을 넣을 수 있다**)
  - `--name` :
  - `-d` :
  - `--rm`
  - `-p`
  - `-v`

```bash
# 컨테이너 실행 후, 해당 ubuntu로 들어가서, 터미널로 명령어
docker run -it ubuntu

# 컨테이너 이름을 원하는 이름으로 변경
docker run -it --name myubuntu ubuntu

# exit 명령으로 종료시, 컨테이너도 종료된다.
```

컨테이너 종료와 함께 컨테이너 삭제하는 옵션

```bash
docker run -it --rm --name myubuntu3 ubuntu
```

- ubuntu 이미지를 myubuntu3 라는 이름으로 컨테이너 실행하는데, 종료할시 삭제됨

백그라운드로 실행하기 (실행 중인 상태지만, 터미널 입력은 받지 않는 상태)

```bash
docker run -it -d --name myubuntu3 ubuntu

# 백그라운드 실행 중인 컨테이너에 들어가서 명령 내리기
docker attach myubuntu3
```

# 6. 컨테이너를 다루는 다양한 옵션 (4)

실행 중인 컨테이너 **종료**하기

```bash
docker stop myubuntu3
```

- 참고로 중지하는 명령어는 `docker pause 컨테이너` 이고 다시 실행시키는 명령어는 `docker unpause 컨테이너`

## 1. 웹서버로 docker run 옵션 테스트하기

- 웹서버는 크게 두가지 프로그램이 많이 사용된다.
  - apache
  - nginx (엔진엑스)

### 1-1. apache 웹서버 공식 docker 찾기

- 각 docker 마다 **공식 이름이 프로그램명과 동일한 경우가 일반적**이지만, apache는 `httpd` 이름을 사용

```bash
docker search httpd
docker search httpd --limit=5
```

### 1-2. 이미지 다운로드 받고 바로 컨테이너로 만들어 실행시키기

```bash
docker run httpd
```

백그라운드에 컨테이너 실행하기

```bash
docker run -d --name apachweb httpd
```

- 이번에는 해당 웹서버에 어떻게 접속해야하는지 알 수 없다! 이 때, “**포트 포워딩”**이 필요하다.
  - docker를 실행한 PC를 Host PC(호스트 PC)라고 한다.
  - docker 컨테이너가 실행되면, 172.17.0.0/16 인 Private IP가 할당된다.
  - 호스트 PC IP에 특정 Port로 접근시, 해당 포트를 docker 컨테이너의 특정 Private IP의 특정 포트로 변환해줄 수 있다. 이를 **NAPT 기술**이라고 한다.
  - 이를 지원해주는 것은 `-p` 옵션이다.

```bash
docker run -d -p 9999:80 --name apachweb2 httpd
```

- 위 같이 작성하면, apacheweb2 컨테이너는 apache 웹서버 프로그램을 실행하고, 호스트 PC에 9999 포트로 접속하면, 자동으로 이를 해당 컨테이너의 80 포트에 연결해주겠다. 라는 의미이다.
- 위 실행후, 크롬 웹브라우저상에서 [localhost:9999](http://localhost:9999) 에 접속하면 확인할 수 있다.

  - 리눅스 서버인 경우, EC2 콘솔에서 추가 작업이 필요하다
  - 보안 그룹 → 인바운드 규칙 → 인바운드 규칙 편집 → 9999 포트 추가
  - `퍼블릭IPv4주소:9999` 로 접속하면 It works 화면 확인 가능!

# 7. 컨테이너를 다루는 다양한 옵션 (5)

### 1-3. `-v` 옵션 이해하기 (volume)

- 내가 만든 파일을 서버에 올리고 싶다면?
- docker는 **이미지를 기반으로 컨테이너를 만들기 때문에** 컨테이너 상에서 파일을 업데이트하거나, 생성할 경우, 컨테이너가 종료되면, 해당 파일이 없어진다.
  - 이를 보완하기 위해, 특정 폴더를 `-v` 옵션으로 교체 (**공유** 혹은 **바인딩**이라는 용어를 사용한다)하면, 해당 폴더는 호스트 PC에 있기 때문에, 컨테이너가 종료되도 파일이 유지된다.
- 배포시 볼 수 있는 “It works”는 httpd 이미지의 apache 웹서버 기본 설정에 의해 /usr/local/apache2/htdocs 폴더에 있는 index.html 파일이다.
- 호스트 PC 상에 내가 보여줄 index.html 파일이 있다면 -v 옵션을 이용하여, 호스트 PC의 특정 폴더를 docker 컨테이너의 특정 폴더로 교체할 수 있다.

### + 기존 설정으로 되어 있는 docker 컨테이너의 폴더를 호스트 PC의 특정 폴더로 수정하기

1. File zila 다운로드

   - [https://filezilla-project.org/](https://filezilla-project.org/)

2. 왼쪽 상단 호스트 위 → 사이트 관리자 클릭 → New Site → 사이트 명 입력 (Ex. DockerTest) → 프로토콜 변경 (SFTP - SSH File Transfer Protocol) → 로그온 유형 변경 (키 파일) → 사용자 변경 (ubuntu) → key 파일 첨부 (AWS에서 발급받은 pem key) → 호스트에 public IPv4 주소 혹은 탄력적 IP 입력 (EC2 콘솔 확인)

호스트 PC 절대 경로와 함께 -v 태그 사용하기 (디렉토리 위치에서 `pwd` 로 확인가능)

```bash
# -v 옵션만 쓴다면 다음과 같이 작성할 수 있다
docker run -v 호스트_PC_절대경로:도커_컨테이너_절대경로 httpd

# 다른 옵션과 함께 사용한 실제 예시
docker run -d -p 9999:80 -v 호스트_PC_절대경로:도커_컨테이너_절대경로 --name apacheweb3 httpd
```

- 컨테이너 안에서 파일을 수정할 필요없이, `-v` 옵션을 쓴다면 호스트 PC에서 수정한 내역을 업로드하여 업데이트할 수 있다.

## 8. 컨테이너를 다루는 다양한 옵션 (6)

docker가 가지고 있는 저장매체 현황 확인하기

```bash
docker system df
```

- 저장매체 공간이 이슈가 될 수도 있으므로 위 명령어를 알아놓자.

## docker와 Alpine

- ubuntu의 모든 기능을 쓰는 것은 아니고, 필요한 기능만 이미지로 다운 받는 방법 없을까?
- 이미지에는 다양한 태그가 있음 (Ex. httpd - Tags) [https://hub.docker.com/\_/httpd?tab=tags](https://hub.docker.com/_/httpd?tab=tags)
- 대부분 docker 이미지에 가장 기본이 되는 이미지는 ubuntu가 아닌, alpine인 경우가 많다. alpine 은 최소의 기능만 가진 이미지라고 이해하면 된다.

### alpine이란?

- musl libc 라는 임베디드 리눅스를 위한 C/POSIX library 와 Busy Box는 운영체제 운영에 필요한 가장 기본이 되는 유틸리티만 모아놓은 리눅스 패키지이다.

### httpd와 alpine

- httpd도 태그 중에 alpine 기반 태그가 있다.
  알파인으로 컨테이너 깔아놓기
  ```bash
  docker run -d -p 9999:80 -v /home/ubuntu/2021_DEV_HTML:/usr/local/apache2/htdocs --name apacheweb httpd:alpine
  ```

실행 중인 컨테이너 사용 리소스 확인하기

```bash
docker container status # 컨트롤+C 로 종료가능
```
