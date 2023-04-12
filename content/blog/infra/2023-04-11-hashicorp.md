---
title: "HashiCorp Strategy Day 2023에 다녀오다!"
date: 2023-04-11
category: "infra"
draft: false
---

오늘은 저의 인생 첫 외근이자 기술 세미나를 다녀왔습니다 💓

제가 방문한 세미나는 `HashiCorp Strategy Day 2023`로, 클라우드를 위한 인프라 자동화 SW 기업 하시코프에서 주최하였습니다.

세미나는 환영 인사 및 CTO 아몬 데드가의 화이트 보드 세션으로 시작되었습니다. 제가 세미나에서 가장 집중해서 들었던 내용인데요. 하시코프가 현재 준비하고 있는 사업들, 무엇을 위해, 그리고 어떻게 준비하고 있는지 전체적인 로드맵을 이해할 수 있었습니다.

그 이후에는 HashiCorp의 기술들을 적용하고 있는 다른 회사들의 전략을 들을 수 있었습니다.

형식적인 PPT 발표가 아닌, 화이트 보드 라이브 세션을 진행하는 것이 인상깊었고, 동시 통역사가 열정적으로 통역을 진행해주셔서 기억에 남을 세미나가 될 것 같습니다. 세미나의 현장감이며 내용이며 모든 것이 새로웠던 날이였습니다 🥳

---

## Self Service For Developer

하시코프의 사업은 <`Self Service For Developer`> 한 줄로 정리되었습니다.

No Ticket, API를 자동화, 애플리케이션 구축에 있어 원활한 Cloud 구축 등을 돕는 것이 하시코프의 기술들이었습니다.

- **Security** : `Vault`(Machine To Machine), `Boundary`(human To Machine)
- **Provision** : `Terraform`(코드를 통한 Infra 구축)
- **Connect** : `Consul`(서비스 연결)
- **RunTime** : `Nomad`, `Waypoint`

세션에서 소개한 기술들을 100% 이해하지는 못했지만, 해당 기술들은 모두 `Zero Trust 패러다임` 아래에서 더 안전한 App 구축을 위해 고민되었다는 점은 이해할 수 있었습니다.

## Zero Trust ?
