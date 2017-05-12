var CronJob = require('cron').CronJob;
var sendmail = require('sendmail')();
var kue = require('kue'),
    queue = kue.createQueue();


    queue.create('todo', {
        title: 'Welcome to the site',
        dueDate: ''
        to: 'ivanhabi2@gmail.com',
        template: 'welcome-email'
    }).priority('normal').attempts(2).save();



new CronJob('00 * * * * *', function() {
    queue.process('email', function(job, done){
      email(job.data.to, done);
    });

    console.log('ngirim email');
}, null, true, 'Asia/Jakarta');

function email(address, done) {
  sendmail({
      from: 'fearzen3@yeay.com',
      to: address,
      subject: 'ini sudah pake QUEUE',
      html: 'Mail of test sendmail ',
  }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
  });

  done();
}
