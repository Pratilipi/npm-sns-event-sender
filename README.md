# SNS Event Sender
This module can be used to send events/messages to any SNS topic

# Usage

```javascript
var sns = require('sns-event-sender');
sns.updateConfig({region: 'ap-southeast-1'});
sns.setTopic('arn:aws:sns:ap-southeast-1:381147823962:my-topic');


sns.notify("userLogin", {"userId": "198", "date": "26/08/2017"}, function(error, data){
  if(error) {
    console.error(error, error.stack);
  } else {
    console.log(data);
  }
});
```

## If you want to send an event to a different topic by explicitly specifying topic arn
```javascript
sns.notifyToTopic("userLogin", {"userId": "198", "date": "26/08/2017"},
'arn:aws:sns:ap-southeast-1:381147823962:my-new-topic',
function(error, data){
  if(error) {
    console.error(error, error.stack);
  } else {
    console.log(data);
  }
});
```

# If you want to use Promises
```javascript
var Promise = require("bluebird");
var sns = Promise.promisifyAll(require('sns-event-sender'));
sns.updateConfig({region: 'ap-southeast-1'})
sns.setTopic('arn:aws:sns:ap-southeast-1:381147823962:my-topic');

sns.notifyAsync("userLogin", {"userId": "198", "date": "26/08/2017"})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error(error, error.stack);
  });
```

## Sendig to a specific topic
```javascript
sns.notifyToTopicAsync("userLogin",
{"userId": "198", "date": "26/08/2017"},
'arn:aws:sns:ap-southeast-1:381147823962:my-new-topic')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error(error, error.stack);
  });
```
