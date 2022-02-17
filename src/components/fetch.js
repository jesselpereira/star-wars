/* eslint-disable import/no-anonymous-default-export */
export default async function(...args) {
  const res = await fetch(...args);
  return await res.json();
}