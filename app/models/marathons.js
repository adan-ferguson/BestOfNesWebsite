// These are just hardcoded for now, put them in DB later.
module.exports = {
  getPast: function(){
    let past = []

    past.push({
      name: 'Best of NES 2014',
      date: 'Oct 31, 2014',
      schedule: 'http://www.speedrun.com/bestofnes2014/schedule'
    })

    past.push({
      name: 'Best of NES 2015',
      date: 'Oct 30, 2015',
      schedule: 'http://bombch.us/Bkm1'
    })

    past.push({
      name: 'Best of NES 2016',
      date: 'Oct 28, 2016',
      schedule: 'https://horaro.org/bones2016/schedule'
    })

    past.push({
      name: 'Best of NES 2017',
      date: 'Oct 27, 2017',
      schedule: 'https://horaro.org/bones2017/schedule'
    })

    past.push({
      name: 'Best of NES 2018',
      date: 'Nov 2, 2018',
      schedule: 'https://horaro.org/bones2018/schedule'
    })

    past.push({
      name: 'Best of NES 2019',
      date: 'Nov 8, 2019',
      schedule: 'https://horaro.org/bones2019/schedule'
    })

    return past
  }
}