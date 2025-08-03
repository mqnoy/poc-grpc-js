# POC grpc js
poc grpc on javascript


### Objective
1. [x] can return nullable value to grpc client
1. [ ] perform error handle
1. [ ] handle auth - interceptor
1. [ ] handle logging - interceptor 


### Motivation
1. i got the error `Error serializing response: .... : object expected`


### Result
i'm expecting result the server
```
result: [
  {
    id: 1,
    version: '1.0.0',
    show: null,
    label: 'Label A',
    priority: 8
  },
  { id: 2, version: '1.0.0', show: true, label: null, priority: null },
  {
    id: 3,
    version: '1.0.0',
    show: false,
    label: 'Label C',
    priority: 1
  }
]
```

that result from the server should need littlebit effort is:
checking response the message has value or not and transform them into flat object


you can see the workaround in this code (file: utils.js)

```
function wrapperNullableValue(value) {
  return _.isNull(value) ? undefined : { value: value };
}

function wrapperValueToNull(entry) {
  const newEntry = Object.entries(entry).reduce((prev, curr) => {
    const [k, v] = curr;
    prev[k] = _.has(v, "value") ? v.value : v;
    return prev;
  }, {});
  return Object.assign(entry, newEntry);
}
```


### Usage
1. clone the repository
1. run the server with `pnpm start:server`
1. run the client with `pnpm start:client`