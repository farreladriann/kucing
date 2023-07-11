function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    console.log("Start");

    console.log("Waiting 1 second...");
    await delay(1000);  // kode tampak 'terhenti' di sini selama 1 detik, tapi sebenarnya tidak
    console.log("1 second passed");

    console.log("Waiting 2 seconds...");
    await delay(2000);  // kode tampak 'terhenti' di sini selama 2 detik, tapi sebenarnya tidak
    console.log("2 seconds passed");

    console.log("End");
}

run();
