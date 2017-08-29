var AWS = require('aws-sdk');
var sns = new AWS.SNS();
var topicArn;
var whitelist = [];

module.exports = {

  /**
   * Send an event to a topic in Amazon SNS
   */
  notifyToTopic: function (name, data={}, topic, callback) {
    if (!topic)
      return callback(new Error('SNS topic has not been set'));

    if(!name)
      return callback(new Error('Event name has not been set'));

    if(whitelist.length > 0 && whitelist.indexOf(name) === -1)
      return callback(new Error('Event name has not been whitelisted. Use setWhitelist function to pass an array of allowed events.'));

    data['name'] = name;
    var params = {
      Message: JSON.stringify(data),
      TopicArn: topic,
    };

    sns.publish(params, function (err, data) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, data);
      }
    });
  },

  /**
   * Wrapper to send an event to default topic set via setTopic
   */
  notify: function (name, data, callback) {
    module.exports.notifyToTopic(name, data, topicArn, callback);
  },

  /**
   * Update AWS config
   */
  updateConfig: function (options) {
    AWS.config.update(options);
    // Reinitialize SNS object so that it is created using the updated config
    sns = new AWS.SNS();
  },

  /**
   * Set SNS topic to which notifications should be sent
   */
  setTopic: function (topic) {
    topicArn = topic;
  },

  /**
   * Set event whitelist i.e. an array of allowed events names in case you want to control
   * type of events passed to SNS.
   * If you do not set this, by default the module will allow all event names
   */
  setWhitelist: function (events) {
    whitelist = events;
  },

  /**
   * Get an array of whitelisted event names
   */
  getWhitelist: function () {
    return whitelist;
  }
};
