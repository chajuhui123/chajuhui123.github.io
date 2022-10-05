---
title: '[React Query] Mutation 정리하기'
date: 2022-06-15
category: 'ReactQuery'
draft: false
---


### React query useMutation 를 사용하여, 변경된 부분만 다시 호출

```js
{
      title: () => {
        return (
          <span>
            Auto Throttling
            <Tooltip title="전일 리포트 데이터가 없는 경우 2일 전 데이터를 표시합니다. 11시 35분 부터 QPS 자동제어가 진행됩니다. 송출하다가 중단하여 최신 데이터가 없는 tagid는 스로틀링이 켜지지 않을 수 있습니다. 개발팀과 협의하셔야 합니다.">
              <InfoCircleOutlined style={{ marginLeft: 4 }} />
            </Tooltip>
          </span>
        );
      },
      key: 'isAuto',
      dataIndex: 'isAuto',
      align: 'center',
      width: '8%',
      render: (isAuto, { bidderId }) => {
        const { mutate } = useMutationAutoThrottling(bidderId, !isAuto);

        const handleChangeAutoThrottling = () => {
          Modal.confirm({
            content: 'Auto Throttling 상태를 변경합니다.',
            okText: '예',
            cancelText: '아니오',
            onOk: mutate,
          });
        };

        return (
          <Switch checked={isAuto} onChange={handleChangeAutoThrottling} />
        );
      },
    },
```