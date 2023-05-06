---
title: "Linux 명령어 모음"
date: 2023-05-04
category: "infra"
draft: false
---

### 1. for 파일 시스템 탐색

```
pwd
```

pwd는 Print Work Directory 의 약자로, 현재 작업 중인 디렉터리 경로를 프린트합니다.

```
ls
```

ls는 list segments의 약자로, 파일과 디렉터리의 모든 정보를 프린트합니다. 추가로 특정 파일과 특정 디렉터리의 정보를 프린트할 수도 있습니다.

또한 아래 옵션들을 활용하여, 추가적인 작업할 수 있습니다. `ls -al` 같은 명령어 처럼 옵션을 혼합하여 사용할 수도 있습니다.

- `-l` : 추가적인 정보를 프린트합니다. (권한, 포함된 파일수, 소유자, 그룹, 파일크기, 수정일자, 파일이름)
- `-a` : 숨김 파일을 포함하여 모든 파일을 나열합니다.
- `-R` : 위치한 디렉토리 하부 디렉토리의 파일까지 모두 출력합니다.
- `-S` : 파일 크기 순으로 정렬하여 출력합니다.
- `-h` : 파일크기를 해석하기 편하게 출력합니다. (K, M, G 단위를 사용)
- `-r` : 출력 결과를 내림차순으로 정렬한다.
- `-t` : 출력 결과를 파일이 수정된 시간을 기준으로 정렬한다.
- `ls > file.txt` : 리다이렉션 연산자(>, >>)를 사용하여 디렉토리 내용을 파일에 저장할 수 있습니다.

<br/>

```
cd
```

cd는 디렉터리를 이동하기 위한 명령어입니다. linux/unix 환경은 디렉터리와 파일로 이루어져 있어, 디렉터리 위치를 옮겨가며 작업을 진행하게 됩니다.

```
mkdir
```

mkdir은 디렉터리(폴더)를 만들기 위한 명령어입니다. 권한을 가지고 있다면 터미널에서도 폴더를 생성할 수 있습니다.

```
rmdir
```

rmdir은 remove directory의 약자로 '빈' 디렉터리를 삭제하기 위한 명령어입니다.

```
rm -r
```

rm -r은 파일이 들어있는 디렉토리를 삭제하기 위한 명령어입니다. 위험한 명령이니 사용에 유의해야 합니다.

```
lsblk
```

linux 시스템에서 사용가능한 블록 장치를 나열할 때 사용하는 명령어입니다. 블록 장치의 트리 구조를 나타냅니다.

```
mount
```

SD 카드 혹은 USB 연결시, 배포판이 처음에 표시되지 않을 가능성이 존재합니다. 그런 경우 mount 명령어를 통해 기존 파일 시스템으로 마운트할 수 있습니다.

```
df
```

df는 파일 시스템의 디스크 공간에 대해 필수 정보를 표시하는 명령어입니다. 시스템 관리자가 실시간 서버 혹은 네트워크 지향 시스템을 모니터링하고 분석하는데 사용됩니다. 기본적으로 1,024 byte 블록 단위로 출력합니다.

---

### 2. for 시스템 조작

```
uname
```

uname은 이름, 버전 및 기타 시스템 특정 세부 사항과 같은 시스템 정보를 얻기 위한 명령어입니다. 해당 명령어로 OS 및 커널 버전, 시스템의 명령 길이을 빠르게 확인할 수 있습니다.

```
ps
```

ps는 현재 시스템에서 실행 중인 프로세스를 확인하기 위한 명령어입니다.

시스템 리소스를 분석하기 위한 명령어이며, 터미널을 통해 시스템의 프로세스를 조작할 수 있습니다.

```
kill
```

kill은 자원 제한으로 인해 멈춘 프로세스를 중단시킬 수 있는 명령어입니다. 프로세스를 지정하고 신호(Signal)를 보내서 제어하는 명령어입니다. 주로 아래의 옵션과 함께 사용합니다.

- `-9` : 프로세스아이디(PID)를 직접 지정하여 종료합니다.
- `-ㅣ` : 신호(Signal)로 사용할 수 있는 신호(Signal) 이름들을 보여줍니다.

<br/>

아래는 신호의 종류입니다.

- `SIGHUP`

  - 번호 : 1
  - 신호 : `HUP`
  - 설명 : hangup, 로그아웃등의 접속이 끊을 때 발생하는 신호(Signal)로 특정 실행 중인 프로그램이 사용하는 설정 파일을 변경시키고 변화된 내용을 적용할때 사용됩니다.

- `SIGINT`

  - 번호 : 2
  - 신호 : `INT`
  - 설명 : 현재 작동중인 프로그램의 동작을 멈출때 사용되며, 일반적인 값은 `<CTRL>+<c>` 입니다.

- `SIGKILL`

  - 번호 : 9
  - 신호 : `KILL`
  - 설명 : 프로그램을 무조건 종료할 경우 사용됩니다

- `SIGSEGV`

  - 번호 : 11
  - 신호 : `SEGV`
  - 설명 : 잘못된 메모리 관리시 생기는 신호(Signal) 입니다.

- `SIGTERM`

  - 번호 : 15
  - 신호 : `TERM`
  - 설명 : 실행중인 프로그램을 정상적인 종료방법으로 프로그램을 종료하는 신호(Signal)로 kill 명령에서 신호(Signal)를 지정하지 않으면 이 신호(Signal)를 사용하여 프로그램을 종료합니다.

- `SIGCONT`

  - 번호 : 18
  - 신호 : `CONT`
  - 설명 : 중지 되어 있는 프로그램을 재실행 하는데 사용되는 신호(Signal) 입니다.

- `SIGSTOP`

  - 번호 : 19
  - 신호 : `STOP`
  - 설명 : 프로그램을 중지 하는데 사용되는 신호(Signal) 입니다.

- `SIGTSTP`

  - 번호 : 20
  - 신호 : `TSTP`
  - 설명 : 터미널에서 중지되어 있는 신호(Signal) 입니다.

<br/>

```
service

systemctl
```

service는 시스템 전체 서비스를 호출하기 위한 기존 명령어입니다.

시스템 서비스 명령어는 리눅스 `/etc/init.d` 디렉터리에 있는 링크파일들 중에 시작/종료/재시작을 수행할 수 있었습니다.

- `start`, `stop`, `restart`, `reload`, `status`

<br/>

하지만 systemd 를 쓰게 되면서, `systemctl` 명령어를 사용할 수 있게 되었습니다.

`systemd` 이전에는 `init` 이라는 프로세스가 PID1을 차지하고, 부팅되는 과정에서 시스템 초기화 및 환경 설정을 담당하였는데, init 프로세스는 부팅 시작시 가장 먼저 시작되는 프로세스이고, 부모 프로세스로 동작합니다.

하지만 init의 한계를 극복하기 위해, systemd가 등장하면서 호환성도 제공하고, init과 다르게 병렬로 실행되어 부팅 속도가 빨라지는 등의 기능을 제공합니다.

systemd 를 사용하는 OS 버전부터는 service 명령어 수행시, redirecting to `/bin/systemctl start ***.service` 로 리다이렉팅됩니다.

- `systemctl list-unit-files` : 서비스 목록 확인
- `systemctl start {서비스명}` : 서비스 시작
- `systemctl stop {서비스명}` : 서비스 종료
- `systemctl restart {서비스명}` : 서비스 재시작
- `systemctl enable {서비스명}` : 서비스 활성화
- `systemctl disable {서비스명}` : 서비스 비활성화
- `systemctl reload {서비스명}` : 서비스 갱신

<br/>

```
batch
```

batch는 미리 정의된 일정에 따라 시스템 서비스를 실행시키는 배치 명령어입니다. 자동화 쉘 스크립트를 위한 명령어입니다.

```
shutdown
```

shutdown은 시스템을 종료하는 명령어 중 하나입니다.

---

### 3. for 파일 관리

```
touch
```

touch 는 유효한 빈 파일을 생성하기 위한 명령어입니다.

```
cat
```

```
head
```

```
tail
```

```
cp
```

```
mv
```

```
comm
```

```
less
```

```
ln
```

```
cmp
```

```
dd
```

```
alias
```

---

### 4. for 네트워크 관리자

```
wget
```

wget는 터미널에서 바로 웹에서 파일을 다운로드하는데 활용하는 리눅스 명령어 중 하나입니다.

사용자에게 HTTP, HTTPS, FRP 인터넷 프로토콜을 사용할 수 있는 기능을 제공합니다.

```
iptables
```

iptables는 시스템 관리자가 특성 호스트 시스템에서 들어오고 나가는 인터넷 트래픽을 제어할 수 있는 터미널 유틸리티를 호출합니다.

sysadmins 는 정기 트래픽을 정의하고, 의심스럽거나, 신뢰할 수 없는 네트워크 요청을 블랙리스트에 올리는데 사용하는 명령어입니다.

```
traceroute
```

traceroute는 네트워크 패킷이 한 시스템에서 다른 시스템으로 이동하는 경로를 결정하기 위해, 이 명령어를 다른 터미널 명령어와 함께 사용하는 경우가 있습니다.

유해한 침입자로부터 컴퓨터를 보호하는 명령어입니다.

```
cURL
```

cURL는 네트워크를 통해 파일을 전송해, 새로운 linux 시스템 사용자도 사용할 수 있도록 하는 명령어입니다.

```
ifquery --list
```

ifquery는 간략한 네트워크 인터페이스 목록을 보여주는 명령어입니다. if는 Interface의 약자로 이해하면 됩니다.

```
ifup
ifdown
```

파일에 필요한 데이터가 있다면 ifup과 ifdown 명령을 사용해, 필요에 따라 네트워크 연결을 불러오거나 종료할 수 있습니다.

```
ifconfig
```

ifconfig는 `/etc/network/interfaces` 파일을 읽지 않으면서, 네트워크 인터페이스에 관한 여러 유용한 정보를 제공하는 명령어입니다.

구성 데이터와 함께 패킷 수를 보여주므로, 각 인터페이스의 사용량이 얼마나 많은지 확인할 수 있습니다.

네트워크 인터페이스를 종료하고 재시작하는 데도 ifconfig 명령을 사용할 수 있습니다. `ifconfig eth0 down` 처럼 활용할 수 있습니다.

```
netstat
```

netstat는 라우팅 및 네트워크 연결에 대한 정보를 제공하는 명령어입니다.

인수가 없으면 열린 소켓 목록을 출력합니다. 거의 모든 항목이 로컬 시스템의 프로세스와 관련됩니다.

예를 들어 다음 예제를 보면 로컬 시스템(dragonfly)으로 가는 수신 ssh 연결이 2개만 설정됐음을 알 수 있습니다.

```
$ netstat | head -4
    Active Internet connections (w/o servers)
    Proto Recv-Q Send-Q Local Address           Foreign Address         State
    tcp        0     64 dragonfly:ssh           dragonfly:8812          ESTABLISHED
    tcp        0      0 dragonfly:ssh           dragonfly:33505         ESTABLISHED
```

`-rn` 옵션 사용시에는 시스템 라우팅 테이블을 확인할 수 있습니다.

```
$ netstat | head -4
Routing tables
Internet:
Destination        Gateway            Flags           Netif Expire
default            172.30.1.254       UGScg             en0
127                127.0.0.1          UCS               lo0
127.0.0.1          127.0.0.1          UH                lo0
169.254            link#11            UCS               en0      !
172.30.1/24        link#11            UCS               en0      !
172.30.1.1         6:7b:78:98:c6:4b   UHLWI             en0      !
```

`-a` 옵션은 모든 네트워크 연결을 보여줍니다. 수신 대기 연결과 설정된 연결로만 범위를 제한하려면 `netstat -at` 명령을 사용하면 됩니다. 후자의 방식이 더 유용합니다.

```
$ netstat -at
Active Internet connections (including servers)
Proto Recv-Q Send-Q  Local Address          Foreign Address        (state)
tcp4       0      0  172.30.1.20.49574      20.200.245.245.https   ESTABLISHED
tcp4       0      0  172.30.1.20.49527      lb-140-82-112-25.https ESTABLISHED
```

<br/>

```
host
```

host는 원격 시스템의 IP 주소를 조회하는 명령어로 nslookup와 비슷합니다. 다만 시스템의 메일 핸들러도 보여준다는 점이 차이점입니다.

```
$ host google.com

google.com has address 172.217.25.174
google.com has IPv6 address 2404:6800:400a:804::200e
google.com mail is handled by 10 smtp.google.com.
```

<br/>

```
nslookup
```

nslookup 명령어는 DNS 조회 서비스를 제공합니다.

```
$ nslookup google.com

Server:		168.126.63.1
Address:	168.126.63.1#53

Non-authoritative answer:
Name:	google.com
Address: 172.217.25.174
```

<br/>

```
dig
```

dig는 통신 중인 네임 서버, 쿼리 응답까지 소요되는 시간 등 원격 시스템 연결에 대한 여러 정보를 제공하며 문제해결에 사용되는 명령어입니다.

```
nmap
```

nmap 의 일반적인 사용 용도는 원격 시스템 탐지입니다. 추가로, 로컬 시스템이 제공하는 서비스에 대해 보고할 때도 사용됩니다.

아래 예제에서는 로그인에 ssh를 사용할 수 있고, smtp가 이메일을 서비스하고 있고, 웹사이트가 활성이며, ipp 인쇄 서비스가 실행 중인 것을 증명할 수 있습니다.

```
$ nmap localhost

Starting Nmap 7.01 ( https://nmap.org ) at 2017-10-09 15:01 EDT
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00016s latency).
Not shown: 996 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
25/tcp  open  smtp
80/tcp  open  http
631/tcp open  ipp
Nmap done: 1 IP address (1 host up) scanned in 0.09 seconds
```

---

### 5. for 명령어 검색 및 정규 표현식

```
find
```

```
which
```

```
locate
```

```
grep
```

```
sed
```

---

### 6. I/O 및 소유권을 다루는 리눅스 명령어

```
clear
```

```
echo
```

```
sort
```

```
sudo
```

```
chmod
```

```
chown
```
