import server from '../config/server';

server.listen(Number(process.env.PORT), () => {
  console.log(`server running at port: ${Number(process.env.PORT)}`);
});
