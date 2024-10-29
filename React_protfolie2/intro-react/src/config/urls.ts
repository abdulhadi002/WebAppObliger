const baseUrl = process.env.BASE_URL ?? 'http://localhost:4000';
const endpoints = {
  projects: `${baseUrl}/json`,
};

export { endpoints };
