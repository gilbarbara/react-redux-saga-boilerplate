process.env.PUBLIC_URL = '';

const consoleError = console.error;
console.error = jest.fn(error => {
  const message = error instanceof Error ? error.message : error;
  const skipMessages = ['Invalid transition: rotate'];
  let shouldSkip = false;

  for (const s of skipMessages) {
    if (message.includes(s)) {
      shouldSkip = true;
    }
  }

  if (!shouldSkip) {
    consoleError(error);
  }
});

process.on('uncaughtException', err => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  console.error(err.stack);
});
