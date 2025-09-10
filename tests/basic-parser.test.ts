import { ZodUndefined } from "zod";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLE_NO_HEADER_CSV_PATH = path.join(__dirname, "../data/people-no-header.csv"); 
const ICECREAM_CSV_PATH = path.join(__dirname, "../data/icecream.csv"); 

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV works with and without header row", async () =>{
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, undefined);
  const resultsWithHeader = await parseCSV(PEOPLE_CSV_PATH, undefined); 
  expect(resultsWithHeader).toHaveLength(resultsWithHeader.length - 1); 
  expect(results).toHaveLength(results.length);
})

test("parseCSV works with quotes", async () =>{
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, undefined)
  expect(results[0]).toEqual(["Tim Nelson", "CS0320, Intro to SWE", "instructor"]); 
  expect(results[2]).toEqual(["Bob", "CS0320", "student"]); 
})

test("parseCSV trims whitespace", async () => {
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, undefined)
  expect(results[3]).toEqual(["Jane Doe", "CS1430", "student"])
})

test("parseCSV works with integers", async () =>{
  const results = await parseCSV(ICECREAM_CSV_PATH, undefined)
  expect(results[0]).toEqual(["strawberry", "6"]); 
}) 
