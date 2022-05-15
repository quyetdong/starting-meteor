import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const githubConfig = Meteor.settings.github;
// console.log(`**** ${JSON.stringify(githubConfig, null, 2)}`)

if (!githubConfig) {
  throw Meteor.Error('missing config for github');
}

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'redirect',
      ...githubConfig,
    },
  }
);

