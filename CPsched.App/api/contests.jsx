import axios from 'axios';

let CODEFORCES = 'CF';
let LEETCODE = 'LC';
let CODECHEF = 'CC';

let API_ENDPOINT = "http://192.168.0.111:8000/contests"

class Contest {
  constructor(title, startTime, duration, platform, id) {
    this.id = id
    this.title = title;
    this.startTime = new Date(startTime * 1000);
    this.duration = duration;
    this.platform = platform;
  }

  static fromJSON(json) {
    const { id, title, start_time, duration, platform } = json;
    return new Contest(title, start_time, duration, platform, id);
  }
}

async function getContests() {
  let r = await axios.get(API_ENDPOINT);
  console.log(r.data)
  return r.data.map(Contest.fromJSON);
}

module.exports = {Contest,getContests,CODEFORCES,LEETCODE,CODECHEF};