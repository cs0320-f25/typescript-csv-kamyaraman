import { parseCSV } from "../src/basic-parser";
import { z } from "zod";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLE_NO_HEADER_CSV_PATH = path.join(__dirname, "../data/people-no-header.csv"); 
const ICECREAM_CSV_PATH = path.join(__dirname, "../data/icecream.csv"); 

// Zod schemas for the CSV files
const PeopleRowSchema = z.tuple([z.string(), z.string()]).transform(([name, age]) => ({ name, age }));
const PeopleNoHeaderRowSchema = z.tuple([z.string(), z.string(), z.string()]).transform(([name, course, role]) => ({ name, course, role }));
const IcecreamRowSchema = z.tuple([z.string(), z.coerce.number()]).transform(([name, price]) => ({ name, price }));

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


test("parses people-no-header.csv rows as objects", async () => {
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, PeopleNoHeaderRowSchema);
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({ name: "Tim Nelson", course: "CS0320, Intro to SWE", role: "instructor" });
  expect(results[2]).toEqual({ name: "Bob", course: "CS0320", role: "student" });
  expect(results[3]).toEqual({ name: "Jane Doe", course: "CS1430", role: "student" });
});

test("parses icecream.csv rows as objects with numbers", async () => {
  const results = await parseCSV(ICECREAM_CSV_PATH, IcecreamRowSchema);
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({ name: "strawberry", price: 6 });
  expect(results[1]).toEqual({ name: "chocolate", price: 5 });
  expect(results[2]).toEqual({ name: "vanilla", price: 4 });
  expect(results[3]).toEqual({ name: "mint chip", price: 7 });
});

test("throws on invalid row for schema", async () => {
  // Use icecream schema on people.csv, which should fail
  await expect(parseCSV(PEOPLE_CSV_PATH, IcecreamRowSchema)).rejects.toThrow();
});

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
