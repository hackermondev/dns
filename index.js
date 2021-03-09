var named = require('node-named');
var server = named.createServer();

server.listen(6969, '127.0.0.1', function() {
  console.log('DNS server started on port 9999');
});

server.on('query', function(query) {
  var domain = query.name();
  console.log('DNS Query: %s', domain)

  var target = new SoaRecord(domain, {serial: 12345})
  query.addAnswer(domain, target, 'SOA');
  server.send(query);
});
