import router, { useRouter } from "next/router";

export default jest.mock('next/router', () => require('next-router-mock'));