const io = require("socket.io-client");

const TARGET = 20000;
let connected = 0;

async function test() {
  console.log(`Creating ${TARGET} connections...`);

  for (let i = 0; i < TARGET; i++) {
    const uniqueId = `loadtest-user-${i}--__--${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    const socket = io("http://localhost:8080", {
      query: {
        id: uniqueId,
        token: "test",
      },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      connected++;
      if (connected % 100 === 0) {
        console.log(`${connected}/${TARGET} connected`);
      }
    });

    socket.on("connect_error", (err) => {
      console.error(`Failed: ${err.message}`);
    });

    if (i % 50 === 0 && i > 0) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  await new Promise((r) => setTimeout(r, 10000));

  console.log(
    `\nResults: ${connected}/${TARGET} (${((connected / TARGET) * 100).toFixed(
      1
    )}%)`
  );

  try {
    const res = await fetch("http://localhost:8080/api/monitoring/metrics");
    const data = await res.json();
    console.log(
      `Server confirms: ${data.activeConnections} active connections\n`
    );
  } catch (e) {
    console.log("Could not fetch connection count");
  }

  process.exit(0);
}

test();
