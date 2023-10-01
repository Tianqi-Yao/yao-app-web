const levels: Record<string, number> = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

const currentLevel = levels.DEBUG; // 调整此值以控制日志记录级别

function getStackInfo() {
  const err = new Error();
  const stack = err.stack?.split('\n')[4];
  const functionName = stack?.trim().split(' ')[1];
  // console.log('stack', stack, "err", err);
  return functionName ? functionName : '';
}

function log(level: number, message: string, ...data: any[]) {
  if (level == levels.DEBUG) {
    const stackInfo = getStackInfo();
    console.log(`[${level}][${stackInfo}]\n${message}`, ...data);
  }
  else if(level >= currentLevel) {
    console.log(`[${level}]\n${message}`, ...data);
  }
}

export const logger = {
  debug: (message: string, ...data: any[]) => log(levels.DEBUG, message, ...data),
  info: (message: string, ...data: any[]) => log(levels.INFO, message, ...data),
  warn: (message: string, ...data: any[]) => log(levels.WARN, message, ...data),
  error: (message: string, ...data: any[]) => log(levels.ERROR, message, ...data),
};