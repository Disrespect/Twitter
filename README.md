# Me IRL Twitter Bot
im a twitter bot made in javascript that fetches the latest posts from the /r/me_irl reddit.

## Disclaimer
Abusing this script can get you banned from twitter if you set it to such a low delay, therefor why I keep it as 30 minutes per tweet.

## Dependencies
This twitter bot was creating in javascript with nodejs which you can install at https://nodejs.org. The actual bot depends on the npm packages `twitter`, `snekfetch`, `moment`, `chalk`, `fs` and `request-promise-native`
```
npm install twitter snekfetch moment chalk fs request-promise-native --save
```

# Setting it Up
It's pretty easy if you know what you're doing.

## Usage
Once everything is setup all all you'll need to do is run the following command in the same directory your file is in.
```
node index.js
```
