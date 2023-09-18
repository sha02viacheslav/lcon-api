export const catchError = {
  message: 'error',
  response: null,
  error: 'Check application logs',
};

export const response = (message: string, data: any, error: string = null) => {
  return { message, data, error };
};
